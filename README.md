# BF6 Portal - Elevator Script & Model

A configurable two-floor elevator system for **Battlefield 6 Portal** experiences.

The script creates the illusion of a working elevator by:

1. Closing the doors at the elevator's current floor.
2. Fading the screens of players inside the cabin to black.
3. Waiting for a configurable travel delay.
4. Teleporting those players to the matching cabin on the other floor.
5. Restoring each player's view and facing direction.
6. Opening the destination doors.

The system supports multiple elevators, multiple players inside the same elevator, animated sliding doors, per-player screen fades, automatic interact points, and door sound effects.

[![Test Example Video](https://img.youtube.com/vi/cSQ4XaOBxG8/hqdefault.jpg)](https://youtu.be/cSQ4XaOBxG8)

[Watch the video on YouTube](https://youtu.be/cSQ4XaOBxG8)

---

## Table of contents

- [Features](#features)
- [How the elevator works](#how-the-elevator-works)
- [Requirements](#requirements)
- [Objects required in Godot](#objects-required-in-godot)
- [Recommended object layout](#recommended-object-layout)
- [Installation](#installation)
- [Configuring your first elevator](#configuring-your-first-elevator)
- [Configuration reference](#configuration-reference)
- [Understanding door movement](#understanding-door-movement)
- [Integrating the event handlers](#integrating-the-event-handlers)
- [Adding more elevators](#adding-more-elevators)
- [Runtime sequence](#runtime-sequence)
- [Troubleshooting](#troubleshooting)
- [Performance notes](#performance-notes)
- [Important limitations](#important-limitations)
- [Credits](#credits)

---

## Features

- Two-floor teleport elevator.
- Supports travel both upward and downward.
- Automatically creates one interact point at each floor.
- Detects every player standing inside the elevator cabin.
- Teleports all valid players inside the source cabin.
- Preserves each player's relative position inside the cabin.
- Preserves each player's horizontal facing direction.
- Uses a full-screen black transition to hide the teleport.
- Opens and closes two sliding doors on each floor.
- Plays a configurable 3D sound when doors move.
- Prevents the elevator from being activated again while moving.
- Supports several independently configured elevators.
- Cleans up tracked player state when a player undeploys or leaves.

---

## How the elevator works

This is a **teleport elevator**, not a physically moving elevator cabin.

You create a matching cabin at the top floor and another matching cabin at the bottom floor. When the elevator is used, the script teleports players from one cabin to the other while their screens are black.

The script calculates the teleport offset with the two floor reference objects:

```text
Teleport offset = destination floor position - source floor position
```

That offset is added to each player's current position. This means a player standing near the back-left corner of the source cabin should appear near the back-left corner of the destination cabin.

### Example

```text
Bottom reference position: (100, 10, 200)
Top reference position:    (100, 50, 200)
Offset:                    (0, 40, 0)
```

Every transported player is moved upward by 40 units (meters in BF6).

---

## Requirements

You need:

- A BF6 Portal project.
- Two visually matching elevator cabins per elevator (you can use the included godot_elevator in **Releases**):
  - one cabin at the bottom floor;
  - one cabin at the top floor.
- Four Godot objects per floor (floor, left door, right door, AreaTrigger inside the cabin)
- Unique Godot object IDs for every configured object.
- Adjust event handlers if you already have a script.

No manually placed interact point is required. The script spawns the interact points automatically.

---

## Objects required in Godot

Each elevator has two floors. Each floor requires the following four objects:

| Object                 | Purpose                                                                 |
| ---------------------- | ----------------------------------------------------------------------- |
| Floor reference object | Defines the floor's teleport reference position and the sound position. |
| Left door              | The left sliding door controlled by the script.                         |
| Right door             | The right sliding door controlled by the script.                        |
| Area trigger           | Detects which players are inside the cabin.                             |

A complete two-floor elevator therefore requires eight configured Godot objects.

**IMPORTANT**: In Godot, your doors must visually be in the open position. Set the floor at whoch the elevator starts in the script (the position of the elevator on OnGameModeStarted).

### Bottom floor

```text
Bottom floor reference object
Bottom left door
Bottom right door
Bottom cabin area trigger
```

### Top floor

```text
Top floor reference object
Top left door
Top right door
Top cabin area trigger
```

---

## Recommended object layout

### 1. Create two matching cabins

Build one elevator cabin at the bottom floor and one at the top floor.

The cabins should have the same:

- size;
- orientation;
- internal layout;
- door direction;
- reference-point placement.

The teleport system works best when the top cabin is essentially a translated copy of the bottom cabin.

**NOTE**: If you are rotating the objects in Godot, they may become misplaced when they are moved. This is a Portal limitation of mod.MoveObjectOverTime.

### 2. Start all four doors in the open position

All elevator doors must be placed in their **open positions in Godot**.

The script treats their initial positions as their open positions. It calculates the closing movement from those initial positions.

At game start, the script automatically closes the doors at the inactive floor and leaves the starting floor open.

### 4. Set the left and right doors correctly

When looking at the elevator entrance FROM OUTSIDE:

```text
[ Left door ]   opening   [ Right door ]
```

The script moves the left door toward the right door and moves the right door toward the left door.

### 5. Place the area trigger around the cabin interior

The area trigger should cover the usable interior of the elevator cabin.

Don't forget to set the height property of the PolygonVolume in Godot.

**IMPORTANT**: Ensure the PolygonVolume or AreaTrigger and NOT rotated, else the actual position of the trigger volume will be wrong.

Only players currently tracked inside the source floor's area trigger are transported.

### 6. Leave room for the automatic interact point

The script places the interact point halfway between the two open door pivots, then adds `interactPointYOffset` vertically.

This position may need to be adjusted in the script depending on your door model in Godot.

```text
Interact position = midpoint between doors + Y offset
```

You do not need to create an interact point in Godot.

---

## Installation

Use the script and .tscn (Godot file) found in the **release** folder of this repo.

### Step 1: Add the script to your project

Create a TypeScript file in your Portal Project, in the Editor, such as:

```text
teleport-elevator.ts
```

Paste the full elevator script into that file.

### Step 2: Decide how event handlers will be connected

The provided script already contains standalone event handlers at the bottom of the file:

```ts
OnGameModeStarted;
OnPlayerInteract;
OnPlayerEnterAreaTrigger;
OnPlayerExitAreaTrigger;
OnPlayerLeaveGame;
OnPlayerUndeploy;
```

If your project does not already define these handlers elsewhere, you can use the provided handlers directly.

If your project already has centralized event handlers, do not create duplicate exported handlers. Instead, call `TeleportElevatorManager` from your existing handlers. See [Integrating the event handlers](#integrating-the-event-handlers).

### Step 3: Find the Godot object IDs

Record the object ID for each floor's:

- reference object;
- left door;
- right door;
- area trigger.

Every ID must match the correct object. A wrong or duplicated ID can make the doors, triggers, or teleport offset behave incorrectly.

### Step 4: Edit `ELEVATOR_CONFIGS`

Replace the example object IDs with your own.

```ts
const ELEVATOR_CONFIGS: readonly TeleportElevatorConfig[] = [
  {
    id: "MainElevator",

    topFloor: {
      floorObjId: 9103,
      leftDoorObjId: 9101,
      rightDoorObjId: 9102,
      areaTriggerObjId: 9104,
      closedDoorPivotGap: 0,
    },

    bottomFloor: {
      floorObjId: 9203,
      leftDoorObjId: 9201,
      rightDoorObjId: 9202,
      areaTriggerObjId: 9204,
      closedDoorPivotGap: 0,
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
  },
];
```

### Step 5: Build and launch the experience

When the game mode starts, the script waits one second and initializes every configured elevator (see the OnGameModeStarted function).

During initialization it:

1. reads the configured Godot objects;
2. stores the open door positions;
3. calculates the door movement vectors;
4. creates an interact point at each floor;
5. closes the inactive floor's doors;
6. enables the interact points after initialization finishes.

---

## Configuring your first elevator

The configuration is the only section most users need to edit.

```ts
const ELEVATOR_CONFIGS: readonly TeleportElevatorConfig[] = [
  {
    id: "MainElevator",
    // Remaining settings...
  },
];
```

### Choose a unique ID

```ts
id: "MainElevator",
```

The ID is a human-readable name for the elevator. Use a unique name for every elevator.

Good examples:

```ts
id: "MainLobbyElevator";
id: "WarehouseElevator";
id: "TowerEastElevator";
```

### Enter the top-floor IDs

```ts
topFloor: {
  floorObjId: 9103,
  leftDoorObjId: 9101,
  rightDoorObjId: 9102,
  areaTriggerObjId: 9104,
  closedDoorPivotGap: 0,
},
```

### Enter the bottom-floor IDs

```ts
bottomFloor: {
  floorObjId: 9203,
  leftDoorObjId: 9201,
  rightDoorObjId: 9202,
  areaTriggerObjId: 9204,
  closedDoorPivotGap: 0,
},
```

### Select the starting floor

Start at the bottom:

```ts
startingFloor: ElevatorFloorLevel.Bottom,
```

Start at the top:

```ts
startingFloor: ElevatorFloorLevel.Top,
```

The doors at the starting floor remain open after initialization. The doors at the other floor are closed.

---

## Configuration reference

### Elevator identity and floors

| Setting         | Type                  | Description                                                |
| --------------- | --------------------- | ---------------------------------------------------------- |
| `id`            | `string`              | Unique human-readable name for the elevator.               |
| `topFloor`      | `ElevatorFloorConfig` | Object IDs and door setup for the top cabin.               |
| `bottomFloor`   | `ElevatorFloorConfig` | Object IDs and door setup for the bottom cabin.            |
| `startingFloor` | `ElevatorFloorLevel`  | Floor where the elevator begins when the game mode starts. |

### Floor object settings

| Setting              | Type     | Description                                                                                                                   |
| -------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `floorObjId`         | `number` | Godot object ID of the floor reference object. Used to calculate the teleport offset and position the door sound.             |
| `leftDoorObjId`      | `number` | Godot object ID of the left sliding door.                                                                                     |
| `rightDoorObjId`     | `number` | Godot object ID of the right sliding door.                                                                                    |
| `areaTriggerObjId`   | `number` | Godot object ID of the trigger covering the cabin interior.                                                                   |
| `closedDoorPivotGap` | `number` | Desired reference gap used by the door-movement calculation. See [Understanding door movement](#understanding-door-movement). |

### Movement and timing settings

| Setting                         | Type     | Suggested starting value | Description                                                                                       |
| ------------------------------- | -------- | -----------------------: | ------------------------------------------------------------------------------------------------- |
| `doorMoveSeconds`               | `number` |                      `2` | Time required for the doors to open or close.                                                     |
| `doorClosePositionScale`        | `number` |           `0.3` to `0.5` | Scales how far each door moves toward the other door.                                             |
| `interactPointYOffset`          | `number` |                    `1.5` | Moves the automatic interact point upward or downward.                                            |
| `teleportMoveTransitionSeconds` | `number` |                      `2` | Simulated elevator travel time while players see a black screen.                                  |
| `transitionFadeSeconds`         | `number` |                    `0.4` | Duration of each fade-to-black and fade-from-black animation.                                     |
| `transitionFadeStepSeconds`     | `number` |                    `0.1` | Delay between opacity updates during the fade. Lower is smoother but creates more script updates. |

### Sound settings

| Setting             | Type                      | Description                                                                         |
| ------------------- | ------------------------- | ----------------------------------------------------------------------------------- |
| `doorMoveSfx`       | `mod.RuntimeSpawn_Common` | Runtime sound object spawned when the doors move. It should be a `OneShot3D` sound. |
| `doorMoveSfxVolume` | `number`                  | Sound playback volume.                                                              |
| `doorMoveSfxRange`  | `number`                  | Maximum range at which players can hear the sound.                                  |

---

## Understanding door movement

Door setup is the part most likely to require visual tuning.

### How the script calculates movement

The script reads the initial open positions of both door pivots and measures the distance between them.

For each door, the movement distance is:

```text
(open pivot distance - closedDoorPivotGap) × doorClosePositionScale
```

The left door moves toward the right door. The right door moves by the opposite vector.

### What `doorClosePositionScale` means

Assume the open door pivots are 10 units apart and `closedDoorPivotGap` is `0`.

|              Scale |   Each door moves | Combined gap reduction | Result                          |
| -----------------: | ----------------: | ---------------------: | ------------------------------- |
|             `0.25` |         2.5 units |                5 units | 5-unit pivot gap remains.       |
|              `0.5` |           5 units |               10 units | Both pivots meet in the center. |
| Greater than `0.5` | More than 5 units |     More than 10 units | The doors may cross or overlap. |

In many models, the door pivots are at the center of the door meshes rather than at their inner edges. For that reason, visually correct doors may require a remaining pivot gap.

### Recommended tuning method

1. Start with:

   ```ts
   doorClosePositionScale: 0.5,
   closedDoorPivotGap: 0,
   ```

2. Launch the experience and observe the closed doors.
3. If they overlap, either:
   - reduce `doorClosePositionScale`; or
   - increase `closedDoorPivotGap`.
4. If they stop too early, either:
   - increase `doorClosePositionScale`; or
   - reduce `closedDoorPivotGap`.
5. Change only one setting at a time.

### Door pivots matter

The script uses the objects' positions, which normally correspond to their pivots.

Unexpected movement can occur when:

- the pivot is far from the door mesh;
- the left and right doors use inconsistent pivot placement;
- the doors are not placed in their fully open positions;
- the configured left and right IDs are reversed.

### Door rotation

The current script passes `(0, 0, 0)` as the rotation argument to `MoveObjectOverTime`.

```ts
const noRotation = mod.CreateVector(0, 0, 0);
```

Depending on how the Portal movement function applies that argument, a door with a non-zero Godot rotation may reset or lose its intended orientation while moving. For rotated doors, read each door's current rotation and pass that rotation into its own `MoveObjectOverTime` call.

Example adjustment:

```ts
const leftDoorRotation = mod.GetTransformRotation(
  mod.GetObjectTransform(floor.leftDoorObject),
);

const rightDoorRotation = mod.GetTransformRotation(
  mod.GetObjectTransform(floor.rightDoorObject),
);

mod.MoveObjectOverTime(
  floor.leftDoorObject,
  leftDoorDelta,
  leftDoorRotation,
  this.config.doorMoveSeconds,
  false,
  false,
);

mod.MoveObjectOverTime(
  floor.rightDoorObject,
  rightDoorDelta,
  rightDoorRotation,
  this.config.doorMoveSeconds,
  false,
  false,
);
```

Use the exact rotation behavior required by the Portal API version used by your project.

---

## Integrating the event handlers

### Option A: Use the script as a standalone event file

The included event handlers can remain unchanged when your project does not define the same handlers elsewhere.

```ts
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
```

### Option B: Call the manager from existing project handlers

If your project already has these event functions, keep your existing handlers and add the manager calls inside them.

```ts
export async function OnGameModeStarted(): Promise<void> {
  // Your other startup logic...

  void TeleportElevatorManager.Init();
}
```

```ts
export function OnPlayerInteract(
  eventPlayer: mod.Player,
  eventInteractPoint: mod.InteractPoint,
): void {
  TeleportElevatorManager.OnPlayerInteract(eventPlayer, eventInteractPoint);

  // Your other interaction logic...
}
```

```ts
export function OnPlayerEnterAreaTrigger(
  eventPlayer: mod.Player,
  eventAreaTrigger: mod.AreaTrigger,
): void {
  TeleportElevatorManager.OnPlayerEnterAreaTrigger(
    eventPlayer,
    eventAreaTrigger,
  );

  // Your other area-trigger logic...
}
```

```ts
export function OnPlayerExitAreaTrigger(
  eventPlayer: mod.Player,
  eventAreaTrigger: mod.AreaTrigger,
): void {
  TeleportElevatorManager.OnPlayerExitAreaTrigger(
    eventPlayer,
    eventAreaTrigger,
  );

  // Your other area-trigger logic...
}
```

```ts
export function OnPlayerLeaveGame(playerObjId: number): void {
  TeleportElevatorManager.OnPlayerLeaveGame(playerObjId);

  // Your other cleanup logic...
}
```

```ts
export function OnPlayerUndeploy(eventPlayer: mod.Player): void {
  TeleportElevatorManager.OnPlayerUndeploy(eventPlayer);

  // Your other undeploy logic...
}
```

### Why every handler matters

| Handler                    | Why it is needed                                                              |
| -------------------------- | ----------------------------------------------------------------------------- |
| `OnGameModeStarted`        | Creates the floors, door data, and automatic interact points.                 |
| `OnPlayerInteract`         | Detects when a player activates an elevator interact point.                   |
| `OnPlayerEnterAreaTrigger` | Adds a player to the correct cabin's tracked-player map.                      |
| `OnPlayerExitAreaTrigger`  | Removes a player who leaves the cabin.                                        |
| `OnPlayerLeaveGame`        | Removes disconnected players and cancels their transition UI.                 |
| `OnPlayerUndeploy`         | Prevents undeployed players from remaining tracked or keeping a fade overlay. |

If the area-trigger handlers are missing, the doors may operate but no players will be transported.

---

## Adding more elevators

Add another object to `ELEVATOR_CONFIGS`.

```ts
const ELEVATOR_CONFIGS: readonly TeleportElevatorConfig[] = [
  {
    id: "MainElevator",
    // First elevator settings...
  },
  {
    id: "WarehouseElevator",

    topFloor: {
      floorObjId: 10103,
      leftDoorObjId: 10101,
      rightDoorObjId: 10102,
      areaTriggerObjId: 10104,
      closedDoorPivotGap: 0,
    },

    bottomFloor: {
      floorObjId: 10203,
      leftDoorObjId: 10201,
      rightDoorObjId: 10202,
      areaTriggerObjId: 10204,
      closedDoorPivotGap: 0,
    },

    startingFloor: ElevatorFloorLevel.Top,

    doorMoveSeconds: 2,
    doorClosePositionScale: 0.5,
    interactPointYOffset: 1.5,
    teleportMoveTransitionSeconds: 3,

    transitionFadeSeconds: 0.4,
    transitionFadeStepSeconds: 0.1,

    doorMoveSfx:
      mod.RuntimeSpawn_Common
        .SFX_Gadgets_EoDBot_Spawnable_Arm_Vertical_OneShot3D,

    doorMoveSfxVolume: 0.7,
    doorMoveSfxRange: 30,
  },
];
```

### Rules for multiple elevators

- Give every elevator a unique `id`.
- Use unique object IDs for all floor objects, doors, and triggers.
- Do not reuse an area trigger between elevators.
- Make sure each elevator's top and bottom cabins are paired correctly.
- Each elevator can use different timing, sound, and door settings.

The manager initializes all configured elevators in parallel.

---

## Runtime sequence

Assume the elevator is currently at the bottom floor.

### When a player interacts

1. The script confirms that initialization is complete.
2. It confirms the player is valid.
3. It checks whether the used interact point belongs to an elevator.
4. It ignores additional activation attempts if that elevator is already moving.
5. It disables both interact points for that elevator.
6. It closes the bottom-floor doors.
7. It waits for `doorMoveSeconds`.
8. It collects all valid players tracked in the bottom cabin.
9. It fades their screens to black.
10. It waits for the fade and simulated travel time.
11. It teleports the players to the top cabin.
12. It fades their screens back to normal.
13. It opens the top-floor doors.
14. It updates the elevator's current floor.
15. It re-enables both interact points.

The reverse sequence is used when the elevator travels downward.

### Calling the elevator from the opposite floor

Both interact points are enabled whenever the elevator is idle.

A player can therefore activate the elevator from either floor. The script moves the elevator in the direction opposite its current floor:

```text
Current floor: Bottom -> next trip goes Top
Current floor: Top    -> next trip goes Bottom
```

Only players inside the current source cabin are teleported.

---

## Troubleshooting

### The interact point does not appear

Check the following:

1. `TeleportElevatorManager.Init()` is being called.
2. `OnGameModeStarted` is actually firing.
3. All door object IDs are valid.
4. The script successfully reaches `CreateFloor()`.
5. The interact point is not below or above the expected location.

Try adjusting:

```ts
interactPointYOffset: 1.5,
```

Use a larger value to move the prompt upward or a smaller value to move it downward.

The horizontal interact position is automatically calculated from the midpoint between the two door pivots.

### The doors move away from each other

The left and right door IDs are probably reversed.

Check:

```ts
leftDoorObjId: 9101,
rightDoorObjId: 9102,
```

The left door must physically be on the left when facing the entrance.

### The doors stop moving before being visually closed

Increase `doorClosePositionScale` gradually.

```ts
doorClosePositionScale: 0.35,
```

Then try:

```ts
doorClosePositionScale: 0.4,
```

Do not make large changes until you understand how the pivots are positioned.

### The doors overlap or pass through each other

Reduce `doorClosePositionScale` or increase `closedDoorPivotGap`.

Example:

```ts
doorClosePositionScale: 0.45,
closedDoorPivotGap: 0.5,
```

### The doors do not return to the exact open position

The script calculates each opening delta as the exact negative of its closing delta. If the doors still fail to return correctly, verify that:

- no other script moves the same door objects;
- the door objects begin in the open position;
- the move is not interrupted externally;
- the configured IDs point to the actual door objects.

### The doors lose or use the wrong rotation

The current version passes `(0, 0, 0)` as the rotation argument to `MoveObjectOverTime`. Doors that have a non-zero Godot rotation may therefore reset or use the wrong orientation.

Read the current rotation of each door and pass it into that door's movement call, as shown in [Door rotation](#door-rotation). Also confirm that no other system moves or rotates the same objects.

### The doors move, but players do not teleport

The most common cause is missing or incorrect area-trigger handling.

Verify that:

- the AreaTrigger and associated PolygonVolume do not have rotation value - it must be (0, 0, 0);
- `OnPlayerEnterAreaTrigger` calls the elevator manager;
- `OnPlayerExitAreaTrigger` calls the elevator manager;
- `areaTriggerObjId` matches the cabin trigger;
- the trigger covers the player's location;
- the player entered the trigger after initialization;
- the player is still inside the source trigger when teleporting.

### Players teleport to the wrong place

The floor reference objects are probably not positioned consistently.

The system preserves player position by applying the difference between the floor reference positions. It does not inspect the shape of the cabins.

Make sure the two reference objects occupy the same relative point inside their respective cabins.

### Players arrive inside a wall

Possible causes:

- the cabins are not matching copies;
- the top and bottom references are inconsistent;
- one cabin is rotated differently;
- the source trigger includes areas outside the actual cabin;
- the destination cabin has different collision geometry.

The script applies a positional offset only. It does not rotate player positions around the cabin.

### The player's direction changes after teleporting

The script reads the player's facing direction and converts it to a yaw angle before teleporting.

Make sure the player is still valid and deployed at teleport time. Also verify that another system is not changing the player's rotation immediately after the teleport.

### The screen stays black

Verify that both of these are connected:

```ts
OnPlayerLeaveGame;
OnPlayerUndeploy;
```

They call `CancelPlayerTransition`, which resets and hides the player's transition widget.

Also avoid deleting or replacing the transition widget from another UI system while the elevator animation is running.

### The fade is choppy

Reduce:

```ts
transitionFadeStepSeconds: 0.05,
```

This creates more opacity updates and a smoother fade.

### The fade creates too many updates

Increase:

```ts
transitionFadeStepSeconds: 0.1,
```

or:

```ts
transitionFadeStepSeconds: 0.2,
```

A larger step reduces update frequency but makes the animation less smooth.

### The door sound does not play

Verify that:

- `doorMoveSfx` is a valid runtime-spawn sound;
- the selected sound is suitable for 3D one-shot playback;
- `doorMoveSfxVolume` is greater than zero;
- `doorMoveSfxRange` is large enough;
- the floor reference object is positioned near the elevator.

The sound is spawned at `floor.elevatorPosition`, which comes from `floorObjId`.

### One elevator activates another elevator

Check for duplicated object IDs, especially interact-related door and area-trigger IDs.

Every configured Godot object ID should identify exactly one intended object.

---

## Performance notes

### Fade update frequency

Each transported player receives a per-player UI animation.

The approximate number of opacity updates per fade is:

```text
transitionFadeSeconds / transitionFadeStepSeconds
```

Example:

```text
0.4 / 0.1 = 4 updates per fade
```

Since a full trip has one fade-in and one fade-out, that example produces approximately eight opacity updates per transported player.

Use a reasonable step value when transporting many players simultaneously.

### Transition widgets are reused

The script creates one black transition widget per player and stores it in a map. The same widget is reused on later elevator trips rather than recreated every time.

### Sounds are temporary

Each door movement sound is stopped and unspawned after `doorMoveSeconds`.

### Elevator initialization

All configured elevators initialize through `Promise.all`, so their setup runs concurrently.

### Interactions are locked during movement

Disabling interact points while moving prevents overlapping trips and duplicate movement sequences for the same elevator.

---

## Important limitations

### Two floors per elevator

Each configured elevator connects exactly two cabins:

```text
Top <-> Bottom
```

Supporting three or more stops would require a different floor-selection and state system.

### The cabin does not physically move

Only the doors move. The players are teleported between two fixed cabin copies.

### Destination cabin orientation should match

The player position is translated but not rotated around the floor reference point.

For best results, both cabins should face the same direction and use the same layout.

### The elevator has no floor-selection menu

Either interact point simply tells the elevator to travel to the opposite floor.

### The interact point is automatically positioned

Its horizontal position is tied to the midpoint between the door pivots. Unusual door pivots or rotations may require code changes for custom X/Z placement.

### Players must be tracked by the area trigger

A player who is visually inside the elevator but not registered inside its area trigger will not be transported.

### Door translation uses the original open positions

The script assumes all doors begin open. Closed or partially open starting positions produce incorrect movement calculations.

## Credits

Script created by Nodone.

Initial request and Godot file example by Gekko.
