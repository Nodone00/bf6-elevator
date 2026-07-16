// --- BUNDLED TYPESCRIPT OUTPUT ---
// @ts-nocheck

// --- SOURCE: src\main.ts ---
enum ElevatorFloorLevel {
  Top,
  Bottom,
}

interface ElevatorFloorConfig {
  readonly floorObjId: number;
  readonly leftDoorObjId: number;
  readonly rightDoorObjId: number;
  readonly areaTriggerObjId: number;
  readonly closedDoorPivotGap: number;
}

interface TeleportElevatorConfig {
  readonly id: string;

  readonly topFloor: ElevatorFloorConfig;
  readonly bottomFloor: ElevatorFloorConfig;

  readonly startingFloor: ElevatorFloorLevel;

  readonly doorMoveSeconds: number;
  readonly doorClosePositionScale: number;
  readonly interactPointYOffset: number;
  readonly teleportMoveTransitionSeconds: number;

  readonly transitionFadeSeconds: number;
  readonly transitionFadeStepSeconds: number;

  readonly doorMoveSfx: mod.RuntimeSpawn_Common;
  readonly doorMoveSfxVolume: number;
  readonly doorMoveSfxRange: number;
}

interface ElevatorFloor {
  readonly areaTriggerObjId: number;

  readonly elevatorPosition: mod.Vector;

  readonly leftDoorObject: mod.SpatialObject;
  readonly rightDoorObject: mod.SpatialObject;
  readonly leftDoorCloseDelta: mod.Vector;
  readonly rightDoorCloseDelta: mod.Vector;
  readonly leftDoorOpenDelta: mod.Vector;
  readonly rightDoorOpenDelta: mod.Vector;

  readonly interactPoint: mod.InteractPoint;
  readonly interactPointObjId: number;

  readonly players: Map<number, mod.Player>;
}

// ************************************************************
// ELEVATOR CONFIGURATION
//
// Add, remove, and configure elevators only in this table.
// Every object ID must refer to the Godot object ID for that elevator.
// NOTE: In Godot, all elevator doors should be in the OPEN position. Set the startingFloor in the Config.
// ************************************************************

const ELEVATOR_CONFIGS: readonly TeleportElevatorConfig[] = [
  {
    id: "MainElevator", // Unique name used to identify this elevator.

    // Configuration for the elevator's top-floor cabin.
    topFloor: {
      floorObjId: 9103, // Godot ObjId of the top-floor elevator reference object used for positioning and teleport offset.
      leftDoorObjId: 9101, // Godot ObjId of the top-floor left sliding door.
      rightDoorObjId: 9102, // Godot ObjId of the top-floor right sliding door.
      areaTriggerObjId: 9104, // Godot ObjId of the area trigger that detects players inside the top-floor elevator cabin.
      closedDoorPivotGap: 0, // Distance that should remain between the two door pivots when the doors are closed.
    },

    // Configuration for the elevator's bottom-floor cabin.
    bottomFloor: {
      floorObjId: 9203, // Godot ObjId of the bottom-floor elevator reference object used for positioning and teleport offset.
      leftDoorObjId: 9201, // Godot ObjId of the bottom-floor left sliding door.
      rightDoorObjId: 9202, // Godot ObjId of the bottom-floor right sliding door.
      areaTriggerObjId: 9204, // Godot ObjId of the area trigger that detects players inside the bottom-floor elevator cabin.
      closedDoorPivotGap: 0, // Distance that should remain between the two door pivots when the doors are closed.
    },

    startingFloor: ElevatorFloorLevel.Bottom, // Floor where the elevator cabin starts when the game mode starts.

    doorMoveSeconds: 2, // Number of seconds required for the doors to fully open or close.
    doorClosePositionScale: 0.3, // Portion of the distance between the door pivots that each door moves when closing. Adjust this if there is a gap between the doors when closed. 0.25 = half the distance, 0.5 = full distance.
    interactPointYOffset: 1.5, // Vertical offset applied when placing the interact point. Higher value = higher placement.
    teleportMoveTransitionSeconds: 2, // Simulated elevator travel time between the fade-in and player teleport.

    transitionFadeSeconds: 0.4, // Total duration of the screen fade-in or fade-out animation (transition only).
    transitionFadeStepSeconds: 0.1, // Delay between each fade opacity update; larger values use fewer server updates, lower values are smoother.

    // Sound effect played whenever the elevator doors open or close (must be OneShot3D).
    doorMoveSfx:
      mod.RuntimeSpawn_Common
        .SFX_Gadgets_EoDBot_Spawnable_Arm_Vertical_OneShot3D,

    doorMoveSfxVolume: 0.7, // Playback volume of the door movement sound effect.
    doorMoveSfxRange: 30, // Maximum distance at which players can hear the door movement sound.
  },

  // EXAMPLE FOR SECOND ELEVATOR CONFIGURATION:
  /*{
    id: "WarehouseElevator",

    topFloor: {
      floorObjId: ,
      leftDoorObjId: ,
      rightDoorObjId: ,
      areaTriggerObjId: ,
      closedDoorPivotGap: ,
    },

    bottomFloor: {
      floorObjId: ,
      leftDoorObjId: ,
      rightDoorObjId: ,
      areaTriggerObjId: ,
      closedDoorPivotGap: ,
    },

    startingFloor: ElevatorFloorLevel.Bottom,

    doorMoveSeconds: 2,
    doorClosePositionScale: 0.3,
    interactPointYOffset: 1.5,
    teleportMoveTransitionSeconds: 2,

    transitionFadeSeconds: 0.4,
    transitionFadeStepSeconds: 0.1,

    doorMoveSfx:
      mod.RuntimeSpawn_Common
        .SFX_Gadgets_EoDBot_Spawnable_Arm_Vertical_OneShot3D,

    doorMoveSfxVolume: 0.7,
    doorMoveSfxRange: 30,
  },*/
];

class TeleportElevator {
  private readonly config: TeleportElevatorConfig;

  private static readonly transitionWidgets = new Map<number, mod.UIWidget>();

  private static readonly transitionRunIds = new Map<number, number>();

  private currentFloor: ElevatorFloorLevel;
  private moving = false;
  private initialized = false;

  private topFloor!: ElevatorFloor;
  private bottomFloor!: ElevatorFloor;

  public constructor(config: TeleportElevatorConfig) {
    this.config = config;
    this.currentFloor = config.startingFloor;
  }

  public async Init(): Promise<void> {
    if (this.initialized) {
      return;
    }

    this.topFloor = this.CreateFloor(this.config.topFloor);
    this.bottomFloor = this.CreateFloor(this.config.bottomFloor);

    this.initialized = true;
    this.SetInteractPointsEnabled(false);

    const inactiveFloor =
      this.currentFloor === ElevatorFloorLevel.Top
        ? this.bottomFloor
        : this.topFloor;

    // Do not spawn several initialization sounds when 2–8 elevators start.
    this.CloseDoors(inactiveFloor, false);

    await mod.Wait(this.config.doorMoveSeconds);

    this.SetInteractPointsEnabled(true);
  }

  public TryHandleInteract(
    player: mod.Player,
    interactPointObjId: number,
  ): boolean {
    if (!this.initialized || !mod.IsPlayerValid(player)) {
      return false;
    }

    const belongsToElevator =
      interactPointObjId === this.topFloor.interactPointObjId ||
      interactPointObjId === this.bottomFloor.interactPointObjId;

    if (!belongsToElevator) {
      return false;
    }

    if (!this.moving) {
      void this.TryMove();
    }

    return true;
  }

  public TryHandlePlayerEnterArea(
    player: mod.Player,
    areaTriggerObjId: number,
  ): boolean {
    if (!this.initialized || !mod.IsPlayerValid(player)) {
      return false;
    }

    const enteredFloor = this.GetFloorByAreaTriggerObjId(areaTriggerObjId);

    if (!enteredFloor) {
      return false;
    }

    const oppositeFloor =
      enteredFloor === this.topFloor ? this.bottomFloor : this.topFloor;

    const playerObjId = mod.GetObjId(player);

    oppositeFloor.players.delete(playerObjId);
    enteredFloor.players.set(playerObjId, player);

    return true;
  }

  public TryHandlePlayerExitArea(
    player: mod.Player,
    areaTriggerObjId: number,
  ): boolean {
    if (!this.initialized) {
      return false;
    }

    const exitedFloor = this.GetFloorByAreaTriggerObjId(areaTriggerObjId);

    if (!exitedFloor) {
      return false;
    }

    exitedFloor.players.delete(mod.GetObjId(player));

    return true;
  }

  private GetFloorByAreaTriggerObjId(
    areaTriggerObjId: number,
  ): ElevatorFloor | null {
    if (areaTriggerObjId === this.topFloor.areaTriggerObjId) {
      return this.topFloor;
    }

    if (areaTriggerObjId === this.bottomFloor.areaTriggerObjId) {
      return this.bottomFloor;
    }

    return null;
  }

  public RemovePlayer(playerObjId: number): void {
    if (!this.initialized) {
      return;
    }

    this.topFloor.players.delete(playerObjId);
    this.bottomFloor.players.delete(playerObjId);
  }

  private async TryMove(): Promise<void> {
    if (this.moving) {
      return;
    }

    this.moving = true;
    this.SetInteractPointsEnabled(false);

    const movingUp = this.currentFloor === ElevatorFloorLevel.Bottom;

    const sourceFloor = movingUp ? this.bottomFloor : this.topFloor;

    const destinationFloor = movingUp ? this.topFloor : this.bottomFloor;

    this.CloseDoors(sourceFloor);

    await mod.Wait(this.config.doorMoveSeconds);

    const players = this.CollectValidPlayers(sourceFloor);

    this.FadePlayers(players, 1, false);

    await mod.Wait(this.config.transitionFadeSeconds);
    await mod.Wait(this.config.teleportMoveTransitionSeconds);

    this.TeleportPlayers(players, sourceFloor, destinationFloor);

    await mod.Wait(0.1);

    this.FadePlayers(players, 0, true);

    await mod.Wait(this.config.transitionFadeSeconds);

    this.OpenDoors(destinationFloor);

    await mod.Wait(this.config.doorMoveSeconds);

    this.currentFloor = movingUp
      ? ElevatorFloorLevel.Top
      : ElevatorFloorLevel.Bottom;

    this.moving = false;
    this.SetInteractPointsEnabled(true);
  }

  private CollectValidPlayers(floor: ElevatorFloor): mod.Player[] {
    const players: mod.Player[] = [];

    for (const [playerObjId, player] of floor.players) {
      if (!mod.IsPlayerValid(player)) {
        floor.players.delete(playerObjId);
        continue;
      }

      players.push(player);
    }

    return players;
  }

  private FadePlayers(
    players: readonly mod.Player[],
    targetAlpha: number,
    hideWhenComplete: boolean,
  ): void {
    for (const player of players) {
      void this.AnimateTransitionForPlayer(
        player,
        targetAlpha,
        hideWhenComplete,
      );
    }
  }

  private async AnimateTransitionForPlayer(
    player: mod.Player,
    targetAlpha: number,
    hideWhenComplete: boolean,
  ): Promise<void> {
    if (!mod.IsPlayerValid(player)) {
      return;
    }

    const playerObjId = mod.GetObjId(player);
    const widget = TeleportElevator.GetOrCreateTransitionWidget(player);

    if (!widget) {
      return;
    }

    const runId = (TeleportElevator.transitionRunIds.get(playerObjId) ?? 0) + 1;

    TeleportElevator.transitionRunIds.set(playerObjId, runId);

    const startAlpha = mod.GetUIWidgetBgAlpha(widget);
    const duration = this.config.transitionFadeSeconds;
    const requestedStep = Math.max(0.01, this.config.transitionFadeStepSeconds);
    const stepCount = Math.max(1, Math.ceil(duration / requestedStep));
    const actualStepSeconds = duration / stepCount;

    mod.SetUIWidgetVisible(widget, true);

    for (let step = 1; step <= stepCount; step++) {
      if (!this.IsCurrentTransition(playerObjId, runId)) {
        return;
      }

      if (!mod.IsPlayerValid(player)) {
        return;
      }

      const progress = step / stepCount;
      const alpha = startAlpha + (targetAlpha - startAlpha) * progress;

      mod.SetUIWidgetBgAlpha(widget, alpha);

      await mod.Wait(actualStepSeconds);
    }

    if (!this.IsCurrentTransition(playerObjId, runId)) {
      return;
    }

    mod.SetUIWidgetBgAlpha(widget, targetAlpha);

    if (hideWhenComplete) {
      mod.SetUIWidgetVisible(widget, false);
    }
  }

  private IsCurrentTransition(playerObjId: number, runId: number): boolean {
    return TeleportElevator.transitionRunIds.get(playerObjId) === runId;
  }

  public static CancelPlayerTransition(playerObjId: number): void {
    const nextRunId = (this.transitionRunIds.get(playerObjId) ?? 0) + 1;

    this.transitionRunIds.set(playerObjId, nextRunId);

    const widget = this.transitionWidgets.get(playerObjId);

    if (!widget) {
      return;
    }

    mod.SetUIWidgetBgAlpha(widget, 0);
    mod.SetUIWidgetVisible(widget, false);
  }

  private static GetOrCreateTransitionWidget(
    player: mod.Player,
  ): mod.UIWidget | null {
    if (!mod.IsPlayerValid(player)) {
      return null;
    }

    const playerObjId = mod.GetObjId(player);

    const existing = TeleportElevator.transitionWidgets.get(playerObjId);

    if (existing) {
      return existing;
    }

    const widgetName = `TeleportElevatorTransition_${playerObjId}`;

    mod.AddUIContainer(
      widgetName,
      mod.CreateVector(0, 0, 0),
      mod.CreateVector(4000, 4000, 0),
      mod.UIAnchor.Center,
      mod.GetUIRoot(),
      false,
      0,
      mod.CreateVector(0, 0, 0),
      0,
      mod.UIBgFill.Solid,
      mod.UIDepth.AboveGameUI,
      player,
    );

    const widget = mod.FindUIWidgetWithName(widgetName) as mod.UIWidget;

    if (!widget) {
      return null;
    }

    mod.SetUIWidgetBgAlpha(widget, 0);
    mod.SetUIWidgetVisible(widget, false);

    TeleportElevator.transitionWidgets.set(playerObjId, widget);

    return widget;
  }

  private TeleportPlayers(
    players: readonly mod.Player[],
    sourceFloor: ElevatorFloor,
    destinationFloor: ElevatorFloor,
  ): void {
    const floorOffset = TeleportElevator.SubtractVector(
      destinationFloor.elevatorPosition,
      sourceFloor.elevatorPosition,
    );

    for (const player of players) {
      if (!mod.IsPlayerValid(player)) {
        continue;
      }

      const playerObjId = mod.GetObjId(player);

      // The player may have exited or undeployed during the transition.
      if (!sourceFloor.players.has(playerObjId)) {
        continue;
      }

      const destinationPosition = TeleportElevator.AddVector(
        mod.GetObjectPosition(player),
        floorOffset,
      );

      const facingDirection = mod.GetSoldierState(
        player,
        mod.SoldierStateVector.GetFacingDirection,
      );

      const yawRadians = Math.atan2(
        mod.XComponentOf(facingDirection),
        mod.ZComponentOf(facingDirection),
      );

      sourceFloor.players.delete(playerObjId);

      mod.Teleport(player, destinationPosition, yawRadians);

      destinationFloor.players.set(playerObjId, player);
    }
  }

  private CloseDoors(floor: ElevatorFloor, playSound = true): void {
    this.MoveDoors(
      floor,
      floor.leftDoorCloseDelta,
      floor.rightDoorCloseDelta,
      playSound,
    );
  }

  private OpenDoors(floor: ElevatorFloor, playSound = true): void {
    this.MoveDoors(
      floor,
      floor.leftDoorOpenDelta,
      floor.rightDoorOpenDelta,
      playSound,
    );
  }

  private MoveDoors(
    floor: ElevatorFloor,
    leftDoorDelta: mod.Vector,
    rightDoorDelta: mod.Vector,
    playSound: boolean,
  ): void {
    const noRotation = mod.CreateVector(0, 0, 0);

    if (playSound) {
      this.PlayDoorMoveSound(floor.elevatorPosition);
    }

    mod.MoveObjectOverTime(
      floor.leftDoorObject,
      leftDoorDelta,
      noRotation,
      this.config.doorMoveSeconds,
      false,
      false,
    );

    mod.MoveObjectOverTime(
      floor.rightDoorObject,
      rightDoorDelta,
      noRotation,
      this.config.doorMoveSeconds,
      false,
      false,
    );
  }

  private PlayDoorMoveSound(position: mod.Vector): void {
    const sound = mod.SpawnObject(
      this.config.doorMoveSfx,
      position,
      mod.CreateVector(0, 0, 0),
    ) as mod.SFX;

    mod.PlaySound(
      sound,
      this.config.doorMoveSfxVolume,
      position,
      this.config.doorMoveSfxRange,
    );

    void this.StopDoorMoveSoundAfterDelay(sound);
  }

  private async StopDoorMoveSoundAfterDelay(sound: mod.SFX): Promise<void> {
    await mod.Wait(this.config.doorMoveSeconds);

    mod.StopSound(sound);
    mod.UnspawnObject(sound);
  }

  private SetInteractPointsEnabled(enabled: boolean): void {
    mod.EnableInteractPoint(this.topFloor.interactPoint, enabled);
    mod.EnableInteractPoint(this.bottomFloor.interactPoint, enabled);
  }

  private CreateFloor(floorConfig: ElevatorFloorConfig): ElevatorFloor {
    const elevatorObject = mod.GetSpatialObject(floorConfig.floorObjId);

    const leftDoorObject = mod.GetSpatialObject(floorConfig.leftDoorObjId);

    const rightDoorObject = mod.GetSpatialObject(floorConfig.rightDoorObjId);

    const elevatorPosition = mod.GetObjectPosition(elevatorObject);

    const leftDoorOpenPosition = mod.GetObjectPosition(leftDoorObject);

    const rightDoorOpenPosition = mod.GetObjectPosition(rightDoorObject);

    const doorMovement = this.CalculateDoorCloseDeltas(
      leftDoorOpenPosition,
      rightDoorOpenPosition,
      floorConfig.closedDoorPivotGap,
    );

    const doorMidPosition = TeleportElevator.LerpVector(
      leftDoorOpenPosition,
      rightDoorOpenPosition,
      0.5,
    );

    const interactPointPosition = TeleportElevator.AddVector(
      doorMidPosition,
      mod.CreateVector(0, this.config.interactPointYOffset, 0),
    );

    const interactPoint = mod.SpawnObject(
      mod.RuntimeSpawn_Common.InteractPoint,
      interactPointPosition,
      mod.CreateVector(0, 0, 0),
    ) as mod.InteractPoint;

    return {
      areaTriggerObjId: floorConfig.areaTriggerObjId,

      elevatorPosition,

      leftDoorObject,
      rightDoorObject,

      leftDoorCloseDelta: doorMovement.leftDoorCloseDelta,

      rightDoorCloseDelta: doorMovement.rightDoorCloseDelta,

      leftDoorOpenDelta: TeleportElevator.ScaleVector(
        doorMovement.leftDoorCloseDelta,
        -1,
      ),

      rightDoorOpenDelta: TeleportElevator.ScaleVector(
        doorMovement.rightDoorCloseDelta,
        -1,
      ),

      interactPoint,
      interactPointObjId: mod.GetObjId(interactPoint),

      players: new Map<number, mod.Player>(),
    };
  }

  private CalculateDoorCloseDeltas(
    leftDoorOpenPosition: mod.Vector,
    rightDoorOpenPosition: mod.Vector,
    closedDoorPivotGap: number,
  ): {
    readonly leftDoorCloseDelta: mod.Vector;
    readonly rightDoorCloseDelta: mod.Vector;
  } {
    const leftToRight = TeleportElevator.SubtractVector(
      rightDoorOpenPosition,
      leftDoorOpenPosition,
    );

    const distance = TeleportElevator.VectorLength(leftToRight);

    if (distance <= 0.0001) {
      const zero = mod.CreateVector(0, 0, 0);

      return {
        leftDoorCloseDelta: zero,
        rightDoorCloseDelta: zero,
      };
    }

    const validClosedGap = Math.max(0, Math.min(closedDoorPivotGap, distance));
    const closeTravelDistance =
      (distance - validClosedGap) * this.config.doorClosePositionScale;
    const direction = TeleportElevator.ScaleVector(leftToRight, 1 / distance);
    const leftDoorCloseDelta = TeleportElevator.ScaleVector(
      direction,
      closeTravelDistance,
    );

    return {
      leftDoorCloseDelta,
      rightDoorCloseDelta: TeleportElevator.ScaleVector(leftDoorCloseDelta, -1),
    };
  }

  private static AddVector(
    vector1: mod.Vector,
    vector2: mod.Vector,
  ): mod.Vector {
    return mod.CreateVector(
      mod.XComponentOf(vector1) + mod.XComponentOf(vector2),
      mod.YComponentOf(vector1) + mod.YComponentOf(vector2),
      mod.ZComponentOf(vector1) + mod.ZComponentOf(vector2),
    );
  }

  private static SubtractVector(
    vector1: mod.Vector,
    vector2: mod.Vector,
  ): mod.Vector {
    return mod.CreateVector(
      mod.XComponentOf(vector1) - mod.XComponentOf(vector2),
      mod.YComponentOf(vector1) - mod.YComponentOf(vector2),
      mod.ZComponentOf(vector1) - mod.ZComponentOf(vector2),
    );
  }

  private static ScaleVector(vector: mod.Vector, scale: number): mod.Vector {
    return mod.CreateVector(
      mod.XComponentOf(vector) * scale,
      mod.YComponentOf(vector) * scale,
      mod.ZComponentOf(vector) * scale,
    );
  }

  private static LerpVector(
    start: mod.Vector,
    end: mod.Vector,
    t: number,
  ): mod.Vector {
    return mod.CreateVector(
      mod.XComponentOf(start) +
        (mod.XComponentOf(end) - mod.XComponentOf(start)) * t,
      mod.YComponentOf(start) +
        (mod.YComponentOf(end) - mod.YComponentOf(start)) * t,
      mod.ZComponentOf(start) +
        (mod.ZComponentOf(end) - mod.ZComponentOf(start)) * t,
    );
  }

  private static VectorLength(vector: mod.Vector): number {
    const x = mod.XComponentOf(vector);
    const y = mod.YComponentOf(vector);
    const z = mod.ZComponentOf(vector);

    return Math.sqrt(x * x + y * y + z * z);
  }
}

class TeleportElevatorManager {
  private static readonly elevators: readonly TeleportElevator[] =
    ELEVATOR_CONFIGS.map((config) => new TeleportElevator(config));

  private static initialized = false;
  private static initPromise: Promise<void> | null = null;

  public static Init(): Promise<void> {
    if (!this.initPromise) {
      this.initPromise = this.Initialize();
    }

    return this.initPromise;
  }

  private static async Initialize(): Promise<void> {
    await Promise.all(this.elevators.map((elevator) => elevator.Init()));

    this.initialized = true;
  }

  public static OnPlayerInteract(
    player: mod.Player,
    interactPoint: mod.InteractPoint,
  ): void {
    if (!this.initialized || !mod.IsPlayerValid(player)) {
      return;
    }

    const interactPointObjId = mod.GetObjId(interactPoint);

    for (const elevator of this.elevators) {
      if (elevator.TryHandleInteract(player, interactPointObjId)) {
        return;
      }
    }
  }

  public static OnPlayerEnterAreaTrigger(
    player: mod.Player,
    areaTrigger: mod.AreaTrigger,
  ): void {
    if (!this.initialized || !mod.IsPlayerValid(player)) {
      return;
    }

    const areaTriggerObjId = mod.GetObjId(areaTrigger);

    for (const elevator of this.elevators) {
      if (elevator.TryHandlePlayerEnterArea(player, areaTriggerObjId)) {
        return;
      }
    }
  }

  public static OnPlayerExitAreaTrigger(
    player: mod.Player,
    areaTrigger: mod.AreaTrigger,
  ): void {
    if (!this.initialized) {
      return;
    }

    const areaTriggerObjId = mod.GetObjId(areaTrigger);

    for (const elevator of this.elevators) {
      if (elevator.TryHandlePlayerExitArea(player, areaTriggerObjId)) {
        return;
      }
    }
  }

  public static OnPlayerLeaveGame(playerObjId: number): void {
    if (!this.initialized) {
      return;
    }

    for (const elevator of this.elevators) {
      elevator.RemovePlayer(playerObjId);
    }

    TeleportElevator.CancelPlayerTransition(playerObjId);
  }

  public static OnPlayerUndeploy(player: mod.Player): void {
    if (!this.initialized) {
      return;
    }

    const playerObjId = mod.GetObjId(player);

    for (const elevator of this.elevators) {
      elevator.RemovePlayer(playerObjId);
    }

    TeleportElevator.CancelPlayerTransition(playerObjId);
  }
}

// -- EVENT HANDLERS --

export async function OnGameModeStarted(): Promise<void> {
  await mod.Wait(1);
  void TeleportElevatorManager.Init();
}

export function OnPlayerInteract(
  eventPlayer: mod.Player,
  eventInteractPoint: mod.InteractPoint,
): void {
  TeleportElevatorManager.OnPlayerInteract(eventPlayer, eventInteractPoint);
}

export function OnPlayerEnterAreaTrigger(
  eventPlayer: mod.Player,
  eventAreaTrigger: mod.AreaTrigger,
): void {
  TeleportElevatorManager.OnPlayerEnterAreaTrigger(
    eventPlayer,
    eventAreaTrigger,
  );
}

export function OnPlayerExitAreaTrigger(
  eventPlayer: mod.Player,
  eventAreaTrigger: mod.AreaTrigger,
): void {
  TeleportElevatorManager.OnPlayerExitAreaTrigger(
    eventPlayer,
    eventAreaTrigger,
  );
}

export function OnPlayerLeaveGame(eventNumber: number): void {
  TeleportElevatorManager.OnPlayerLeaveGame(eventNumber);
}

export function OnPlayerUndeploy(eventPlayer: mod.Player): void {
  TeleportElevatorManager.OnPlayerUndeploy(eventPlayer);
}

