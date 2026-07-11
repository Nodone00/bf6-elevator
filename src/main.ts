/*-------------------------------------------------------
BattleGOLF v. 0.93 by Nodone
April 3, 2026

BF6 Portal API/server Limitations:
- Portal custom servers at 30 Hz (as opposed to 60 Hz like non-portal BF6 servers) severely limits smooth quick-moving UI animations, physics sim visuals, and general responsiveness
- No camera control (e.g., ability to set Fixed camera, but no ability to reposition/move or to set view orientation, such as to follow the ball or view the flag)
- No ability to set SFX volume after SFX is played (e.g., unable to transition in/out crowd cheering SFX when ball is in hole)
- No golf club model in Eastwood map
- Golf ball disappears even at close/mid distance because of low LOD
- No ability to set Worldicon parameters such as textAlpha, textSize, minRenderDistance, maxRenderDistance, etc.

Dev Notes:
- ForwardSpin Hitmodifier is commented out - TBD if will be implemented or replaced
-------------------------------------------------------*/

const GAMEMODE_INFO = {
  name: "BattleGOLF",
  author: "Nodone",
  description: "A golf experience for Battlefield 6",
  version: 0.93,
};

const GROUP_MODE: "Static" | "Dynamic" = "Dynamic";

let GAME_ENDING = false;

// prettier-ignore
const HeightMap_Hole_1 = {
  minX:772,
  maxX:1084,
  minZ:-400,
  maxZ:-112,
  step:4,
  h:[
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,235.408,236.174,236.487,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,234.51,235.242,235.964,236.376,236.539,236.578,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,234.23,235.154,235.839,236.509,236.683,236.657,236.653,236.263,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,233.468,233.998,234.836,235.552,236.267,236.946,237.018,236.642,236.683,236.333,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,233.322,233.778,234.169,234.846,235.552,236.246,236.813,237.194,237.097,236.87,236.723,236.409,236.321,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,233.979,234.212,235.05,235.305,235.723,236.346,236.97,237.427,237.619,237.449,237.197,236.869,236.742,236.66,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,234.35,234.577,234.928,235.345,235.963,236.403,236.662,237.176,237.591,237.91,238.044,237.764,237.397,237.099,236.933,236.761,236.697,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,234.897,235.328,235.48,235.803,236.362,236.969,237.352,237.606,237.923,238.187,238.289,238.251,238.03,237.777,237.43,237.175,236.971,236.821,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,235.327,236.0,236.417,236.612,236.871,237.173,237.748,238.204,238.501,238.746,238.895,238.824,238.683,238.396,238.017,237.665,237.561,237.278,237.084,236.952,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,235.605,236.428,236.977,237.359,237.687,237.842,238.177,238.66,239.062,239.339,239.57,239.645,239.533,239.184,238.848,238.427,238.123,237.95,237.627,237.417,237.349,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,235.348,236.595,237.745,238.169,238.351,238.382,238.477,238.719,239.076,239.449,239.79,239.928,239.966,239.917,239.719,239.375,238.925,238.367,238.021,238.038,237.998,237.993,237.581,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,234.865,236.162,237.553,238.345,238.723,238.777,238.752,238.792,238.968,239.16,239.474,239.778,239.947,240.056,240.043,239.989,239.603,239.248,238.729,238.363,238.259,238.371,238.162,237.889,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,234.35,235.586,236.882,237.924,238.539,237.659,237.541,237.633,238.281,238.855,239.021,239.305,239.433,239.719,239.818,239.896,239.794,239.558,239.222,239.132,238.962,238.661,238.42,238.216,237.917,237.819],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,234.142,235.167,236.273,237.311,238.018,238.41,237.266,236.689,237.035,238.214,238.587,238.589,238.705,238.986,239.204,239.348,239.409,239.554,239.623,239.447,239.576,239.407,239.183,238.642,238.062,237.885,237.863],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,234.267,235.101,235.904,236.852,237.607,238.026,237.546,236.958,237.103,237.817,238.123,238.04,238.232,238.492,238.754,238.976,239.14,239.243,239.313,239.43,239.69,239.708,239.594,239.325,238.956,238.264,237.872,237.682],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,234.427,235.241,235.862,236.669,237.645,237.645,236.957,237.044,237.16,237.922,238.258,237.909,237.932,238.114,238.367,238.612,238.833,239.021,239.18,239.315,239.47,239.88,239.914,239.76,239.469,239.123,238.479,238.249,238.008],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,234.549,235.158,235.903,236.688,237.553,238.207,237.424,236.992,237.063,237.662,238.452,238.121,238.09,238.082,238.161,238.342,238.548,238.754,238.958,239.14,239.307,239.473,239.712,239.978,239.858,239.604,239.286,238.949,238.548,238.313],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,234.503,235.267,235.997,236.794,237.665,238.244,238.562,238.478,237.961,238.057,238.583,238.425,238.248,238.239,238.232,238.271,238.374,238.525,238.714,238.911,239.094,239.267,239.433,239.586,239.955,239.883,239.686,239.48,239.205,239.005,238.701],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,234.34,235.228,235.947,236.804,237.626,238.253,238.555,238.643,238.659,238.658,238.65,238.567,238.339,238.334,238.326,238.326,238.335,238.391,238.509,238.682,238.872,239.054,239.22,239.371,239.662,239.892,239.882,239.718,239.468,239.392,239.234,239.08],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,234.002,234.939,235.746,236.531,237.422,238.175,238.538,238.642,238.653,238.51,238.505,238.362,238.358,238.358,238.351,238.35,238.35,238.358,238.398,238.493,238.65,238.833,239.022,239.189,239.338,239.749,239.836,239.851,239.78,239.621,239.449,239.302,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,233.983,234.632,235.401,236.107,236.912,237.782,238.404,238.61,238.362,238.358,238.358,238.358,238.358,238.358,238.358,238.358,238.358,238.358,238.359,238.39,238.469,238.619,238.809,239.006,239.177,239.608,239.709,239.766,239.796,239.758,239.639,239.496,239.353,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,233.895,234.383,234.905,235.47,236.279,237.093,237.934,238.29,238.334,238.358,238.358,238.358,238.358,238.358,238.358,238.358,238.358,238.358,238.358,238.358,238.375,238.446,238.595,238.869,239.28,239.464,239.583,239.662,239.687,239.702,239.67,239.567,239.403,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,233.906,234.348,234.708,235.087,235.61,236.348,237.214,237.896,238.176,238.334,238.358,238.358,238.358,238.358,238.358,238.358,238.358,238.358,238.358,238.358,238.546,238.667,238.753,238.91,239.039,239.095,239.43,239.551,239.599,239.6,239.576,239.491,239.023,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,234.135,234.493,234.745,234.903,235.341,235.829,236.564,237.291,237.666,238.144,238.326,238.357,238.358,238.358,238.358,238.358,238.358,238.358,238.358,238.358,238.648,238.652,237.893,237.458,237.619,237.256,237.513,238.768,239.496,239.52,239.357,238.884,238.833,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,233.948,234.637,234.981,235.159,235.394,235.728,236.144,236.805,237.126,237.64,238.096,238.303,238.35,238.358,238.358,238.358,238.358,238.358,238.358,238.358,238.358,238.659,238.323,236.375,236.551,236.581,236.989,238.099,239.338,239.026,238.747,238.769,238.793,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,234.029,234.333,235.105,235.435,235.624,235.853,236.139,236.473,236.633,237.187,237.639,238.018,238.255,238.342,238.358,238.358,238.358,238.358,238.358,238.358,238.358,238.553,238.714,238.698,237.477,236.86,237.333,238.696,238.682,238.635,238.674,238.715,238.837,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,234.113,234.189,234.969,235.589,235.884,236.083,236.319,236.579,236.824,236.841,237.267,237.639,237.931,238.16,238.303,238.359,238.366,238.358,238.358,238.358,238.361,238.546,238.706,238.816,238.959,239.058,238.651,238.472,238.517,238.571,238.634,238.943,239.106,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,234.197,234.38,234.87,235.64,236.082,236.303,236.38,236.599,236.92,237.156,237.077,237.308,237.614,237.828,238.018,238.199,238.333,238.381,238.382,238.374,238.576,238.703,238.667,238.736,238.638,238.337,238.351,238.399,238.455,238.681,239.194,239.204,239.116,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,234.28,234.541,235.133,235.673,236.202,236.395,235.327,234.487,235.716,237.177,237.386,237.244,237.355,237.528,237.694,237.844,238.018,238.17,238.419,238.585,238.595,238.581,238.621,238.363,238.197,238.239,238.28,238.399,239.039,239.379,239.308,239.211,239.093,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,234.59,235.229,235.756,236.268,236.64,235.908,234.991,235.517,236.75,237.339,237.504,237.346,237.394,237.426,237.468,237.728,238.146,238.287,238.374,238.421,238.481,238.222,238.106,238.137,238.18,238.509,239.3,239.424,239.434,239.365,239.225,239.078,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,234.685,235.334,235.871,236.36,236.738,236.109,235.475,235.799,236.819,237.315,237.448,237.331,237.386,237.433,237.636,237.703,237.783,238.049,238.193,238.279,238.207,238.044,238.065,238.096,238.553,239.073,239.29,239.417,239.458,239.426,239.289,239.127,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,234.758,235.495,236.048,236.48,236.824,237.03,236.112,235.835,236.123,237.365,237.433,237.37,237.323,237.426,237.703,237.758,237.781,237.839,238.082,238.219,238.039,238.026,238.037,238.394,238.863,239.039,239.22,239.348,239.413,239.435,239.351,239.202,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,234.919,235.711,236.202,236.643,236.941,237.131,237.27,237.267,236.875,237.434,237.489,237.448,237.292,237.394,237.502,237.867,237.86,237.915,237.995,238.131,238.027,238.026,238.162,238.661,238.822,239.005,239.131,239.386,239.346,239.384,239.482,239.26,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,234.851,235.871,236.193,236.77,237.069,237.243,237.378,237.457,237.505,237.532,237.478,237.324,237.315,237.386,237.497,237.795,237.986,238.019,238.075,238.128,238.051,238.039,238.478,238.675,238.775,238.943,239.092,239.194,239.229,239.309,239.296,239.271,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,235.894,236.367,236.919,237.204,237.362,237.405,237.268,237.299,237.314,237.323,237.332,237.363,237.426,237.513,237.63,238.003,238.097,238.201,238.148,238.097,238.121,238.595,238.698,238.84,238.917,239.091,239.111,239.172,239.337,239.229,239.159,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,236.051,236.7,237.057,237.33,237.338,237.292,237.355,237.387,237.402,237.409,237.402,237.41,237.465,237.56,237.639,238.01,238.105,238.211,238.205,238.153,238.245,238.629,238.735,238.8,238.887,238.907,239.041,239.049,239.139,239.17,239.126,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,236.183,236.908,237.235,237.457,237.555,237.701,237.604,237.488,237.497,237.497,237.489,237.489,237.513,237.599,237.671,237.848,238.114,238.218,238.299,238.233,238.349,238.664,238.81,238.916,238.84,238.844,238.918,239.043,238.993,239.099,239.055,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,236.467,237.054,237.377,237.583,237.419,237.513,237.568,237.592,237.6,237.599,237.592,237.584,237.592,237.631,237.71,237.781,238.109,238.24,238.434,238.342,238.405,238.8,238.886,239.062,238.833,238.843,238.781,238.883,238.934,238.986,238.863,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,236.778,237.229,237.514,237.726,237.547,237.631,237.686,237.71,237.718,237.718,237.711,237.71,237.711,237.719,237.757,237.828,237.981,238.288,238.555,238.468,238.468,238.909,238.968,239.109,239.075,239.036,238.811,238.72,238.713,238.775,238.591,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,237.435,237.694,237.883,237.908,237.765,237.813,237.837,237.845,237.845,237.845,237.852,237.852,237.861,237.877,237.907,237.979,238.363,238.552,238.611,238.553,238.985,239.239,239.233,239.283,239.258,239.182,238.872,238.536,238.239,238.528,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,237.637,237.877,237.912,237.848,237.908,237.947,237.971,237.986,237.995,238.002,238.01,238.018,238.034,238.042,238.066,238.109,238.468,238.589,238.788,238.707,239.016,239.28,239.491,239.446,239.55,239.506,239.42,238.906,238.089,237.691,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,237.814,238.065,238.069,238.011,238.058,238.089,238.105,238.121,238.144,238.16,238.177,238.201,238.232,238.241,238.263,238.295,238.569,238.722,238.974,238.881,238.933,239.367,239.454,239.624,239.727,239.725,239.684,239.259,239.093,238.208,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,237.872,238.239,238.386,238.186,238.208,238.224,238.24,238.256,238.279,238.312,238.35,238.39,238.43,238.468,238.492,238.517,238.782,238.92,239.009,239.071,239.0,239.394,239.523,239.679,239.805,239.882,239.873,239.522,239.405,239.309,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,237.445,238.185,238.554,238.423,238.359,238.359,238.366,238.375,238.406,238.454,238.509,238.565,238.627,238.675,238.722,238.771,239.034,239.165,239.228,239.331,239.188,239.325,239.666,239.693,239.839,239.929,239.99,239.663,239.607,239.654,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,238.246,238.549,238.651,238.524,238.501,238.485,238.493,238.524,238.58,238.644,238.73,238.817,238.888,238.951,239.017,239.335,239.434,239.489,239.551,239.38,239.318,239.694,239.768,239.83,239.873,239.934,239.835,239.672,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,238.908,238.996,238.972,238.715,238.65,238.618,238.604,238.628,238.689,238.769,238.864,238.974,239.07,239.164,239.246,239.626,239.703,239.773,239.826,239.7,239.504,239.684,239.832,239.789,239.79,239.816,239.893,239.706,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,239.017,239.506,239.22,238.968,238.808,238.753,238.722,238.73,238.785,238.864,238.975,239.101,239.227,239.339,239.456,239.819,239.962,240.042,240.103,240.126,239.695,239.635,239.974,239.852,239.756,239.664,239.732,239.784,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,238.813,239.643,239.505,239.142,238.96,238.889,238.847,238.833,238.873,238.951,239.069,239.197,239.339,239.488,239.624,239.767,240.184,240.287,240.366,240.366,240.069,239.821,239.993,239.994,239.899,239.68,239.561,239.782,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,237.78,239.668,239.678,239.355,239.118,239.031,238.968,238.944,238.968,239.038,239.149,239.291,239.441,239.6,239.765,239.924,240.22,240.5,240.595,240.649,240.637,240.004,239.943,240.368,240.011,239.747,239.635,239.52,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,239.858,239.92,239.574,239.277,239.172,239.093,239.054,239.069,239.126,239.228,239.363,239.527,239.694,239.869,240.05,240.223,240.44,240.785,240.856,240.864,240.419,240.129,240.326,240.374,240.055,239.721,239.565,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,239.892,239.892,239.717,239.427,239.307,239.22,239.165,239.165,239.212,239.307,239.434,239.591,239.765,239.955,240.145,240.327,240.501,240.785,241.029,241.054,241.014,240.305,240.251,240.621,240.397,240.041,239.688,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,240.034,240.033,239.821,239.577,239.449,239.347,239.282,239.267,239.299,239.385,239.497,239.647,239.821,240.01,240.208,240.405,240.588,240.754,241.121,241.212,241.219,240.63,240.413,240.608,240.583,240.292,239.999,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,240.126,240.174,239.956,239.734,239.607,239.489,239.402,239.37,239.393,239.457,239.56,239.702,239.868,240.057,240.255,240.453,240.643,240.816,241.054,241.314,241.331,241.226,240.556,240.515,240.773,240.542,240.441,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,240.309,240.137,239.909,239.774,239.647,239.545,239.496,239.496,239.537,239.63,239.757,239.908,240.089,240.287,240.485,240.682,240.857,241.126,241.36,241.373,241.401,240.723,240.642,240.864,240.76,240.692,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,240.436,240.365,240.107,239.964,239.828,239.71,239.632,239.615,239.638,239.703,239.813,239.947,240.12,240.31,240.509,240.713,240.888,241.211,241.417,241.45,241.465,241.059,240.761,240.804,240.907,240.689,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,240.531,240.6,240.343,240.177,240.034,239.9,239.798,239.75,239.757,239.797,239.877,239.994,240.145,240.326,240.523,240.733,241.038,241.273,241.449,241.504,241.52,241.382,240.864,240.828,241.093,241.006,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,240.721,240.776,240.579,240.405,240.256,240.106,239.987,239.916,239.892,239.915,239.971,240.058,240.185,240.343,240.531,240.722,241.203,241.385,241.504,241.582,241.59,241.489,240.931,240.903,241.159,241.09,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,241.299,241.014,240.667,240.5,240.335,240.193,240.098,240.057,240.05,240.089,240.153,240.254,240.382,240.54,240.722,241.031,241.385,241.527,241.605,241.372,241.301,241.041,240.966,241.108,241.175,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,241.865,241.777,241.276,240.894,240.603,240.422,240.302,240.231,240.208,240.224,240.271,240.349,240.452,240.58,240.754,241.077,241.354,241.528,241.631,241.651,241.362,241.093,241.021,241.059,241.262,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,242.15,242.136,241.898,241.457,241.07,240.721,240.517,240.421,240.374,240.381,240.413,240.469,240.556,240.658,240.818,241.139,241.361,241.481,241.646,241.71,241.507,241.198,241.038,241.037,241.491,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,242.307,242.333,242.212,241.798,241.496,241.148,240.824,240.628,240.548,240.539,240.564,240.612,240.682,240.778,240.968,241.211,241.392,241.488,241.553,241.71,241.707,241.373,241.054,241.047,241.424,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,242.508,242.405,242.105,241.733,241.464,241.165,240.903,240.738,240.691,240.705,240.753,240.824,240.928,241.187,241.385,241.472,241.529,241.637,241.676,241.608,241.488,241.055,241.054,241.312,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,242.641,242.603,242.458,241.972,241.678,241.425,241.173,240.967,240.856,240.84,240.879,240.959,241.112,241.39,241.512,241.582,241.63,241.685,241.716,241.598,241.564,241.058,241.054,241.351,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,242.671,242.759,242.703,242.476,242.07,241.709,241.426,241.19,241.032,240.969,241.023,241.178,241.347,241.505,241.623,241.693,241.739,241.762,241.725,241.584,241.449,241.079,241.057,241.209,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,242.715,242.834,242.741,242.501,242.158,241.827,241.536,241.286,241.198,241.221,241.322,241.479,241.613,241.709,241.787,241.802,241.755,241.715,241.591,241.422,241.109,241.072,241.184,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,242.9,243.207,243.228,243.228,243.234,242.078,241.854,241.599,241.442,241.417,241.487,241.566,241.662,241.757,241.843,241.865,241.787,241.647,241.53,241.468,241.148,241.102,241.139,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,243.201,243.143,243.086,243.124,243.194,243.226,243.212,243.197,241.608,241.536,241.552,241.607,241.702,241.796,241.882,241.92,241.834,241.678,241.537,241.462,241.247,241.134,241.119,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,243.171,243.146,243.0,242.938,242.976,243.046,243.147,243.224,243.226,243.172,241.631,241.648,241.733,241.828,241.899,241.945,241.889,241.725,241.568,241.464,241.346,241.191,241.168,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,243.172,243.031,242.929,242.927,242.927,242.929,243.007,243.085,243.163,243.226,243.242,241.791,241.86,241.938,241.985,241.936,241.765,241.599,241.449,241.34,241.269,241.22,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [243.199,243.1,242.953,242.927,242.927,242.927,242.927,242.928,242.945,243.031,243.162,243.211,241.94,241.986,242.041,242.023,241.859,241.662,241.473,241.312,241.346,241.299,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [243.15,243.007,242.928,242.927,242.927,242.927,242.927,242.927,242.927,242.945,243.039,243.179,243.242,242.126,242.127,242.008,241.758,241.552,241.391,241.431,241.391,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [243.085,242.937,242.927,242.927,242.927,242.927,242.927,242.927,242.927,242.927,242.953,243.101,243.207,242.227,242.189,241.962,241.656,241.447,241.517,241.473,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [243.077,242.929,242.927,242.927,242.927,242.927,242.927,242.927,242.927,242.927,242.937,243.085,243.206,242.313,242.212,241.914,241.572,241.506,241.551,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [243.085,242.937,242.927,242.927,242.927,242.927,242.927,242.927,242.927,242.927,242.945,243.093,243.179,242.459,242.191,241.845,241.566,241.628,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [243.132,242.984,242.928,242.927,242.927,242.927,242.927,242.927,242.927,242.929,243.008,243.155,243.227,242.659,242.192,241.793,241.709,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,243.108,242.984,242.928,242.927,242.927,242.927,242.928,242.937,243.0,243.139,243.218,243.23,242.814,242.177,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,243.092,242.961,242.929,242.929,242.968,243.038,243.077,243.147,243.218,243.234,243.828,243.017,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,243.109,243.077,243.031,243.07,243.185,243.217,243.227,243.246,243.243,243.894,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,243.179,243.18,243.226,243.247,243.31,244.661,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
  ]
};

// prettier-ignore
const HeightMap_Hole_2 = {
  minX:416.0,
  maxX:720.0,
  minZ:148.0,
  maxZ:536.0,
  step:4.0,
  h:[
    [null,null,null,null,null,228.086,228.358,228.591,228.792,228.942,229.049,229.164,229.221,229.361,229.566,229.817,230.113,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,227.884,228.154,228.41,228.651,228.919,229.112,229.252,229.373,229.48,229.551,229.639,229.798,230.056,230.329,230.598,230.744,230.811,230.856,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,227.99,228.266,228.55,228.832,229.007,229.266,229.434,229.537,229.617,229.672,229.695,229.72,229.844,230.001,230.2,230.39,230.54,230.672,230.827,231.079,231.299,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,228.405,228.777,229.069,229.229,229.362,229.481,229.593,229.679,229.735,229.766,229.735,229.695,229.724,229.844,229.978,230.109,230.233,230.382,230.637,231.005,231.322,231.535,231.537,231.369,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,228.539,228.867,229.144,229.314,229.36,229.308,229.379,229.493,229.79,229.82,229.626,229.57,229.569,229.555,229.554,229.585,229.642,229.762,230.019,230.386,230.764,231.141,231.403,231.495,231.387,231.183,230.914,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,228.895,229.15,229.349,229.404,229.338,229.42,229.492,229.553,229.83,229.837,229.64,229.64,229.639,229.632,229.624,229.623,229.64,229.674,229.759,229.923,230.228,230.8,231.155,231.289,231.238,231.148,231.02,230.84,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [228.88,229.085,229.303,229.498,229.419,229.45,229.536,229.6,229.649,229.909,229.844,229.711,229.713,229.716,229.704,229.702,229.703,229.72,229.766,229.829,229.932,230.114,230.368,230.617,231.04,231.08,231.018,231.028,231.001,230.842,230.698,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [229.124,229.3,229.419,229.623,229.507,229.544,229.619,229.679,229.776,230.026,229.799,229.807,229.832,229.824,229.783,229.781,229.783,229.805,229.846,229.91,230.004,230.129,230.28,230.448,230.581,230.904,231.006,231.04,231.063,231.024,230.966,230.602,230.954,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [229.363,229.502,229.629,229.75,229.65,229.614,229.685,229.786,230.049,229.923,229.904,230.106,230.118,230.097,229.995,229.869,229.87,229.892,229.932,229.995,230.083,230.193,230.32,230.454,230.579,230.667,230.88,231.07,231.048,231.062,231.188,230.945,231.15,231.404,231.664,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [229.687,229.845,229.914,229.948,229.955,229.954,230.011,230.077,229.988,229.903,230.143,229.888,229.907,229.917,230.182,229.979,229.956,229.979,230.019,230.083,230.163,230.265,230.391,230.518,230.635,230.73,230.809,231.063,231.257,231.254,231.441,231.406,231.274,231.69,231.957,232.249,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [230.066,230.198,230.232,230.209,230.138,230.074,230.068,230.098,229.879,230.127,229.889,229.901,229.909,229.924,230.221,230.012,229.994,230.028,230.074,230.146,230.24,230.351,230.477,230.611,230.748,230.888,231.008,231.128,231.522,231.647,231.729,231.835,231.665,231.929,232.229,232.508,232.812,233.496,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [230.446,230.542,230.571,230.492,230.351,230.209,230.122,229.981,229.873,230.139,229.861,229.861,229.869,229.875,230.089,229.932,229.949,229.994,230.051,230.114,230.217,230.351,230.495,230.667,230.874,231.086,231.261,231.411,231.592,231.985,232.075,232.225,232.193,232.119,232.427,232.727,233.007,233.361,233.732,233.689,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,230.89,230.896,230.783,230.575,230.36,230.184,229.948,229.838,230.082,229.802,229.783,229.768,229.964,229.846,229.774,229.805,229.845,229.899,229.971,230.09,230.242,230.432,230.667,230.952,231.228,231.464,231.657,231.83,232.136,232.431,232.542,232.633,232.547,232.582,232.871,233.086,233.392,234.042,234.323,234.137,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,231.186,231.183,231.07,230.819,230.521,230.264,229.95,229.752,229.877,229.97,229.935,229.836,229.696,229.559,229.552,229.57,229.6,229.64,229.726,229.855,230.043,230.304,230.621,230.959,231.276,231.571,231.829,232.065,232.256,232.704,232.872,232.989,232.975,232.88,232.853,233.143,233.392,233.687,234.073,234.58,234.484,234.592,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,231.465,231.365,231.096,230.716,230.359,230.074,229.702,229.633,229.608,229.547,229.435,229.341,229.291,229.262,229.258,229.266,229.307,229.387,229.529,229.757,230.073,230.468,230.872,231.253,231.616,231.946,232.242,232.501,232.71,233.17,233.277,233.333,233.291,233.147,233.204,233.342,233.633,233.987,234.335,234.659,234.779,234.918,234.934,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,231.661,231.637,231.366,230.951,230.518,230.226,229.802,229.575,229.442,229.315,229.199,229.096,229.016,228.953,228.899,228.881,228.899,228.978,229.128,229.372,229.733,230.187,230.668,231.126,231.567,231.993,232.375,232.715,232.977,233.216,233.584,233.633,233.634,233.519,233.324,233.317,233.547,233.899,234.257,234.612,234.81,235.021,235.222,235.164,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,231.773,231.587,231.197,230.747,230.43,230.137,229.642,229.411,229.195,229.024,228.89,228.777,228.668,228.566,228.51,228.496,228.551,228.699,228.944,229.318,229.815,230.358,230.887,231.411,231.955,232.454,232.89,233.228,233.458,233.673,233.92,233.882,233.786,233.616,233.387,233.434,233.81,234.163,234.548,234.985,235.266,235.306,235.396,235.453,235.457,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,231.765,231.704,231.396,231.007,230.691,230.422,229.949,229.514,229.214,228.952,228.754,228.611,228.461,228.326,228.218,228.154,228.177,228.289,228.52,228.898,229.394,229.964,230.568,231.198,231.837,232.454,232.993,233.418,233.701,233.859,233.943,234.121,233.988,233.806,233.617,233.319,233.671,234.057,234.453,234.811,235.195,235.447,235.5,235.644,235.672,235.609,235.481,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,231.703,231.56,231.285,230.999,230.708,230.372,229.77,229.38,229.031,228.739,228.564,228.385,228.208,228.052,227.947,227.917,227.988,228.187,228.535,229.017,229.585,230.24,230.951,231.686,232.39,233.028,233.546,233.906,234.105,234.154,234.123,234.208,233.995,233.782,233.583,233.412,233.941,234.328,234.678,235.032,235.357,235.509,235.68,235.742,235.725,235.637,235.512,235.407,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,231.631,231.685,231.554,231.323,231.038,230.73,230.328,229.695,229.278,228.905,228.66,228.462,228.25,228.059,227.91,227.831,227.855,228.013,228.315,228.755,229.294,229.956,230.706,231.492,232.27,232.982,233.598,234.036,234.303,234.384,234.312,234.17,234.182,233.978,233.759,233.737,233.714,234.21,234.563,234.904,235.192,235.46,235.581,235.692,235.695,235.631,235.559,235.473,235.401,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,231.435,231.71,231.741,231.6,231.393,231.149,230.833,230.326,229.688,229.261,228.937,228.692,228.47,228.256,228.07,227.964,227.939,228.036,228.273,228.643,229.127,229.759,230.494,231.287,232.096,232.864,233.529,234.048,234.388,234.533,234.509,234.349,234.13,234.168,234.066,233.97,234.129,234.014,234.484,234.797,235.071,235.282,235.44,235.499,235.527,235.503,235.426,235.406,235.363,235.353,235.33,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,231.514,231.764,231.807,231.759,231.625,231.356,230.961,230.3,229.775,229.41,229.103,228.843,228.63,228.431,228.289,228.226,228.265,228.415,228.691,229.095,229.655,230.333,231.102,231.901,232.682,233.372,233.942,234.351,234.571,234.62,234.524,234.367,234.204,234.372,234.35,234.387,234.543,234.405,234.766,235.011,235.141,235.252,235.361,235.354,235.305,235.26,235.247,235.269,235.239,235.184,235.578,236.021,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,231.31,231.619,231.949,232.16,232.18,231.98,231.574,231.094,230.45,230.003,229.664,229.378,229.151,228.96,228.801,228.708,228.692,228.749,228.913,229.213,229.656,230.256,230.959,231.706,232.462,233.149,233.744,234.202,234.484,234.614,234.62,234.571,234.5,234.36,234.673,234.699,234.827,234.904,234.839,234.969,235.14,235.185,235.174,235.264,235.219,235.194,235.205,235.202,235.081,235.382,235.797,236.247,236.783,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,231.568,231.996,232.484,232.698,232.571,232.186,231.716,231.307,230.816,230.308,230.018,229.773,229.583,229.427,229.323,229.261,229.262,229.324,229.473,229.797,230.281,230.879,231.545,232.232,232.888,233.479,233.941,234.28,234.507,234.621,234.676,234.69,234.658,234.563,234.972,235.109,235.204,235.229,235.164,235.124,235.169,235.141,235.132,235.271,235.2,235.034,234.97,235.247,235.592,236.025,236.549,237.086,237.693,238.319,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,231.627,232.067,232.571,232.956,232.975,232.72,232.328,231.964,231.6,231.251,230.829,230.447,230.256,230.106,229.996,229.916,229.877,229.855,229.879,230.052,230.398,230.868,231.426,232.011,232.604,233.15,233.608,233.995,234.303,234.518,234.659,234.746,234.809,234.831,234.931,235.346,235.471,235.526,235.464,235.299,235.227,235.209,235.224,235.262,235.344,235.347,235.17,235.534,235.897,236.296,236.825,237.372,238.003,238.689,239.346,239.93,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,232.091,232.501,232.849,233.085,233.054,232.84,232.556,232.224,231.901,231.661,231.393,231.02,230.796,230.668,230.573,230.509,230.431,230.376,230.423,230.612,230.928,231.348,231.829,232.327,232.817,233.253,233.655,234.003,234.296,234.516,234.675,234.809,234.904,235.041,235.502,235.631,235.679,235.679,235.623,235.513,235.473,235.528,235.576,235.654,235.648,235.622,235.714,236.164,236.642,237.147,237.665,238.285,238.928,239.606,240.255,240.791,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,231.994,232.397,232.684,232.96,233.157,233.181,233.046,232.809,232.549,232.336,232.114,231.93,231.745,231.592,231.461,231.273,231.036,230.889,230.841,230.905,231.087,231.371,231.719,232.099,232.502,232.881,233.253,233.63,233.964,234.256,234.493,234.705,234.865,235.023,235.412,235.677,235.788,235.843,235.876,235.861,235.806,235.9,235.995,236.075,236.052,236.061,236.16,236.394,236.913,237.409,237.932,238.485,239.102,239.741,240.38,240.933,241.345,241.621,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,232.319,232.489,232.865,233.135,233.315,233.376,233.29,233.134,232.983,232.793,232.588,232.445,232.202,232.091,231.947,231.83,231.689,231.317,231.261,231.34,231.497,231.703,231.964,232.241,232.533,232.85,233.22,233.57,233.901,234.209,234.471,234.699,234.911,235.125,235.628,235.773,235.885,236.042,236.208,236.305,236.573,236.477,236.585,236.581,236.619,236.691,236.872,237.166,237.63,238.073,238.572,239.125,239.679,240.261,240.792,241.227,241.542,241.811,242.041,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,232.615,232.84,233.135,233.347,233.52,233.608,233.6,233.536,233.426,233.291,233.118,232.9,232.716,232.564,232.425,232.257,232.083,231.715,231.648,231.702,231.784,231.916,232.076,232.265,232.51,232.818,233.158,233.496,233.814,234.128,234.388,234.627,234.894,235.343,235.671,235.892,236.138,236.413,236.666,236.953,237.194,237.243,237.162,237.239,237.322,237.442,237.647,237.883,238.23,238.61,239.016,239.511,239.962,240.451,240.847,241.203,241.542,241.851,242.096,242.307,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,232.937,233.199,233.372,233.568,233.788,233.917,233.971,233.978,233.946,233.837,233.647,233.426,233.236,233.075,232.867,232.668,232.485,232.193,231.964,231.934,231.964,232.005,232.084,232.249,232.478,232.747,233.046,233.362,233.663,233.932,234.201,234.5,234.92,235.41,235.749,236.128,236.241,235.007,235.154,236.196,237.538,237.877,238.076,237.983,238.01,238.105,238.183,238.327,238.558,238.849,239.157,239.545,239.921,240.279,240.643,241.007,241.344,241.644,241.897,242.134,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,233.378,233.513,233.634,233.814,234.041,234.255,234.39,234.438,234.405,234.257,234.082,233.923,233.813,233.648,233.381,233.128,232.855,232.51,232.194,232.091,232.042,232.036,232.099,232.218,232.391,232.62,232.887,233.15,233.419,233.695,234.004,234.366,235.029,235.472,235.944,235.167,234.519,234.402,235.226,235.976,237.672,238.639,238.726,238.466,238.428,238.359,238.382,238.43,238.541,238.747,238.975,239.238,239.575,239.938,240.302,240.625,240.941,241.212,241.494,241.794,242.002,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,233.836,233.971,234.046,234.116,234.296,234.554,234.768,234.79,234.738,234.691,234.699,234.714,234.595,234.296,233.933,233.527,233.189,232.7,232.328,232.163,232.09,232.051,232.067,232.131,232.264,232.446,232.668,232.929,233.197,233.505,233.862,234.469,235.093,235.178,234.243,234.024,233.912,234.284,235.169,236.517,238.875,239.015,238.893,238.592,238.397,238.208,238.152,238.161,238.223,238.356,238.547,238.793,239.124,239.45,239.782,240.073,240.367,240.697,241.005,241.259,241.415,241.418,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,234.312,234.415,234.523,234.548,234.528,234.784,235.038,235.164,235.354,235.56,235.701,235.661,235.37,234.88,234.327,233.822,233.381,232.776,232.399,232.211,232.092,232.013,231.981,232.02,232.123,232.298,232.525,232.778,233.055,233.396,233.83,234.673,234.625,233.635,233.227,234.081,234.998,235.49,236.578,238.827,239.068,239.022,238.85,238.598,238.316,237.99,237.852,237.649,237.793,237.864,238.041,238.317,238.689,238.887,239.162,239.474,239.812,240.12,240.375,240.524,240.57,240.546,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,234.803,234.894,234.927,234.979,234.772,235.197,235.553,235.955,236.35,236.633,236.651,236.389,235.844,235.173,234.53,233.964,233.464,232.756,232.439,232.224,232.075,231.971,231.926,231.971,232.082,232.249,232.471,232.724,233.024,233.428,234.257,234.373,233.367,232.868,234.282,236.696,237.591,238.172,238.728,238.847,238.815,238.619,238.317,237.971,237.663,237.451,237.184,237.231,237.331,237.526,237.733,238.002,238.265,238.588,238.889,239.217,239.498,239.741,239.877,239.938,239.922,239.734,239.589,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,235.299,235.331,235.339,235.251,235.446,235.847,236.383,236.942,237.335,237.43,237.179,236.65,235.93,235.181,234.525,233.964,233.501,232.933,232.479,232.255,232.097,231.996,231.966,232.021,232.131,232.313,232.542,232.818,233.173,233.858,234.51,234.989,235.418,236.394,237.062,237.584,237.978,238.245,238.186,238.064,238.056,237.782,237.451,237.132,236.874,236.568,236.568,236.661,236.816,237.044,237.268,237.523,237.82,238.106,238.383,238.659,238.856,238.983,239.069,239.077,239.025,238.968,238.937,238.978,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,235.773,235.765,235.711,235.674,236.13,236.635,237.196,237.653,237.84,237.63,237.139,236.46,235.711,235.014,234.416,233.936,233.488,233.083,232.841,232.384,232.217,232.139,232.131,232.187,232.327,232.526,232.769,233.047,233.434,234.215,234.801,235.409,235.985,236.525,237.015,237.377,237.246,236.434,235.64,235.607,235.564,235.096,235.423,236.195,236.112,236.057,236.155,236.297,236.486,236.699,236.922,237.152,237.433,237.679,237.9,238.088,238.201,238.288,238.326,238.31,238.264,238.257,238.281,238.345,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,236.216,236.139,236.029,236.372,236.786,237.244,237.628,237.79,237.709,237.362,236.848,236.215,235.537,234.923,234.366,233.922,233.542,233.255,233.009,232.75,232.455,232.4,232.416,232.502,232.644,232.825,233.04,233.324,233.779,234.485,235.001,235.497,235.98,236.404,236.723,236.644,235.709,234.87,234.506,234.43,233.854,233.77,234.529,235.683,235.624,235.835,235.946,236.144,236.273,236.469,236.752,236.969,237.175,237.365,237.552,237.625,237.719,237.773,237.766,237.743,237.749,237.728,237.853,238.138,238.51,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,236.598,236.531,236.444,236.853,237.164,237.408,237.551,237.545,237.403,237.1,236.675,236.152,235.506,234.866,234.374,233.975,233.64,233.405,233.271,233.029,232.797,232.77,232.801,232.866,232.984,233.142,233.34,233.625,233.99,234.681,235.047,235.34,235.804,236.111,236.278,235.872,235.135,234.603,234.455,234.457,234.476,234.362,235.268,235.262,235.401,235.548,235.715,235.858,236.079,236.312,236.561,236.825,237.073,237.202,237.318,237.378,237.448,237.396,237.388,237.37,237.333,237.557,237.815,238.161,238.476,238.733,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,236.943,236.855,236.803,237.047,237.196,237.292,237.401,237.454,237.345,237.132,236.719,236.083,235.441,234.873,234.41,234.041,233.8,233.681,233.593,233.525,233.224,233.158,233.167,233.221,233.318,233.467,233.672,233.926,234.217,234.516,234.817,235.102,235.331,235.549,235.791,235.751,235.64,235.54,235.445,235.342,235.417,235.262,235.608,235.69,235.947,236.127,236.282,236.489,236.721,236.9,237.07,237.198,237.238,237.272,237.414,237.401,237.134,237.205,237.042,237.001,237.34,237.643,237.861,238.085,238.404,238.611,238.804,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,237.203,237.062,237.082,237.087,237.035,237.299,237.51,237.575,237.472,237.134,236.626,236.002,235.363,234.834,234.505,234.334,234.119,234.032,233.927,233.891,233.564,233.536,233.539,233.592,233.673,233.821,233.987,234.162,234.368,234.595,234.795,234.991,235.125,235.186,235.433,235.421,235.377,235.335,235.322,235.385,235.276,235.339,235.57,235.65,235.83,236.086,236.425,236.653,236.921,237.07,237.395,237.52,237.542,237.521,237.482,237.416,237.354,237.349,237.295,237.241,237.383,237.641,237.896,238.054,238.278,238.475,238.611,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,237.315,237.103,237.043,237.095,237.361,237.591,237.748,237.726,237.464,237.03,236.5,235.885,235.334,235.007,234.8,234.656,234.471,234.336,234.286,234.12,233.956,233.933,233.933,233.965,234.026,234.083,234.17,234.297,234.462,234.629,234.793,234.929,235.039,235.079,235.07,235.063,235.051,235.106,235.22,235.402,235.623,235.86,236.091,236.336,236.587,236.817,237.038,237.228,237.376,237.464,237.521,237.509,237.403,237.371,237.367,237.232,237.423,237.572,237.645,237.705,237.457,237.623,237.866,238.033,238.178,238.278,238.307,238.334,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,237.354,237.18,237.112,237.369,237.615,237.811,237.875,237.724,237.355,236.918,236.421,235.97,235.584,235.292,235.058,234.9,234.768,234.69,234.641,234.56,234.375,234.343,234.31,234.247,234.186,234.177,234.231,234.342,234.502,234.674,234.839,234.976,235.069,235.102,235.119,235.172,235.261,235.425,235.623,235.852,236.104,236.358,236.619,236.896,237.164,237.409,237.6,237.764,237.868,237.933,237.916,237.844,237.734,237.63,237.574,237.526,237.474,237.372,237.705,237.906,237.92,237.849,237.993,238.015,237.975,237.993,238.011,237.994,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,237.348,237.213,237.332,237.583,237.866,237.972,237.914,237.676,237.309,236.975,236.614,236.27,235.899,235.591,235.341,235.206,235.145,235.079,235.139,234.841,234.771,234.651,234.485,234.328,234.208,234.163,234.217,234.353,234.547,234.752,234.943,235.085,235.18,235.23,235.314,235.434,235.608,235.821,236.058,236.319,236.581,236.863,237.141,237.417,237.677,237.89,238.057,238.185,238.271,238.293,238.224,238.128,238.026,237.963,237.923,237.914,237.901,237.873,237.694,238.14,238.139,238.14,238.103,238.016,237.848,237.769,237.661,237.685,237.702,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,237.395,237.341,237.606,237.875,238.05,238.113,237.993,237.788,237.566,237.316,236.96,236.549,236.169,235.847,235.634,235.602,235.424,235.563,235.337,235.204,235.021,234.777,234.518,234.305,234.176,234.146,234.248,234.43,234.659,234.896,235.087,235.244,235.355,235.457,235.601,235.783,235.995,236.233,236.485,236.754,237.016,237.291,237.561,237.836,238.057,238.231,238.381,238.477,238.516,238.476,238.388,238.295,238.247,238.209,238.209,238.224,238.216,238.191,238.102,238.106,238.312,238.223,238.187,237.987,237.901,237.747,237.489,237.512,237.503,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,237.421,237.581,237.946,238.209,238.365,238.39,238.31,238.175,237.994,237.677,237.221,236.763,236.399,236.127,236.014,235.844,235.969,235.909,235.615,235.401,235.103,234.801,234.501,234.274,234.17,234.203,234.375,234.612,234.865,235.103,235.315,235.475,235.615,235.773,235.955,236.16,236.388,236.627,236.873,237.118,237.372,237.639,237.899,238.114,238.295,238.437,238.539,238.594,238.563,238.493,238.436,238.405,238.397,238.406,238.444,238.436,238.373,238.295,238.225,238.191,238.396,238.287,238.298,238.028,237.922,237.715,237.698,237.638,237.372,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,237.884,238.166,238.454,238.723,238.865,238.879,238.775,238.619,238.349,237.898,237.386,236.922,236.566,236.371,236.248,236.316,236.346,235.994,235.783,235.489,235.134,234.786,234.494,234.328,234.321,234.454,234.667,234.914,235.172,235.417,235.624,235.797,235.956,236.136,236.32,236.524,236.747,236.96,237.174,237.409,237.647,237.891,238.096,238.248,238.381,238.477,238.532,238.531,238.476,238.429,238.413,238.421,238.437,238.469,238.452,238.375,238.311,238.246,238.214,238.237,238.368,238.213,238.169,238.03,237.921,237.822,237.577,237.476,237.29,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,238.392,238.776,239.117,239.338,239.393,239.315,239.18,238.95,238.493,237.939,237.433,237.031,236.726,236.588,236.618,236.738,236.333,236.16,235.883,235.521,235.165,234.859,234.675,234.643,234.731,234.897,235.103,235.339,235.576,235.798,236.002,236.162,236.327,236.493,236.681,236.872,237.053,237.22,237.41,237.616,237.837,238.003,238.136,238.24,238.333,238.382,238.396,238.357,238.311,238.294,238.317,238.341,238.342,238.326,238.27,238.207,238.16,238.136,238.097,238.375,238.303,238.233,238.154,238.028,238.005,237.705,237.57,237.488,237.426,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,239.037,239.438,239.71,239.836,239.787,239.639,239.4,238.982,238.428,237.892,237.466,237.156,236.965,236.922,236.95,236.615,236.484,236.247,235.947,235.631,235.37,235.197,235.15,235.206,235.323,235.467,235.64,235.828,236.005,236.209,236.389,236.533,236.683,236.848,237.008,237.15,237.29,237.433,237.606,237.773,237.893,237.993,238.073,238.145,238.192,238.201,238.161,238.107,238.097,238.114,238.13,238.129,238.099,238.065,238.027,238.003,238.011,238.003,238.146,238.31,238.263,238.219,238.167,237.965,237.97,237.716,237.598,237.445,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,239.661,240.008,240.16,240.12,239.947,239.717,239.324,238.823,238.294,237.823,237.504,237.23,237.212,237.178,236.995,236.761,236.588,236.38,236.146,235.956,235.844,235.805,235.823,235.884,235.973,236.083,236.177,236.273,236.438,236.611,236.761,236.887,237.024,237.165,237.275,237.379,237.49,237.615,237.726,237.798,237.853,237.908,237.956,237.988,237.994,237.939,237.884,237.86,237.884,237.885,237.884,237.867,237.838,237.836,237.844,237.877,237.917,237.979,238.307,238.254,238.223,238.13,238.223,238.08,237.875,237.578,237.417,237.354,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,240.137,240.342,240.327,240.145,239.882,239.552,239.078,238.603,238.184,237.767,237.562,237.431,237.43,237.105,236.974,236.872,236.769,236.658,236.562,236.509,236.5,236.515,236.531,236.564,236.588,236.595,236.604,236.682,236.825,236.976,237.094,237.22,237.337,237.426,237.506,237.585,237.671,237.725,237.757,237.767,237.789,237.813,237.828,237.798,237.735,237.678,237.655,237.677,237.664,237.648,237.645,237.648,237.677,237.717,237.782,237.869,237.964,238.209,238.395,238.405,238.391,238.354,238.363,238.059,237.813,237.574,237.656,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,240.395,240.42,240.23,239.945,239.648,239.298,238.888,238.449,238.162,237.891,237.67,237.486,237.274,237.108,237.078,237.07,237.079,237.094,237.124,237.149,237.165,237.164,237.14,237.092,236.999,236.935,236.935,237.03,237.18,237.306,237.416,237.513,237.601,237.671,237.726,237.773,237.788,237.774,237.765,237.749,237.734,237.718,237.656,237.592,237.544,237.537,237.545,237.522,237.513,237.513,237.538,237.599,237.678,237.774,237.9,238.043,238.185,238.588,238.628,238.604,238.629,238.531,238.199,238.14,237.725,237.703,237.936],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,240.366,240.207,239.916,239.678,239.417,239.087,238.818,238.546,238.208,237.915,237.671,237.419,237.189,237.205,237.277,237.393,237.527,237.63,237.71,237.733,237.694,237.614,237.636,237.521,237.38,237.161,237.212,237.354,237.503,237.607,237.71,237.796,237.852,237.892,237.908,237.893,237.861,237.828,237.782,237.749,237.695,237.623,237.553,237.528,237.528,237.537,237.52,237.506,237.522,237.576,237.662,237.765,237.893,238.058,238.239,238.408,238.84,238.913,238.917,238.905,238.75,238.654,238.347,238.079,238.062,238.198],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,240.105,239.837,239.618,239.466,239.337,239.171,238.896,238.566,238.193,237.839,237.629,237.253,237.292,237.411,237.584,237.796,237.978,238.095,238.12,238.064,238.247,238.398,238.492,238.231,237.783,237.35,237.48,237.647,237.803,237.901,237.987,238.049,238.067,238.081,238.059,238.025,237.964,237.908,237.829,237.765,237.695,237.64,237.616,237.639,237.663,237.664,237.664,237.695,237.766,237.868,237.995,238.168,238.358,238.557,238.89,239.182,239.26,239.282,239.209,239.019,238.93,238.733,238.311,238.394,238.485],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,239.773,239.656,239.632,239.607,239.466,239.267,238.942,238.492,238.051,237.782,237.407,237.372,237.496,237.678,237.914,238.128,238.262,238.295,238.246,238.69,239.271,239.603,239.255,238.423,237.667,237.576,237.757,237.94,238.074,238.175,238.231,238.262,238.271,238.256,238.216,238.154,238.075,237.994,237.931,237.869,237.836,237.828,237.861,237.916,237.955,237.98,238.034,238.105,238.216,238.375,238.571,238.786,239.005,239.481,239.617,239.678,239.669,239.626,239.468,239.229,239.017,238.718,238.692,238.773],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,239.671,239.727,239.811,239.747,239.564,239.204,238.752,238.31,237.97,237.79,237.464,237.551,237.709,237.93,238.137,238.272,238.326,238.278,238.927,239.731,240.256,239.871,238.856,237.946,237.679,237.853,238.041,238.2,238.319,238.398,238.438,238.461,238.453,238.421,238.365,238.288,238.222,238.162,238.138,238.123,238.138,238.192,238.279,238.351,238.414,238.486,238.58,238.706,238.88,239.087,239.315,239.676,240.003,240.119,240.14,240.15,239.999,239.976,239.661,239.357,239.125,239.225,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,239.851,239.953,239.915,239.733,239.418,239.005,238.585,238.185,237.958,237.676,237.623,237.733,237.899,238.074,238.216,238.255,238.193,238.745,239.446,239.911,239.602,238.745,237.844,237.813,237.995,238.169,238.326,238.446,238.533,238.595,238.626,238.628,238.619,238.58,238.533,238.492,238.469,238.47,238.493,238.532,238.603,238.705,238.824,238.928,239.03,239.141,239.29,239.474,239.693,239.904,240.398,240.556,240.634,240.634,240.558,240.394,240.331,240.04,239.835,239.531,239.457,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,240.05,240.035,239.883,239.591,239.22,238.801,238.357,238.216,238.108,237.757,237.782,237.87,237.995,238.107,238.147,238.092,238.14,238.7,238.959,238.778,238.226,237.808,237.971,238.169,238.35,238.499,238.625,238.706,238.769,238.8,238.823,238.832,238.824,238.808,238.8,238.808,238.846,238.895,238.965,239.052,239.17,239.313,239.463,239.604,239.739,239.906,240.096,240.303,240.803,241.01,241.092,241.146,241.124,241.023,240.948,240.739,240.51,240.257,239.89,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,240.104,239.954,239.678,239.301,238.908,238.695,238.509,238.41,238.17,237.924,237.939,237.979,238.05,238.081,238.043,237.971,237.904,237.935,237.881,237.869,237.994,238.192,238.396,238.578,238.73,238.863,238.951,239.015,239.061,239.084,239.094,239.11,239.125,239.148,239.173,239.234,239.307,239.409,239.52,239.654,239.804,239.978,240.16,240.335,240.564,241.006,241.195,241.4,241.526,241.605,241.652,241.663,241.43,241.401,241.245,240.96,240.697,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,240.004,239.768,239.491,239.236,238.976,238.865,238.739,238.616,238.402,238.114,238.081,238.074,238.075,238.059,238.02,237.979,237.964,238.003,238.098,238.256,238.453,238.657,238.834,238.999,239.14,239.235,239.307,239.354,239.379,239.41,239.441,239.467,239.511,239.568,239.715,239.838,239.913,239.966,240.144,240.414,240.565,240.774,241.156,241.378,241.556,241.787,241.89,241.976,242.095,242.064,242.087,241.932,241.83,241.661,241.427,241.226,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,240.105,239.867,239.582,239.331,239.228,239.11,238.976,238.842,238.667,238.31,238.232,238.185,238.176,238.17,238.184,238.21,238.289,238.414,238.587,238.771,238.959,239.141,239.3,239.443,239.552,239.63,239.679,239.718,239.803,240.057,240.145,240.176,240.207,240.013,240.137,240.154,240.365,240.898,241.002,241.185,241.403,241.591,241.776,242.008,242.103,242.308,242.406,242.457,242.545,242.471,242.417,242.267,242.131,241.838,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,240.396,240.072,239.788,239.585,239.462,239.339,239.221,239.087,238.802,238.532,238.446,238.413,238.423,238.468,238.533,238.644,238.779,238.951,239.126,239.307,239.488,239.647,239.789,239.891,239.971,240.035,240.371,240.421,240.451,240.015,239.675,239.459,239.118,239.169,239.276,239.258,240.179,241.416,241.62,241.81,242.07,242.227,242.375,242.58,242.684,242.901,242.876,242.92,242.834,242.851,242.698,242.501,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,240.682,240.281,239.979,239.743,239.709,239.629,239.481,239.323,239.065,238.815,238.747,238.754,238.823,238.904,239.03,239.173,239.331,239.505,239.679,239.86,240.018,240.146,240.248,240.449,240.696,240.757,240.849,239.941,239.287,239.005,238.906,238.884,238.96,239.016,238.99,239.786,241.684,242.073,242.229,242.439,242.699,242.788,242.942,243.027,243.214,243.265,243.318,243.23,243.171,243.135,242.885,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,240.42,240.089,240.101,240.01,239.893,239.766,239.62,239.481,239.22,239.126,239.173,239.282,239.409,239.552,239.724,239.885,240.072,240.239,240.389,240.524,240.872,240.978,241.07,241.119,241.116,240.067,239.465,239.023,238.841,238.983,239.329,239.586,240.25,241.125,242.262,242.485,242.699,242.907,243.159,243.137,243.338,243.455,243.502,243.561,243.636,243.697,243.525,243.456,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,240.484,240.475,240.413,240.327,240.193,240.081,239.966,239.855,239.811,239.826,239.775,239.777,239.937,240.098,240.279,240.452,240.646,240.934,241.17,241.244,241.37,241.401,241.512,241.169,240.219,239.638,239.149,238.738,239.264,240.109,240.713,241.568,242.58,242.837,242.91,243.113,243.281,243.463,243.588,243.685,243.795,243.909,243.999,244.025,244.02,243.946,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,240.881,240.78,240.738,240.635,240.504,240.382,240.269,240.24,240.21,240.308,240.465,240.567,240.766,240.934,241.094,241.25,241.376,241.5,241.504,241.553,241.774,241.885,241.686,240.688,239.834,239.446,239.613,240.632,241.567,242.352,243.091,243.113,243.337,243.415,243.532,243.731,243.884,243.985,244.133,244.229,244.274,244.31,244.355,244.351,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,241.182,241.125,241.032,240.919,240.795,240.74,240.63,240.613,240.628,240.666,240.902,241.075,241.23,241.433,241.541,240.929,240.479,240.028,240.137,240.738,242.3,242.494,241.654,241.09,240.855,241.348,242.413,243.051,243.202,243.413,243.592,243.722,243.933,243.984,244.175,244.274,244.393,244.544,244.553,244.66,244.694,244.628,244.57,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,241.505,241.41,241.299,241.211,241.115,241.038,241.036,241.01,241.065,241.214,241.325,241.47,241.762,241.766,240.735,239.974,239.453,239.747,240.954,242.562,242.718,242.95,242.82,242.861,243.184,243.355,243.512,243.677,243.825,243.959,244.081,244.243,244.395,244.561,244.721,244.819,244.922,244.965,244.969,244.959,244.973,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,241.837,241.699,241.581,241.481,241.394,241.371,241.37,241.385,241.463,241.629,241.737,241.619,240.513,240.217,239.791,239.558,240.344,241.363,242.865,243.079,243.183,243.293,243.419,243.575,243.724,243.934,244.036,244.223,244.377,244.597,244.71,244.858,244.996,245.136,245.171,245.272,245.277,245.263,245.206,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,242.11,241.94,241.813,241.726,241.733,241.695,241.673,241.734,241.842,242.011,241.79,240.565,240.096,240.364,240.843,241.733,243.036,243.158,243.385,243.486,243.635,243.772,243.889,244.049,244.201,244.415,244.636,244.775,244.953,245.131,245.299,245.457,245.486,245.555,245.549,245.556,245.526,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,242.181,242.026,242.057,242.025,242.018,242.022,242.118,242.241,242.376,241.448,241.029,241.123,241.754,243.062,243.271,243.41,243.57,243.712,243.865,244.1,244.198,244.313,244.546,244.746,244.949,245.124,245.266,245.582,245.648,245.744,245.81,245.882,245.806,245.791,245.771,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,242.328,242.325,242.308,242.319,242.349,242.392,242.504,242.681,242.774,242.733,242.738,243.254,243.429,243.552,243.671,243.835,243.91,244.105,244.274,244.468,244.628,244.84,245.011,245.229,245.405,245.636,245.788,245.927,246.082,246.11,246.127,246.059,246.034,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,242.509,242.624,242.665,242.729,242.834,242.982,243.122,243.321,243.494,243.619,243.739,243.843,243.96,244.113,244.215,244.453,244.441,244.656,244.841,245.071,245.375,245.592,245.737,245.961,246.09,246.215,246.361,246.403,246.3,246.274,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,242.809,242.944,243.053,243.205,243.378,243.551,243.725,243.903,244.024,244.149,244.284,244.354,244.497,244.55,244.649,244.631,244.816,245.174,245.421,245.533,245.887,246.025,246.255,246.406,246.471,246.555,246.498,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,243.357,243.575,243.773,243.97,244.152,244.316,244.441,244.547,244.695,244.824,244.953,245.098,245.009,244.797,245.002,245.276,245.577,245.842,246.138,246.337,246.513,246.642,246.693,246.746,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,244.144,244.373,244.57,244.721,244.84,244.975,245.154,245.29,245.425,245.427,245.411,245.312,245.302,245.558,245.876,246.153,246.355,246.558,246.791,246.835,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,245.093,245.218,245.369,245.549,245.687,245.791,245.843,245.82,245.626,245.604,245.795,246.067,246.402,246.524,246.728,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,246.141,246.079,245.934,245.917,246.075,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
  ]
};

// prettier-ignore
const HeightMap_Hole_3 = {
  minX:108, maxX:336, minZ:24, maxZ:248, step:4,
  h:[
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,225.499,225.609,225.64,225.601,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,225.428,225.607,225.704,225.734,225.735,225.577],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,225.443,225.561,225.696,225.744,225.774,225.791,225.665],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,225.467,225.52,225.632,225.734,225.773,225.791,225.776,225.633],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,225.333,225.405,225.49,225.569,225.696,225.76,225.758,225.648,225.388],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,225.789,225.505,225.223,225.324,225.402,225.389,225.491,225.599,225.553,225.354,225.165],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,225.781,225.505,225.362,225.157,225.245,225.3,225.261,225.204,225.175,225.113,225.08,225.132],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,225.721,225.522,225.356,225.12,225.095,225.167,225.191,225.15,225.094,225.032,224.979,225.258,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,225.601,225.489,225.302,225.223,224.961,225.024,225.086,225.094,225.054,224.999,224.94,225.212,225.293,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,225.569,225.339,225.173,225.049,224.975,224.858,224.937,224.994,225.008,224.977,224.922,225.173,225.307,225.246,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,225.468,225.326,225.244,225.096,224.924,224.874,224.653,224.77,224.867,224.944,224.968,224.938,224.954,225.236,225.282,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,225.323,225.198,225.118,225.016,224.852,224.755,224.561,224.591,224.733,224.857,224.944,224.969,224.929,225.119,225.287,225.158,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,224.982,225.063,225.024,224.921,224.764,224.638,224.457,224.454,224.59,224.754,224.883,224.984,225,224.914,225.156,225.222,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,224.652,224.888,224.864,224.779,224.644,224.477,224.243,224.29,224.415,224.581,224.749,224.889,224.999,224.975,224.98,225.158,225.094,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,224.185,224.614,224.73,224.495,224.268,224.172,224.116,224.123,224.201,224.335,224.501,224.659,224.794,224.88,225.068,225.132,225.157,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,225.073,224.12,224.296,224.532,224.266,224.185,224.084,224.004,223.957,223.974,224.052,224.172,224.329,224.48,224.605,224.849,225.025,225.119,225.097,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,223.609,223.93,224.115,224.224,224.039,224.004,223.918,223.838,223.783,223.758,223.774,223.838,223.949,224.098,224.249,224.428,224.762,224.867,225.03,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,222.087,222.967,223.795,223.903,224,223.719,223.665,223.594,223.544,223.505,223.49,223.5,223.554,223.657,223.808,223.996,224.476,224.629,224.756,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,222.036,222.046,223.047,223.62,223.703,223.649,223.396,223.339,223.279,223.231,223.205,223.198,223.205,223.238,223.332,223.513,223.754,224.349,224.589,224.598,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,222.297,222.056,222.061,223.153,223.568,223.554,223.273,223.158,223.112,223.05,223.451,223.794,223.438,222.967,222.945,223.031,223.238,223.59,224.224,224.468,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,222.606,223.208,222.837,222.8,222.776,223.408,223.688,223.522,223.122,223.062,223.024,223.493,223.286,222.506,222.557,223.18,223.034,222.89,223.28,223.568,223.876,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,223.017,224.229,224.408,223.701,223.736,223.451,224.04,223.736,223.527,223.126,223.081,223.072,223.895,222.964,222.177,221.956,221.981,223.333,223.546,223.389,223.374,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,223.167,224.177,225.796,225.136,224.568,223.978,223.988,223.886,223.697,223.305,223.189,223.189,223.212,223.997,224.68,223.977,223.858,223.146,223.802,223.932,223.744,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,223.436,223.633,224.365,225.01,224.899,224.518,223.751,223.869,223.742,223.431,223.334,223.294,223.324,223.379,223.877,224.818,225.054,225,224.8,224.652,225.263,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,223.878,224.068,224.344,224.59,224.636,224.489,224.206,223.965,223.78,223.47,223.467,223.468,223.459,223.484,223.547,223.941,224.746,224.912,224.92,227.472,224.706,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,224.977,224.573,224.534,224.66,224.785,224.818,224.746,224.411,224.153,223.769,223.592,223.57,223.602,223.655,223.695,223.727,223.915,223.933,224.5,224.591,224.57,224.588,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,225.437,225.104,224.872,224.818,224.835,224.856,224.8,224.542,224.157,223.927,223.789,223.728,223.729,223.783,223.863,223.925,224.15,224.164,224.242,224.558,224.604,224.575,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,225.847,225.497,225.135,224.891,224.795,224.721,224.465,224.438,224.351,224.201,224.052,223.949,223.925,223.95,224.014,224.103,224.422,224.487,224.593,224.926,225.15,224.91,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,228.559,225.775,225.429,225.135,224.865,224.698,224.431,224.422,224.415,224.382,224.305,224.218,224.194,224.218,224.265,224.355,224.684,224.753,224.921,225.094,225.168,225.145,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,226.277,225.916,225.634,225.246,225.038,224.785,224.441,224.423,224.415,224.415,224.408,224.398,224.406,224.463,224.541,224.598,224.942,225.032,225.08,225.188,225.189,224.956,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,226.782,226.439,226.059,226.65,225.378,225.12,224.934,224.495,224.432,224.423,224.423,224.423,224.423,224.448,224.542,224.675,224.796,225.068,225.136,225.109,225.04,225.049,224.559,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,226.882,226.623,226.264,225.941,225.632,225.341,225.078,224.623,224.485,224.431,224.423,224.423,224.423,224.425,224.494,224.652,224.835,225.027,225.237,225.078,224.789,224.375,224.043,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,227.045,226.841,226.519,226.187,225.902,225.648,225.323,224.867,224.645,224.501,224.432,224.423,224.423,224.423,224.44,224.558,224.779,225.064,225.261,225.094,224.739,224.067,223.807,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,227.009,226.827,226.669,226.44,226.175,225.807,225.453,225.214,224.962,224.739,224.556,224.454,224.423,224.423,224.432,224.52,224.757,225.233,225.244,224.981,224.667,223.8,223.829,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,227.11,226.927,226.695,226.275,226.083,225.925,225.751,225.56,225.349,225.128,224.907,224.69,224.518,224.446,224.456,224.679,225.154,225.482,225.354,224.817,224.13,224.044,224.089,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,227.436,227.3,227.133,226.671,226.392,226.209,226.06,225.94,225.814,225.679,225.529,225.37,225.189,225.006,225.007,224.959,225.081,225.552,225.817,225.437,224.594,223.948,223.521,223.331,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,227.546,227.451,227.345,226.883,226.646,226.423,226.256,226.123,226.011,225.908,225.814,225.727,225.668,225.881,225.773,225.671,225.718,226.127,226.156,225.45,224.471,223.835,223.728,223.354,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,227.428,227.389,227.418,227.066,226.896,226.684,226.503,226.376,226.259,226.145,226.029,225.941,225.935,226.218,228.287,229.268,226.122,226.194,226.043,225.263,224.212,223.788,223.685,223.448,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,227.247,226.892,227.188,227.147,227.055,226.889,226.717,226.59,226.503,226.414,226.305,226.193,226.093,226.335,226.362,226.47,226.424,226.327,225.947,225.148,224.34,223.721,223.416,223.166,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,228.006,226.841,226.615,227.108,227.157,227.047,226.875,226.748,226.676,226.622,226.565,226.486,226.383,226.554,226.455,226.439,226.556,226.54,226.104,225.228,224.278,224.091,223.806,223.3,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,230.652,227.557,226.756,226.741,227.08,227.188,227.023,226.859,226.787,226.764,226.755,226.725,226.677,226.877,226.74,226.571,226.405,226.286,225.924,225.151,224.505,223.791,223.245,223.364,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,232.053,229.853,227.477,226.874,227.017,227.321,227.19,226.977,226.866,226.851,226.874,226.897,226.899,227.147,227.048,226.857,226.604,226.226,225.634,224.883,224.521,224.155,223.663,223.416,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,231.329,228.982,227.743,227.167,227.372,227.599,227.135,226.929,226.897,226.944,227.009,227.056,227.351,227.299,227.149,226.849,226.322,225.734,225.006,224.418,223.947,223.696,223.454,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,231.352,229.949,228.599,227.862,227.573,227.718,227.726,227.434,226.937,226.976,227.078,227.174,227.479,227.498,227.38,227.149,226.715,225.973,225.131,224.499,224.172,223.731,223.483,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,231.094,229.779,228.791,228.311,227.908,227.815,227.868,227.798,227.763,227.371,227.13,227.329,227.639,227.689,227.599,227.387,226.978,226.388,225.443,224.584,224.173,223.839,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,231.072,229.569,228.61,228.004,227.681,227.658,227.775,227.821,227.813,227.735,227.616,227.649,227.799,227.892,227.828,227.622,227.26,226.705,225.968,224.837,224.361,223.663,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,230.2,229.014,227.535,227.477,227.571,227.552,227.594,227.633,227.672,227.758,227.807,227.901,227.988,228.004,227.822,227.482,226.993,226.322,225.086,224.26,223.712,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,230.072,228.071,227.255,227.638,227.507,227.538,227.545,227.552,227.577,227.704,227.926,228.045,228.06,227.957,227.671,227.22,226.651,225.374,224.387,223.712,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [231.558,229.968,227.819,227.857,227.539,227.537,227.537,227.537,227.538,227.561,227.695,228.013,228.249,228.225,227.916,227.466,226.898,225.94,224.735,224.041,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,230.559,228.524,228.051,227.776,227.618,227.555,227.537,227.537,227.546,227.671,228.099,228.43,228.24,227.735,227.127,226.564,225.382,224.339,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,230.891,229.755,228.891,228.156,227.776,227.594,227.545,227.537,227.538,227.609,228.1,228.444,228.019,227.403,226.723,225.241,224.732,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,231.617,230.395,229.549,229.067,228.272,227.795,227.569,227.537,227.538,227.568,228.043,228.262,227.615,226.936,226.094,224.628,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,232.89,231.374,230.313,228.961,227.953,227.664,227.792,227.547,227.569,227.691,228.254,228.005,227.107,226.171,225.255,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,232.443,230.977,229.805,227.96,227.051,226.912,227.951,228.594,228.593,228.274,227.669,226.551,225.609,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,235.41,233.447,230.705,229.098,228.123,227.766,228.142,229.215,228.645,227.966,227.073,225.949,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,232.314,231.189,230.509,229.871,229.488,229.321,228.81,227.941,227.476,226.311,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,231.569,230.677,229.919,229.339,228.818,228.073,227.044,226.191,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,229.015,228.201,227.397,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
  ]
}

// prettier-ignore
const HeightMap_Hole_4 = {
  minX:-60,
  maxX:348,
  minZ:236,
  maxZ:596,
  step:4,
  h:[
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,218.203,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,218.227,218.314,218.392,218.455,218.523,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,218.045,218.234,218.456,218.589,218.621,218.644,218.542,218.965],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,218.131,218.467,218.699,218.622,218.788,218.727,218.732,219.105],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,218.210,218.699,218.778,218.669,218.866,218.821,218.859,219.357],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,218.299,218.785,218.809,218.542,218.598,218.718,218.945,219.503],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,218.430,218.819,218.648,218.551,218.614,218.757,218.985,219.628],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,218.488,218.676,218.827,218.538,218.567,218.928,218.946,219.138,219.768],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,218.566,218.792,218.798,218.519,218.713,218.967,219.138,219.397,219.930],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,218.623,218.757,218.617,218.488,218.784,218.986,219.144,219.457,220.056],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,218.685,218.700,218.407,218.448,218.831,218.986,219.057,219.477,220.215],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,218.708,218.712,218.613,218.322,218.381,218.796,218.985,219.022,219.555,220.376],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,218.694,218.625,218.451,218.220,218.298,218.738,218.967,219.106,219.663,220.542],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,218.695,218.559,218.194,218.132,218.218,218.409,218.708,219.197,219.828,220.700],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,218.773,218.557,218.132,218.053,218.155,218.400,218.780,219.343,220.076,220.851],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,218.788,218.733,218.672,218.388,218.037,218.148,218.449,218.931,219.650,220.381,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,218.811,218.798,218.706,218.515,218.371,218.282,218.639,219.191,220.087,220.710,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,218.863,219.009,218.893,219.093,218.860,218.877,219.328,220.054,220.636,221.057,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,219.104,219.007,219.374,220.029,220.107,219.565,219.618,220.308,221.024,221.362,221.365,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,219.199,219.361,219.870,220.551,220.513,220.305,220.899,221.717,221.978,221.841,221.578,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,219.475,219.252,219.483,219.996,220.462,220.503,220.630,221.615,222.349,222.340,221.862,221.616,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,219.561,219.359,219.473,219.829,220.067,220.069,220.324,221.311,222.205,222.187,221.770,221.680,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,219.855,219.558,219.468,219.423,219.560,219.725,219.728,219.953,220.770,221.998,222.279,221.949,221.705,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,220.131,219.947,219.744,219.570,219.452,219.398,219.453,219.603,219.857,220.545,221.569,222.309,222.080,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,220.185,219.942,219.673,219.440,219.518,219.622,219.785,219.773,219.928,220.393,221.184,221.939,221.869,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,220.432,220.159,219.592,219.782,219.830,219.811,219.879,220.053,220.173,220.352,220.457,220.877,221.443,221.755,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,220.709,220.340,220.046,219.841,219.934,219.902,219.957,220.107,220.233,220.422,220.520,220.744,221.025,221.312,221.796,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,220.581,220.382,220.128,220.231,220.201,220.121,220.060,220.122,220.234,220.415,220.596,220.810,221.245,221.475,221.854,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,220.804,220.501,220.490,220.470,220.448,220.367,220.151,219.942,219.940,219.807,220.072,220.507,220.835,221.231,221.677,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,220.710,220.965,220.977,220.631,220.581,220.352,220.029,219.667,219.675,219.785,219.990,220.277,220.945,221.403,221.973,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,220.875,221.548,222.202,221.440,220.645,220.455,220.169,219.808,219.815,219.872,220.066,220.328,220.643,220.987,221.681,222.214,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,221.018,221.311,222.505,222.761,221.170,220.451,220.290,219.991,219.965,219.934,219.989,220.281,220.598,220.936,221.285,221.982,222.402,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,221.449,222.154,223.027,222.641,220.953,220.454,220.374,220.077,220.068,220.045,220.149,220.485,220.780,221.127,221.507,222.255,222.637,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,222.130,222.109,222.604,223.016,222.500,221.145,220.580,220.428,220.147,220.148,220.218,220.368,220.669,220.977,221.326,221.775,222.642,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,222.652,222.786,222.842,222.889,222.716,222.273,221.224,220.678,220.500,220.266,220.337,220.456,220.638,220.906,221.215,221.585,222.271,222.867,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,223.092,223.301,223.520,223.410,222.881,222.344,221.421,220.813,220.536,220.432,220.551,220.715,220.929,221.198,221.514,221.874,222.569,223.072,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,223.419,223.294,223.553,223.891,223.810,223.212,222.580,221.600,220.948,220.573,220.637,220.787,220.985,221.215,221.499,221.838,222.354,222.952,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,223.789,223.397,223.147,223.553,223.915,223.820,223.256,222.603,221.649,221.059,220.766,220.867,221.048,221.270,221.523,221.815,222.155,222.825,223.218,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,223.646,223.465,223.013,222.994,223.404,223.663,223.582,223.152,222.479,221.618,221.124,221.117,221.104,221.317,221.562,221.831,222.131,222.584,223.135,223.318,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,223.014,223.105,222.857,222.749,222.994,223.391,223.470,223.328,222.862,222.320,221.592,221.230,221.333,221.349,221.586,221.854,222.123,222.423,223.053,223.424,223.443,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,222.515,222.551,222.505,222.337,222.667,223.164,223.385,223.332,223.096,222.768,222.157,221.563,221.497,221.547,221.585,221.830,222.099,222.376,222.751,223.301,223.541,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,221.927,222.098,222.181,222.191,222.225,222.133,222.426,222.958,223.217,223.024,222.999,222.662,222.204,221.736,221.725,221.752,221.784,222.028,222.289,222.566,223.076,223.474,223.467,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,221.941,221.987,222.088,222.097,222.067,222.075,221.885,222.326,222.843,222.821,222.817,223.131,222.959,222.448,221.951,221.937,221.785,221.949,222.171,222.424,222.697,223.269,223.586,223.502,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,222.067,222.043,221.973,221.926,221.957,222.028,222.083,222.077,222.360,222.658,222.892,222.870,223.055,222.920,222.595,222.170,222.099,221.917,222.075,222.282,222.519,222.929,223.356,223.661,223.601,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,221.798,221.728,221.617,221.586,221.570,221.569,221.679,221.856,222.089,222.279,222.575,222.861,222.967,222.996,222.804,222.704,222.360,222.212,222.013,222.163,222.361,222.597,223.150,223.443,223.716,223.696,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,221.522,221.516,221.405,221.292,221.342,221.403,221.410,221.497,221.646,221.838,222.098,222.394,222.639,222.953,222.963,222.676,222.714,222.401,222.230,222.091,222.234,222.431,222.668,223.199,223.538,223.778,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,221.459,221.261,221.190,221.015,220.811,220.820,220.931,221.111,221.389,221.608,221.573,221.840,222.174,222.391,222.760,223.112,222.663,222.524,222.424,222.069,222.162,222.305,222.495,222.740,223.151,223.649,223.852,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,221.595,221.285,220.977,220.731,220.611,220.302,223.520,223.520,223.520,223.520,221.504,221.529,221.877,222.201,222.213,222.704,222.982,222.629,222.424,222.446,222.116,222.218,222.361,222.558,222.818,223.141,223.429,223.957,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,221.688,221.442,221.070,220.596,220.302,220.268,220.268,220.268,220.268,220.268,220.268,221.348,221.616,221.966,222.233,222.176,222.573,222.872,222.633,222.472,222.359,222.155,222.272,222.424,222.629,222.897,223.372,223.870,224.091,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,221.616,221.285,220.841,220.351,220.302,220.261,220.261,220.261,220.261,220.261,220.302,220.302,221.261,221.601,222.005,222.178,222.003,222.381,222.595,222.561,222.402,222.126,222.202,222.336,222.496,222.709,222.977,223.340,223.901,224.238,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,221.550,221.513,220.842,220.302,220.261,220.302,220.302,220.302,220.416,220.282,220.302,220.302,220.442,221.304,221.674,222.067,222.113,222.106,222.428,222.502,222.596,222.423,222.170,222.273,222.415,222.589,222.803,223.072,223.376,223.948,224.390,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,221.355,221.097,221.075,220.302,220.261,220.287,220.302,220.302,220.302,220.302,220.381,220.470,220.882,221.240,221.539,221.918,222.173,222.092,222.492,222.930,222.955,222.684,222.464,222.248,222.360,222.511,222.700,222.914,223.174,223.490,223.996,224.505,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,221.390,220.867,220.353,220.302,220.261,220.287,220.287,220.287,220.261,220.261,220.261,220.261,220.261,221.246,221.531,221.807,222.114,222.220,222.464,223.058,223.488,223.463,222.907,222.591,222.342,222.472,222.638,222.835,223.056,223.301,223.714,224.090,224.578,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,221.388,220.794,220.302,220.260,220.260,220.260,220.260,220.287,220.287,220.568,220.256,220.256,220.256,221.118,221.491,221.742,221.995,222.185,222.326,222.972,223.630,223.727,223.498,222.930,222.653,222.471,222.621,222.795,222.993,223.221,223.474,224.021,224.249,224.622,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,221.512,220.821,220.302,220.261,220.261,220.261,220.261,220.261,220.261,220.261,220.467,220.302,220.424,220.976,221.340,221.617,221.864,222.097,222.066,222.533,223.596,224.224,223.997,223.155,222.805,222.763,222.636,222.787,222.969,223.176,223.411,223.672,224.233,224.454,224.702,225.126,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,221.616,221.079,220.407,220.302,220.261,220.287,220.302,220.302,220.302,220.302,220.302,220.302,220.302,220.302,221.301,221.469,221.737,221.991,222.097,222.034,222.832,224.091,224.584,224.041,223.075,222.891,222.739,222.826,222.984,223.167,223.380,223.617,223.924,224.454,224.676,224.854,225.293,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,221.466,221.182,220.723,220.302,220.261,220.302,220.302,220.302,220.302,220.302,220.302,220.302,220.302,220.302,220.968,221.333,221.692,222.077,222.217,222.012,222.399,223.108,223.979,224.268,223.721,223.122,223.084,222.906,223.040,223.199,223.388,223.593,223.822,224.300,224.651,224.874,225.031,225.466,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,221.334,221.160,221.016,220.772,220.352,220.302,220.261,220.302,220.302,220.302,220.302,220.302,220.302,220.302,220.302,220.302,221.262,221.644,222.179,222.629,222.606,222.444,223.157,223.735,223.968,223.682,223.343,223.223,223.094,223.135,223.276,223.436,223.617,223.815,224.029,224.421,224.819,225.032,225.185,225.633,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,221.467,221.080,220.883,220.715,220.511,220.311,220.282,220.302,220.302,220.302,220.302,220.302,220.361,220.315,220.302,220.302,220.302,221.254,221.530,221.989,222.503,222.992,223.190,223.081,223.507,223.965,223.927,223.461,223.310,223.389,223.254,223.380,223.516,223.674,223.854,224.044,224.241,224.455,224.975,225.181,225.325,225.807,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,221.152,220.882,220.661,220.368,220.302,220.295,220.302,220.302,220.302,220.302,220.302,220.302,220.302,220.272,220.302,220.302,220.302,221.253,221.468,221.759,222.012,222.367,223.003,223.391,223.406,223.345,223.613,223.609,223.443,223.537,223.379,223.499,223.626,223.775,223.926,224.099,224.273,224.454,224.637,224.999,225.333,225.483,225.979,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,221.528,221.310,220.906,220.631,220.408,220.302,220.255,220.255,220.255,220.417,220.302,220.302,220.302,220.302,220.484,220.302,220.255,220.447,220.771,221.208,221.458,221.697,221.798,221.809,222.124,222.617,222.968,223.291,223.387,223.284,223.506,223.626,223.553,223.616,223.751,223.885,224.020,224.171,224.336,224.495,224.661,224.833,225.312,225.521,225.686,226.160,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,221.530,221.499,221.215,220.946,220.764,220.527,220.302,220.268,220.365,220.665,220.328,220.542,220.573,220.447,220.417,220.701,220.739,220.400,220.302,220.283,220.283,221.102,221.444,221.736,221.942,221.825,221.898,222.369,222.516,222.905,223.366,223.563,223.560,223.673,223.668,223.711,223.855,223.996,224.130,224.266,224.415,224.565,224.716,224.866,225.033,225.522,225.728,225.925,226.349,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,222.400,222.178,222.150,null,null,null,221.688,221.402,221.135,220.986,220.939,220.961,220.963,221.133,221.236,220.978,220.654,220.439,220.302,220.289,220.386,220.450,220.574,220.802,220.944,220.930,220.780,220.684,220.764,220.582,220.312,220.311,220.549,221.010,221.387,221.673,221.988,222.103,222.089,222.342,222.563,222.840,223.156,223.581,223.671,223.742,223.803,223.767,223.941,224.091,224.233,224.367,224.503,224.644,224.786,224.928,225.072,225.230,225.721,225.949,226.162,226.539,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,223.027,223.443,223.338,222.726,222.237,222.103,222.127,221.732,221.136,220.953,220.724,220.597,220.550,220.542,220.581,220.709,220.780,220.590,220.362,220.302,220.453,220.302,220.537,220.716,220.984,221.103,221.127,221.072,220.951,220.802,220.668,220.431,220.322,220.465,220.994,221.536,221.681,221.908,222.027,222.108,222.381,222.673,223.004,223.396,223.712,223.823,223.704,223.802,223.791,223.981,224.154,224.313,224.456,224.589,224.724,224.857,224.993,225.127,225.269,225.435,225.932,226.178,226.398,226.741,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,222.264,222.536,223.206,223.802,223.949,223.269,222.547,222.047,221.962,221.208,221.048,220.825,220.391,220.302,220.261,220.302,220.302,220.302,220.302,220.302,220.302,220.367,220.302,220.302,220.302,220.589,221.103,221.150,221.103,221.024,220.905,220.717,220.471,220.323,220.448,220.780,221.278,221.712,221.838,221.903,221.970,222.340,222.610,222.887,223.827,224.613,224.591,224.156,223.997,223.717,224.011,224.195,224.369,224.533,224.675,224.803,224.930,225.063,225.197,225.333,225.482,225.648,226.020,226.406,226.628,226.966,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,222.624,222.303,222.448,222.375,222.263,222.145,222.420,222.817,223.446,224.048,224.025,223.435,222.554,222.122,221.727,221.027,221.023,220.581,220.302,220.261,220.302,220.287,220.302,220.302,220.302,220.302,220.302,220.380,220.383,220.385,220.605,220.842,220.954,220.978,220.914,220.811,220.676,220.525,220.427,220.567,220.826,221.332,221.633,221.744,221.872,221.934,222.258,222.575,222.735,223.478,224.721,225.349,224.908,224.304,224.193,224.029,224.226,224.408,224.582,224.740,224.882,225.008,225.135,225.268,225.403,225.540,225.696,225.878,226.395,226.644,226.853,227.196,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,222.765,222.860,222.740,222.885,223.359,223.098,222.624,222.468,222.348,222.582,223.259,223.869,224.171,223.954,223.507,222.516,222.135,221.418,221.189,221.118,220.393,220.302,220.261,220.287,220.301,220.287,220.302,220.302,220.302,220.302,220.302,220.410,220.302,220.361,220.544,220.628,220.629,220.590,220.511,220.433,220.441,220.677,221.080,221.230,221.491,221.792,221.972,222.015,222.455,222.842,222.735,223.034,224.022,225.100,225.181,224.484,224.116,224.301,224.243,224.440,224.628,224.795,224.952,225.088,225.214,225.340,225.474,225.610,225.766,225.925,226.205,226.659,226.911,227.152,227.426,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,222.839,223.125,223.409,223.489,222.915,222.707,222.288,222.323,222.349,222.458,223.175,223.607,223.784,223.745,223.602,223.072,222.312,222.007,221.171,221.356,221.307,220.448,220.302,220.258,220.285,220.302,220.302,220.301,220.302,220.302,220.302,220.325,220.389,220.258,220.302,220.302,220.314,220.302,220.302,220.302,220.302,220.645,221.072,221.387,221.452,221.656,221.979,222.088,222.408,222.989,223.025,222.993,220.336,224.280,224.871,224.643,224.006,224.342,224.257,224.461,224.653,224.841,225.008,225.159,225.293,225.419,225.546,225.680,225.823,225.981,226.168,226.691,226.937,227.146,227.363,227.656,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,223.153,222.978,223.039,223.403,223.292,222.914,222.628,222.345,222.249,222.228,222.229,222.638,223.068,223.202,223.228,223.160,223.008,222.710,222.207,222.200,221.578,221.252,221.363,220.685,220.302,220.258,220.285,220.302,220.302,220.302,220.302,220.302,220.302,220.302,220.258,220.343,220.343,220.408,220.302,220.265,220.302,220.582,220.764,221.150,221.317,221.435,221.521,221.696,221.982,222.397,222.953,223.130,223.229,223.861,224.258,224.372,224.400,224.290,224.218,224.258,224.469,224.675,224.867,225.048,225.220,225.364,225.497,225.616,225.744,225.893,226.043,226.218,226.723,226.984,227.239,227.451,227.671,227.862,null,null,null,null,null,null],
    [null,null,null,null,null,null,223.102,223.040,222.633,222.481,222.684,222.477,222.030,222.084,221.963,222.247,222.146,222.214,222.440,222.640,222.796,222.941,223.081,223.007,222.795,222.360,222.134,222.013,221.490,221.270,220.968,220.300,220.258,220.285,220.301,220.285,220.302,220.285,220.302,220.302,220.302,220.302,220.302,220.409,220.329,220.302,220.300,220.425,221.000,221.401,221.427,221.469,221.705,221.738,221.823,222.250,222.764,222.980,223.193,224.118,224.859,224.948,224.527,224.296,224.101,224.243,224.463,224.676,224.875,225.071,225.253,225.418,225.561,225.681,225.814,225.949,226.099,226.313,226.774,227.040,227.323,227.604,227.772,227.846,null,null,null,null,null,null,null],
    [null,null,null,null,223.064,222.881,222.630,222.435,222.194,221.923,221.871,221.527,221.318,221.507,221.790,221.854,221.912,222.032,222.239,222.705,223.124,223.181,222.624,223.292,223.091,222.555,222.065,222.094,222.038,221.562,221.230,220.705,220.298,220.258,220.302,220.302,220.302,220.302,220.302,220.302,220.302,220.302,220.302,220.302,220.302,220.302,220.737,221.140,221.299,221.537,221.643,221.941,222.242,222.244,222.541,223.088,223.447,223.347,223.890,224.860,225.211,224.832,224.479,224.087,224.233,224.446,224.661,224.874,225.078,225.269,225.443,225.601,225.743,225.878,226.031,226.387,226.626,226.804,227.070,227.371,227.669,227.986,227.800,null,null,null,null,null,null,null,null],
    [null,null,null,223.197,222.961,222.381,221.879,221.500,221.260,221.535,221.461,221.072,221.080,221.285,221.728,221.949,222.053,222.209,222.418,222.858,223.355,222.396,222.362,222.837,223.404,222.698,222.298,221.992,222.102,221.979,221.491,221.072,220.550,220.299,220.258,220.302,220.302,220.358,220.349,220.548,220.665,220.329,220.298,220.302,220.302,220.519,221.041,221.371,221.608,221.863,222.100,222.403,222.499,222.891,223.166,223.791,224.396,224.489,224.654,224.880,224.614,224.291,224.221,224.217,224.430,224.644,224.858,225.064,225.269,225.458,225.625,225.790,225.980,226.373,226.550,226.708,226.874,227.080,227.372,227.726,228.063,227.783,227.941,null,null,null,null,null,null,null,null],
    [null,null,222.973,222.783,222.515,222.013,220.885,220.168,220.347,221.076,221.081,220.874,220.938,221.119,221.507,221.923,222.145,222.376,222.678,223.162,223.698,222.830,222.670,223.616,223.843,223.070,222.566,222.236,222.061,222.101,221.752,221.372,221.042,220.661,220.302,220.302,220.314,220.320,220.301,220.345,220.416,220.300,220.302,220.391,220.677,220.939,221.315,221.507,221.862,222.217,222.285,222.250,222.711,223.330,223.647,223.947,224.564,224.829,224.599,224.554,224.240,224.281,224.158,224.407,224.621,224.833,225.047,225.253,225.449,225.633,225.814,226.060,226.447,226.645,226.842,227.014,227.167,227.381,227.695,228.146,227.863,227.862,null,null,null,null,null,null,null,null,null],
    [null,222.826,222.660,222.246,222.321,221.623,220.263,220.178,220.753,221.242,220.946,220.812,220.882,221.032,221.254,221.601,221.997,222.430,222.819,223.278,224.039,223.426,223.008,223.884,224.148,223.462,222.901,222.427,222.175,222.109,222.004,221.696,221.476,221.221,220.913,220.621,220.449,220.302,220.302,220.302,220.302,220.360,220.567,220.857,221.001,221.127,221.437,221.689,221.971,222.227,221.818,222.401,223.040,223.697,224.004,223.676,223.973,224.375,224.219,224.082,224.275,224.032,224.376,224.590,224.803,225.017,225.229,225.429,225.625,225.822,226.014,226.495,226.717,226.960,227.180,227.340,227.499,227.713,228.036,227.952,227.775,null,null,null,null,null,null,null,null,null,null],
    [null,222.300,222.061,222.197,222.123,221.495,220.583,220.757,221.209,221.049,220.891,220.868,220.883,220.980,221.144,221.374,221.714,222.194,222.700,223.080,223.806,223.155,222.640,223.589,224.357,223.850,223.224,222.734,222.359,222.096,222.115,222.003,221.831,221.625,221.388,221.143,220.945,220.827,220.812,220.842,220.843,220.866,220.961,221.049,221.113,221.374,221.765,221.748,221.854,222.108,222.509,222.935,223.303,223.734,223.790,223.557,223.672,223.986,224.143,224.257,224.418,224.358,224.565,224.778,224.986,225.198,225.403,225.609,225.814,226.133,226.573,226.851,227.103,227.309,227.498,227.663,227.823,228.061,228.059,227.731,null,null,null,null,null,null,null,null,null,null,null],
    [222.417,222.012,221.989,222.033,222.074,221.956,221.616,221.402,221.189,220.976,220.938,220.939,220.971,221.024,221.145,221.403,221.714,222.131,222.503,222.811,223.318,223.174,222.205,222.514,224.100,224.101,223.534,222.960,222.618,222.378,222.082,222.104,222.035,221.862,221.673,221.497,221.363,221.301,221.331,221.363,221.307,221.221,221.199,221.207,221.507,222.030,222.032,221.970,222.075,222.539,222.932,223.426,223.713,223.670,223.568,223.188,222.830,223.410,224.218,224.431,224.336,224.541,224.747,224.959,225.167,225.373,225.578,225.790,226.270,226.595,226.975,227.331,227.585,227.711,227.783,227.924,228.119,227.904,227.758,null,null,null,null,null,null,null,null,null,null,null,null],
    [221.934,221.842,221.876,221.975,222.046,221.861,221.459,221.168,221.089,221.024,221.040,221.049,221.096,221.190,221.318,221.524,221.855,222.232,222.462,222.694,223.061,223.576,222.560,222.475,223.512,224.272,223.787,223.232,222.889,222.527,222.266,222.034,222.089,222.029,221.926,221.792,221.682,221.594,221.563,221.579,221.554,221.546,221.672,221.829,222.085,222.113,222.072,222.394,222.730,222.919,223.282,223.786,223.820,223.638,222.979,222.298,222.103,223.176,224.351,224.417,224.510,224.716,224.928,225.135,225.347,225.552,225.760,226.278,226.524,226.899,227.363,227.781,228.010,228.060,228.059,228.153,227.856,227.672,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [221.637,221.693,221.732,221.786,221.770,221.562,221.216,221.192,221.191,221.206,221.221,221.199,221.269,221.411,221.579,221.814,222.130,222.369,222.464,222.628,222.906,223.613,223.777,223.429,223.972,224.507,224.222,223.504,223.147,222.862,222.641,222.423,222.154,222.043,222.081,222.076,222.028,221.926,221.815,221.831,221.908,222.003,222.092,222.115,222.136,222.315,222.620,222.752,222.970,223.329,224.051,224.102,223.798,223.263,222.372,221.888,222.286,223.636,224.557,224.479,224.684,224.897,225.109,225.316,225.522,225.735,226.192,226.532,226.788,227.176,227.647,228.042,228.255,228.296,228.288,227.875,227.704,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [221.578,221.566,221.548,221.582,221.612,221.473,221.285,221.263,221.255,221.395,221.411,221.373,221.507,221.750,222.005,222.276,222.501,222.581,222.567,222.622,222.828,223.302,224.308,224.756,224.923,224.764,224.328,223.554,223.022,222.885,222.778,222.790,222.473,222.184,222.076,221.996,222.073,222.073,222.097,222.096,222.076,222.112,222.074,222.320,222.465,222.860,222.967,223.157,223.380,223.928,224.516,224.253,223.810,223.115,222.376,221.725,222.850,224.236,224.738,224.652,224.866,225.080,225.293,225.498,225.719,226.274,226.943,226.954,227.207,227.506,227.838,228.130,228.328,228.457,227.965,227.775,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [221.683,221.719,221.666,221.603,221.857,221.813,221.444,221.347,221.395,221.578,221.573,221.626,221.871,222.187,222.464,222.692,222.786,222.786,222.827,222.789,222.977,223.429,223.970,224.755,225.083,224.932,224.485,223.808,223.338,223.219,223.082,222.943,222.821,222.636,222.574,222.467,222.275,222.226,222.087,221.859,222.195,222.329,222.756,222.822,222.944,223.098,223.300,223.421,223.498,223.963,224.262,224.117,223.966,223.349,222.425,221.791,223.295,224.682,224.810,224.835,225.055,225.269,225.482,225.694,225.997,226.763,226.694,226.938,227.707,227.917,228.067,228.187,228.345,227.985,227.839,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [221.990,221.957,222.093,221.998,222.226,222.318,221.817,221.698,221.738,221.957,221.934,221.996,222.256,222.536,222.817,222.937,222.985,223.032,223.150,223.231,223.380,223.555,224.253,224.754,224.969,224.812,224.499,224.111,223.731,223.505,223.369,223.376,223.293,223.168,222.984,222.932,222.754,222.708,222.592,222.348,222.573,222.796,223.006,223.167,223.290,223.447,223.613,223.791,223.839,223.976,224.082,224.123,224.178,223.748,223.271,223.045,224.402,224.913,224.820,225.032,225.253,225.468,225.680,225.933,226.405,226.785,226.533,226.845,228.105,228.398,228.375,228.288,227.938,227.871,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [222.291,222.257,222.520,222.480,222.792,223.098,222.892,222.599,222.382,222.453,222.369,222.414,222.550,222.771,223.018,223.097,223.168,223.358,223.655,223.853,223.793,224.023,224.445,224.708,224.802,224.765,224.604,224.473,224.167,223.868,223.833,223.860,223.741,223.488,223.399,223.316,223.217,223.073,223.165,222.948,222.931,223.143,223.415,223.629,223.647,223.740,223.647,223.393,223.531,224.138,224.243,224.313,224.393,224.462,224.447,224.704,224.928,224.863,225.032,225.247,225.473,225.697,225.919,226.212,226.943,226.648,226.514,227.157,228.768,228.810,228.730,228.127,227.957,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,222.601,222.691,222.574,223.068,223.523,223.433,223.211,223.242,223.055,222.731,222.708,222.765,222.945,223.175,223.357,223.593,223.917,224.428,224.541,224.539,224.565,224.654,224.759,224.759,224.821,224.774,224.771,224.626,224.449,224.324,224.143,224.012,223.833,223.778,223.601,223.545,223.463,223.451,223.322,223.315,223.653,223.765,223.891,223.938,223.390,222.875,222.371,222.687,224.073,224.462,224.528,224.612,224.709,224.793,224.865,224.861,225.041,225.239,225.459,225.711,225.965,226.210,226.587,227.528,227.085,226.682,228.017,229.053,229.114,228.485,228.193,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,223.042,222.727,222.457,222.642,223.013,223.306,223.463,223.462,223.274,223.397,223.226,222.968,223.132,223.628,223.751,223.249,223.837,224.621,224.718,224.865,224.900,224.769,224.884,224.894,224.952,224.993,224.941,224.854,224.724,224.564,224.444,224.251,224.175,223.990,223.774,223.858,223.863,223.856,223.906,223.955,224.036,224.145,224.188,223.922,223.011,222.254,222.135,222.720,224.286,224.692,224.766,224.669,224.661,224.787,224.930,225.079,225.236,225.419,225.661,225.939,226.232,226.502,226.954,227.673,227.550,227.414,228.401,229.200,228.705,228.478,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,223.616,223.768,223.822,223.366,223.288,223.660,223.707,223.614,223.776,222.973,221.924,222.452,223.260,222.571,221.482,222.485,224.549,224.919,225.024,224.985,224.887,224.994,225.056,225.104,225.206,225.108,225.082,224.915,224.803,224.766,224.616,224.415,224.228,224.255,224.233,224.240,224.253,224.295,224.351,224.414,224.471,224.526,224.161,223.310,222.941,223.418,223.991,224.824,224.734,224.740,224.834,224.943,225.065,225.181,225.285,225.403,225.570,225.823,226.147,226.487,226.794,227.360,227.761,228.454,228.731,228.998,228.626,228.572,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,223.947,224.091,224.241,224.347,223.838,223.788,223.972,222.997,221.467,221.496,222.202,221.843,221.625,223.226,224.864,225.131,225.145,225.118,225.146,225.175,225.171,225.317,225.311,225.306,225.233,225.114,225.106,224.902,224.801,224.583,224.498,224.597,224.418,224.309,224.330,224.352,224.400,224.444,224.492,224.827,224.740,224.339,224.461,224.924,225.071,224.932,224.938,225.032,225.135,225.253,225.355,225.418,225.468,225.544,225.698,225.996,226.383,226.779,227.198,227.672,227.868,228.122,228.494,228.378,228.406,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,224.519,224.650,224.521,224.087,223.151,222.930,223.087,223.358,223.970,224.964,225.221,225.169,225.300,225.292,225.270,225.148,225.408,225.445,225.452,225.333,225.328,225.332,225.230,225.188,225.048,224.883,224.918,224.716,224.659,224.693,224.725,224.748,224.770,224.786,224.809,224.851,225.015,225.231,225.263,225.137,225.035,225.104,225.199,225.316,225.434,225.545,225.607,225.611,225.626,225.681,225.860,226.196,226.643,227.093,227.730,228.011,228.139,228.282,228.203,228.092,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,225.080,225.399,225.123,224.948,225.280,225.730,225.526,225.331,225.404,225.454,225.362,225.407,225.403,225.435,225.402,225.472,225.559,225.576,225.643,225.589,225.471,225.355,225.275,225.328,225.047,225.072,225.095,225.111,225.121,225.134,225.134,225.159,225.199,225.229,225.237,225.220,225.205,225.235,225.303,225.433,225.548,225.658,225.742,225.768,225.758,225.758,225.814,226.038,226.431,226.907,227.398,228.075,228.306,228.405,228.352,227.957,228.114,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,225.547,225.664,225.710,225.556,225.441,225.427,225.412,225.418,225.449,225.521,225.601,225.676,225.507,225.872,225.866,225.890,225.873,225.747,225.673,225.678,225.759,225.482,225.490,225.489,225.475,225.459,225.442,225.436,225.452,225.497,225.530,225.508,225.450,225.404,225.405,225.466,225.560,225.663,225.758,225.813,225.823,225.829,225.847,225.943,226.224,226.667,227.175,227.728,228.327,228.531,228.587,228.151,228.074,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,225.743,225.846,225.916,226.230,226.239,226.190,226.109,225.999,226.090,226.161,225.911,225.910,225.869,225.806,225.744,225.695,225.678,225.686,225.712,225.728,225.704,225.641,225.576,225.538,225.546,225.584,225.625,225.671,225.710,225.751,225.806,225.902,226.078,226.430,226.896,227.411,227.856,228.490,228.666,228.590,228.217,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,226.051,226.142,226.572,226.613,226.450,226.426,226.452,226.552,226.323,226.297,226.218,226.105,225.996,225.917,225.878,225.861,225.862,225.870,225.846,225.775,225.681,225.594,225.553,225.513,225.476,225.475,225.515,225.599,225.736,225.944,226.233,226.637,227.122,227.610,228.162,228.577,228.665,228.445,228.359,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,226.320,226.430,226.677,226.867,226.864,226.899,227.059,226.921,226.652,226.534,226.383,226.233,226.130,226.067,226.021,226.005,226.011,225.987,225.902,225.785,225.664,225.562,225.458,225.357,225.326,225.372,225.500,225.733,226.050,226.433,226.888,227.364,227.801,228.416,228.564,228.541,228.550,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,226.730,226.744,227.261,227.286,227.338,227.341,227.214,226.845,226.661,226.495,226.368,226.281,226.224,226.201,226.202,226.177,226.090,225.979,225.832,225.681,225.523,225.401,225.355,225.412,225.585,225.877,226.266,226.722,227.182,227.610,228.271,228.498,228.513,228.685,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,226.975,227.037,227.568,227.638,227.702,227.609,227.439,226.993,226.825,226.677,226.566,226.503,226.479,226.463,226.361,226.264,226.225,226.145,225.974,225.809,225.680,225.628,225.698,225.887,226.205,226.627,227.093,227.536,228.161,228.482,228.628,228.776,228.867,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,227.196,227.480,227.957,227.965,227.828,227.656,227.527,227.237,227.073,226.886,226.856,226.803,226.644,226.520,226.533,226.526,226.354,226.231,226.183,226.165,226.225,226.412,226.708,227.095,227.508,228.080,228.461,228.616,228.733,229.040,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,227.348,227.492,228.106,228.207,228.104,227.983,227.877,227.662,227.745,227.717,227.570,227.225,227.045,227.031,226.961,226.730,226.637,226.761,226.852,226.911,227.055,227.310,227.631,228.216,228.504,228.682,228.790,229.229,229.347,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,227.807,227.924,228.457,228.459,228.339,228.161,228.181,228.340,228.202,228.130,228.017,227.674,227.544,227.318,227.259,227.421,227.575,227.633,227.767,227.965,228.292,228.638,228.790,228.779,229.296,229.530,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,228.194,228.265,228.303,228.708,228.689,228.692,228.741,228.719,228.678,228.610,228.565,228.433,228.124,228.060,228.154,228.244,228.362,228.652,229.012,229.231,229.085,228.545,228.901,229.756,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,228.557,228.543,228.536,228.948,229.008,229.063,229.084,229.113,228.988,228.934,228.987,229.028,229.129,229.159,229.230,229.372,229.661,229.736,229.321,229.042,229.950,230.085,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,228.661,228.661,228.699,228.777,229.069,229.261,228.943,229.179,229.203,229.499,229.818,229.940,229.769,229.875,229.723,229.848,230.060,230.218,230.273,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,228.706,228.748,228.865,228.943,228.931,229.154,229.312,229.721,230.132,230.193,230.122,230.102,230.413,230.550,230.548,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,228.921,229.024,229.158,229.328,229.620,230.008,230.280,230.462,230.629,230.746,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,229.587,229.933,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
  ]
};

// prettier-ignore
const HeightMap_Hole_5 = {
  minX:360,
  maxX:628,
  minZ:-152,
  maxZ:20,
  step:4,
  h:[
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,229.794,230.171,230.004,229.713,229.584,229.616,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,229.165,230.229,230.703,230.541,230.257,229.779,229.346,229.246,229.221,229.078,228.827,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,229.042,229.772,230.668,230.652,230.427,230.161,229.667,229.198,229.084,229.054,228.966,228.808,228.384,228.074,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,229.301,230.106,230.643,230.604,230.265,229.774,229.016,228.567,228.703,228.717,228.644,228.533,228.283,227.852,227.411,227.418,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,229.160,229.760,230.368,230.580,230.486,230.175,228.949,227.852,227.816,227.974,228.381,228.391,228.335,228.154,227.696,227.111,226.917,227.021,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,229.616,230.163,230.463,230.517,230.422,229.326,228.109,227.611,227.577,227.603,228.050,228.131,228.137,228.113,227.807,227.152,226.708,226.672,226.684,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,229.229,229.955,230.351,230.517,230.502,230.071,228.528,227.776,227.601,227.658,227.824,227.634,227.635,227.715,227.970,227.891,227.270,226.770,226.542,226.464,226.399,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,229.718,230.192,230.540,230.644,230.588,229.545,228.125,227.658,227.592,227.851,227.585,227.599,227.586,227.587,227.618,227.762,227.303,226.802,226.606,226.588,226.642,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,229.347,229.985,230.429,230.739,230.809,230.587,229.327,228.054,227.646,227.862,227.585,227.585,227.585,227.585,227.585,227.585,227.709,227.439,227.057,226.866,226.832,226.808,226.654],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,229.409,230.211,230.635,230.874,230.833,230.461,229.565,228.171,227.963,227.586,227.585,227.585,227.585,227.585,227.585,227.576,227.700,227.680,227.410,227.285,227.080,226.920,226.595],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,229.812,230.415,230.763,230.866,230.666,230.169,229.367,228.488,227.694,227.592,227.585,227.585,227.585,227.585,227.585,227.570,227.805,227.805,227.765,227.662,227.262,227.115,226.578],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,229.514,230.120,230.540,230.770,230.714,230.333,229.749,229.036,228.042,227.672,227.586,227.585,227.585,227.585,227.585,227.675,227.847,227.360,227.410,228.111,227.934,227.468,227.124,226.295],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,229.579,230.271,230.563,230.667,230.446,229.879,229.210,228.319,227.862,227.634,227.585,227.585,227.585,227.596,227.812,227.774,227.059,227.012,227.296,228.081,228.042,227.529,227.122,226.157],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,229.529,229.836,230.358,230.467,230.436,230.056,229.410,228.635,227.990,227.713,227.607,227.585,227.585,227.595,227.852,227.226,226.715,226.325,226.782,227.656,228.037,227.979,227.385,226.666,225.686],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,229.505,230.011,230.432,230.302,230.178,229.608,228.985,228.130,227.784,227.633,227.593,227.585,227.586,227.723,227.994,227.059,226.617,226.433,226.922,227.804,228.106,227.963,227.004,226.254,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,229.945,230.270,230.535,230.475,229.854,229.205,228.541,227.895,227.680,227.601,227.593,227.585,227.641,228.043,228.372,228.147,227.560,227.663,227.975,227.974,228.206,227.790,227.142,226.191,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,229.450,230.147,230.637,230.823,230.462,229.530,228.841,228.055,227.758,227.634,227.601,227.593,227.594,227.848,228.114,228.239,228.216,228.296,228.114,228.044,228.041,227.737,227.598,226.851,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,229.505,230.325,230.910,230.962,230.032,229.238,228.564,227.895,227.703,227.639,227.617,227.616,227.709,228.104,228.083,227.924,228.209,228.489,228.316,228.338,228.148,227.552,227.222,226.496,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,229.378,229.962,230.613,230.934,230.414,229.662,229.058,228.353,227.870,227.719,227.671,227.648,227.640,227.787,228.113,227.173,226.870,228.286,228.712,228.932,228.848,228.545,227.671,226.659,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,229.380,230.097,230.510,230.604,229.965,229.473,228.990,228.238,227.901,227.736,227.696,227.681,227.720,227.888,227.709,226.622,226.193,227.670,228.392,228.652,228.689,228.216,227.480,226.450,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,229.309,229.423,230.114,230.406,230.114,229.680,229.347,228.959,228.264,227.900,227.711,227.719,227.749,227.854,228.015,227.311,226.269,225.965,226.902,228.021,228.406,228.350,227.685,226.959,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,229.307,229.505,230.183,230.138,229.814,229.522,229.230,228.886,228.278,227.911,227.752,227.806,227.869,228.073,228.104,227.412,226.415,226.005,226.900,228.208,228.459,228.271,227.463,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,229.270,229.579,230.146,229.932,229.623,229.378,229.103,228.578,228.295,228.003,227.903,227.973,228.035,228.247,228.263,228.027,226.893,226.458,227.697,228.459,228.265,227.832,227.095,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,229.284,229.270,230.280,230.335,229.916,229.521,229.254,229.001,228.525,228.257,228.035,228.020,228.107,228.154,228.367,228.307,228.524,228.313,227.987,228.352,228.465,228.036,227.485,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,229.184,229.670,230.476,230.514,229.911,229.466,229.174,228.725,228.417,228.186,228.037,228.082,228.168,228.227,228.540,228.565,228.495,228.439,228.319,228.266,228.172,227.767,226.640,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,229.332,229.099,229.687,230.107,230.154,229.718,229.403,228.821,228.456,228.305,228.155,228.137,228.202,228.234,228.304,228.753,228.803,228.659,228.595,228.338,228.239,228.027,227.575,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,229.338,229.460,229.412,229.611,229.679,229.517,228.910,228.543,228.344,228.266,228.250,228.311,228.368,228.296,228.304,228.786,228.819,228.810,228.793,228.422,227.997,227.727,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,229.286,229.238,229.268,229.379,229.224,229.033,228.723,228.486,228.432,228.385,228.382,228.447,228.470,228.342,228.417,228.779,228.706,228.589,228.509,228.066,227.616,227.188,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,229.473,229.268,229.215,229.272,229.039,228.990,228.841,228.684,228.637,228.636,228.517,228.415,228.479,228.516,228.390,228.605,228.866,228.732,228.298,227.958,227.410,226.734,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,229.441,229.308,229.236,229.063,228.850,228.738,228.666,228.701,228.802,228.771,228.556,228.424,228.429,228.438,228.402,228.779,229.055,228.902,228.267,227.622,226.951,226.385,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,229.696,229.434,229.268,229.134,228.804,228.582,228.479,228.488,228.706,228.858,228.754,228.612,228.508,228.456,228.424,228.747,229.087,229.268,228.936,228.245,227.364,227.108,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,229.648,229.409,229.197,228.999,228.536,228.390,228.311,228.573,228.974,228.825,228.620,228.611,228.621,228.611,228.857,229.166,229.544,229.370,228.605,227.917,227.435,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,229.624,229.363,229.127,228.849,228.408,228.265,228.236,228.740,229.200,228.718,228.500,228.437,228.579,228.820,229.221,229.585,229.701,228.986,228.438,227.841,227.530,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,229.847,229.570,229.308,229.063,228.785,228.351,228.194,228.384,229.044,229.007,228.674,228.240,228.209,228.398,228.941,229.369,229.734,229.479,228.795,228.387,227.727,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,229.816,229.505,229.245,229.007,228.730,228.305,228.154,228.274,228.666,228.589,228.319,227.971,228.042,228.321,228.789,229.293,229.552,229.118,228.675,228.107,227.601,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,230.166,229.977,229.434,229.188,228.960,228.696,228.265,228.106,228.201,228.413,228.240,227.880,227.861,227.911,228.341,228.748,229.330,229.315,228.814,228.385,227.683,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,229.939,229.634,229.363,229.102,228.919,228.665,228.240,228.083,228.043,228.128,227.832,227.776,227.783,228.058,228.275,228.907,229.607,229.402,228.631,228.218,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,230.050,229.642,229.302,229.095,228.857,228.634,228.227,228.083,227.966,227.868,227.791,227.760,227.870,228.133,228.479,229.353,229.844,229.531,228.767,227.944,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,230.386,230.046,229.700,229.269,229.063,228.881,228.549,228.234,228.098,227.979,227.884,227.815,227.826,228.052,228.241,228.848,229.710,229.718,229.353,228.842,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,230.785,230.352,229.725,229.248,229.078,228.937,228.658,228.256,228.124,228.019,227.933,227.887,228.115,228.092,228.310,228.986,229.638,229.347,228.937,228.325,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,230.569,230.936,230.526,229.999,229.553,229.291,229.110,228.708,228.281,228.185,228.114,228.029,228.160,228.179,228.147,228.421,229.023,229.353,228.789,228.383,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,230.875,231.189,230.817,230.294,229.869,229.576,229.229,228.799,228.342,228.256,228.217,228.148,228.319,228.258,228.226,228.566,229.029,229.171,228.840,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,231.344,231.521,231.078,230.276,229.737,229.724,229.316,228.792,228.438,228.400,228.399,228.313,228.408,228.344,228.415,228.937,229.190,229.054,228.548,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,230.292,231.583,231.623,231.181,230.202,229.454,229.553,229.228,228.711,228.539,228.564,228.534,228.609,228.509,228.479,228.927,229.395,229.419,228.981,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,231.089,231.566,231.450,231.026,230.154,229.677,229.482,229.196,228.778,228.518,228.562,228.556,228.691,228.614,228.620,229.104,229.330,229.337,228.440,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,229.833,231.271,231.268,231.150,230.911,230.479,230.267,229.969,229.244,228.841,228.597,228.629,228.725,228.794,228.731,228.763,229.182,229.347,228.920,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,230.604,231.007,230.936,230.960,231.055,230.854,230.466,230.058,229.167,228.952,228.801,228.716,228.951,228.921,228.872,229.087,229.410,229.433,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,230.539,230.642,230.613,230.842,231.084,230.784,230.232,229.678,229.016,228.784,228.833,228.821,229.109,229.057,229.057,229.432,229.295,229.070,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,230.164,230.313,230.216,230.118,230.325,230.587,230.349,229.869,229.197,228.948,228.968,228.998,229.087,229.254,229.212,229.269,229.426,229.309,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,230.302,230.083,229.728,229.537,229.612,229.797,229.734,229.301,229.105,229.033,229.103,229.128,229.247,229.419,229.397,229.388,229.386,229.154,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,230.357,229.861,229.506,229.325,229.294,229.333,229.190,229.118,229.127,229.143,229.236,229.299,229.490,229.632,229.681,229.623,229.348,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,230.122,230.286,229.846,229.705,229.544,229.413,229.205,229.030,229.102,229.181,229.285,229.411,229.498,229.764,229.862,229.931,229.851,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,230.321,230.384,230.201,230.097,229.837,229.606,229.135,229.093,229.174,229.300,229.465,229.626,229.770,230.096,230.059,230.018,229.829,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,230.391,230.938,230.881,230.613,230.299,229.935,229.498,229.190,229.204,229.316,229.481,229.688,229.901,230.319,230.374,230.264,230.050,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,231.050,231.377,231.290,230.897,230.392,229.989,229.397,229.230,229.340,229.514,229.726,229.980,230.429,230.660,230.503,230.280,230.011,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,231.396,231.679,231.591,231.172,230.606,230.130,229.797,229.531,229.608,229.814,230.044,230.494,230.824,230.857,230.534,230.209,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,230.931,231.601,231.899,231.829,231.492,230.970,230.487,230.186,230.176,230.234,230.374,230.658,230.936,231.078,230.880,230.565,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,231.080,231.766,232.027,232.016,231.779,231.471,230.990,230.613,230.629,230.857,231.032,231.189,231.251,231.304,230.868,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,231.080,231.518,232.057,232.112,231.839,231.906,231.877,231.527,231.219,231.168,231.366,231.563,231.667,231.527,231.222,230.553,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,231.186,231.737,232.089,231.888,231.845,231.863,231.931,231.926,231.830,231.829,231.924,231.987,232.007,231.490,231.002,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,231.964,232.276,231.987,231.845,231.845,231.845,231.845,231.845,231.844,231.912,232.270,232.073,231.568,231.135,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [231.741,232.557,232.147,231.845,231.845,231.845,231.845,231.845,231.845,231.845,232.028,232.177,231.816,231.705,230.081,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [232.005,232.645,232.083,231.846,231.845,231.845,231.845,231.845,231.845,231.854,232.138,232.010,231.716,231.072,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [232.182,232.549,232.240,231.887,231.845,231.845,231.845,231.845,231.845,232.026,231.876,231.653,231.758,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [232.449,232.633,232.319,232.161,231.878,231.845,231.846,231.845,231.895,231.998,231.301,231.162,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [232.407,232.659,232.501,232.254,232.137,232.011,231.929,232.042,232.029,231.545,231.160,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,232.533,232.691,232.595,232.491,232.476,232.533,232.477,232.123,231.648,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,232.595,232.802,232.887,232.880,232.762,232.485,232.034,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
  ]
};

// prettier-ignore
const HeightMap_Hole_6 = {
  minX:292,
  maxX:688,
  minZ:-20,
  maxZ:204,
  step:4,
  h:[
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 224.709, 225.526, 225.718, 225.690, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 224.078, 224.510, 224.708, 224.975, 225.356, 224.901, 224.809, 225.339, 225.431, 225.642, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 224.082, 223.896, 224.263, 224.880, 225.134, 225.109, 224.598, 223.922, 223.808, 223.864, 224.516, 225.556, 225.631, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 223.688, 224.169, 224.565, 224.535, 224.793, 225.267, 225.480, 224.967, 224.529, 224.227, 223.823, 223.603, 223.868, 224.750, 225.771, 225.546],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 223.920, 224.478, 224.500, 225.359, 225.214, 225.211, 225.247, 225.338, 225.032, 224.604, 224.407, 224.403, 223.636, 223.507, 224.347, 225.311, 225.328],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 223.955, 224.840, 225.245, 225.074, 224.700, 224.712, 225.071, 224.826, 224.746, 224.415, 223.990, 223.849, 224.098, 224.251, 223.362, 224.008, 225.001, 225.017],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 223.927, 224.734, 224.868, 225.075, 223.839, 223.320, 223.447, 224.484, 224.346, 224.124, 223.925, 223.790, 223.627, 223.613, 224.027, 224.134, 224.190, 224.836, 224.965],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 223.902, 224.662, 225.190, 225.384, 224.248, 223.375, 223.383, 223.669, 224.180, 224.008, 223.830, 223.892, 223.829, 223.647, 223.587, 223.644, 223.996, 224.338, 224.788, 224.976],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 224.777, 225.115, 225.075, 224.945, 223.810, 223.798, 224.318, 224.186, 224.026, 223.697, 223.743, 223.844, 223.743, 223.479, 223.507, 223.561, 223.619, 224.307, 224.972, 225.400],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 224.811, 224.900, 225.003, 224.959, 224.723, 224.478, 224.361, 224.123, 223.966, 223.824, 223.759, 223.800, 223.870, 223.695, 223.365, 223.333, 223.445, 223.681, 224.514, 225.265, 225.766],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 224.603, 225.133, 225.009, 224.890, 224.666, 224.267, 223.974, 223.793, 223.892, 224.020, 223.989, 223.933, 223.933, 223.917, 223.703, 223.421, 223.451, 223.690, 223.997, 224.729, 225.442, 225.886],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 224.069, 225.039, 225.244, 224.806, 224.490, 224.288, 223.940, 223.656, 223.611, 223.832, 224.084, 224.153, 224.090, 224.004, 223.846, 223.618, 223.513, 223.704, 223.973, 224.268, 224.812, 225.718, 225.951],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 224.680, 225.589, 225.220, 224.672, 224.503, 224.234, 223.880, 223.635, 223.633, 223.871, 224.162, 224.226, 224.121, 223.932, 223.711, 223.539, 223.571, 223.840, 224.210, 224.581, 225.237, 225.759, 225.969],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 224.508, 225.748, 225.600, 224.953, 224.533, 224.408, 224.305, 224.095, 223.830, 223.831, 224.028, 224.233, 224.217, 224.066, 223.824, 223.624, 223.546, 223.689, 224.051, 224.517, 225.008, 225.662, 225.949, 225.993],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 224.184, 225.083, 225.844, 225.197, 224.652, 224.382, 224.289, 224.321, 224.280, 224.107, 224.067, 224.209, 224.272, 224.194, 224.004, 223.760, 223.616, 223.640, 223.853, 224.255, 224.827, 225.427, 226.115, 226.200, 226.060],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 224.974, 226.015, 225.475, 224.790, 224.471, 224.154, 224.123, 224.149, 224.168, 224.138, 224.069, 224.164, 224.233, 224.164, 223.940, 223.704, 223.650, 223.783, 224.028, 224.460, 225.023, 225.708, 226.360, 226.356, 226.146],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 224.486, 225.976, 225.822, 225.132, 224.674, 224.232, 223.825, 223.933, 223.919, 223.848, 223.759, 223.775, 223.940, 224.082, 224.076, 223.869, 223.705, 223.784, 223.973, 224.201, 224.542, 225.184, 226.263, 226.840, 226.539, 226.403],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 224.559, 224.928, 226.398, 225.673, 224.734, 224.249, 223.815, 223.704, 223.871, 223.807, 223.577, 223.372, 223.380, 223.618, 223.816, 223.887, 223.807, 223.800, 223.950, 224.137, 224.314, 224.817, 225.696, 226.635, 226.998, 227.153, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 225.409, 226.748, 226.494, 225.680, 224.758, 224.108, 223.744, 223.808, 224.012, 223.887, 223.531, 223.192, 223.151, 223.357, 223.570, 223.730, 223.814, 223.934, 224.116, 224.464, 224.899, 225.403, 226.035, 226.630, 227.075, 226.950, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 225.250, 225.338, 226.968, 226.780, 225.909, 225.109, 224.391, 224.006, 224.140, 224.322, 224.101, 223.653, 223.310, 223.261, 223.380, 223.658, 224.064, 224.222, 224.283, 224.707, 225.096, 225.513, 225.909, 226.388, 226.361, 226.501, 226.682, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 224.858, 225.545, 226.242, 227.289, 226.975, 226.019, 225.221, 224.456, 224.155, 224.359, 224.430, 224.178, 223.839, 223.600, 223.878, 223.941, 223.782, 223.881, 224.388, 224.960, 225.365, 225.766, 226.050, 226.219, 226.519, 226.197, 226.287, 226.345, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 225.317, 226.260, 227.428, 227.364, 226.880, 225.871, 225.064, 224.392, 224.085, 224.239, 224.304, 224.200, 224.117, 224.177, 223.921, 223.096, 222.404, 222.850, 223.580, 225.102, 225.969, 226.151, 226.195, 226.553, 226.521, 226.451, 226.265, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 225.432, 226.306, 227.356, 227.893, 227.742, 226.673, 225.643, 224.937, 224.298, 223.902, 223.999, 224.138, 224.148, 224.423, 224.114, 223.138, 222.747, 222.583, 223.143, 224.047, 225.542, 226.114, 226.148, 226.193, 226.104, 226.388, 226.225, 226.242, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 226.199, 226.599, 227.592, 228.221, 227.805, 226.513, 225.612, 224.953, 224.392, 224.005, 223.933, 223.927, 224.108, 224.578, 224.116, 223.152, 223.034, 223.541, 224.314, 225.345, 225.923, 226.046, 226.068, 226.024, 226.067, 226.102, 226.114, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 226.355, 227.201, 227.614, 227.817, 227.826, 227.246, 226.402, 225.830, 225.024, 224.517, 224.167, 223.908, 223.879, 224.162, 224.510, 224.063, 223.498, 224.192, 224.939, 225.398, 225.637, 225.712, 225.815, 225.886, 225.958, 226.030, 226.875, 227.703, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 225.370, 227.036, 227.518, 227.923, 228.401, 228.010, 227.126, 226.147, 225.592, 224.780, 224.258, 223.991, 223.886, 224.026, 224.304, 225.303, 224.672, 224.907, 224.972, 225.156, 225.428, 225.688, 225.726, 225.790, 226.030, 227.048, 227.460, 227.764, 228.084, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 226.741, 227.178, 227.522, 228.070, 228.004, 227.685, 226.785, 225.603, 224.921, 224.321, 223.873, 223.847, 224.020, 224.208, 224.673, 225.303, 225.357, 225.191, 225.011, 225.584, 225.648, 225.664, 226.010, 226.790, 227.127, 227.596, 227.828, 228.009, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 226.139, 227.088, 227.062, 226.640, 226.940, 227.557, 226.972, 226.200, 225.299, 224.613, 224.062, 223.792, 224.004, 224.208, 224.489, 225.204, 225.821, 225.908, 225.387, 225.597, 225.640, 225.659, 226.276, 227.096, 227.372, 227.537, 227.640, 227.655, 227.712, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 225.348, 227.138, 227.533, 226.584, 226.555, 226.388, 227.330, 226.930, 226.150, 225.158, 224.408, 223.999, 224.037, 224.210, 224.393, 224.898, 225.514, 225.915, 225.939, 225.892, 225.650, 225.703, 226.772, 226.984, 227.150, 227.288, 227.583, 228.050, 228.322, 228.499, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 226.195, 227.517, 227.371, 226.410, 225.907, 226.095, 227.160, 226.817, 225.956, 225.089, 224.537, 224.369, 224.370, 224.441, 224.851, 225.384, 225.462, 225.561, 225.836, 225.737, 225.761, 226.462, 226.644, 226.844, 227.290, 227.734, 228.062, 228.328, 228.537, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 225.750, 226.978, 227.481, 227.584, 226.952, 226.360, 226.341, 226.798, 226.370, 225.743, 225.136, 224.830, 224.693, 224.661, 224.880, 225.372, 225.640, 225.417, 225.610, 225.704, 225.700, 226.184, 226.377, 226.935, 227.402, 227.744, 228.058, 228.342, 228.564, 228.725, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 226.439, 227.185, 227.576, 227.843, 227.693, 227.479, 227.064, 226.517, 226.292, 225.679, 225.489, 225.302, 225.322, 225.358, 225.622, 225.735, 225.638, 225.678, 225.751, 225.752, 225.962, 226.533, 227.150, 227.482, 227.792, 228.086, 228.358, 228.591, 228.792, 228.942, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 226.545, 226.769, 227.064, 227.306, 227.107, 227.322, 227.129, 226.697, 226.562, 226.123, 225.737, 225.633, 225.430, 225.483, 225.599, 225.688, 225.626, 225.743, 225.806, 225.789, 226.267, 226.907, 227.297, 227.600, 227.884, 228.154, 228.410, 228.651, 228.919, 229.112, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 226.074, 226.327, 226.265, 226.427, 226.745, 226.700, 226.466, 226.142, 225.926, 225.968, 226.149, 226.120, 225.856, 225.533, 225.514, 225.523, 225.577, 225.821, 225.873, 225.847, 226.156, 226.947, 227.331, 227.693, 227.990, 228.266, 228.550, 228.832, 229.007, 229.266, 229.434, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 226.015, 226.188, 226.410, 226.700, 226.749, 226.668, 226.596, 226.532, 226.484, 226.419, 226.500, 226.509, 226.195, 225.767, 225.536, 225.658, 225.901, 226.001, 225.908, 226.073, 226.991, 227.344, 227.720, 228.034, 228.405, 228.777, 229.069, 229.229, 229.362, 229.481, 229.593, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 225.950, 226.504, 227.382, 227.650, 227.949, 227.735, 227.300, 227.047, 226.649, 226.477, 226.422, 226.361, 226.192, 226.395, 226.091, 226.010, 226.066, 226.035, 226.037, 226.355, 227.051, 227.364, 227.728, 228.126, 228.539, 228.867, 229.144, 229.314, 229.360, 229.308, 229.379, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 226.683, 227.260, 227.828, 228.097, 228.378, 228.364, 228.082, 228.051, 227.788, 227.278, 226.765, 226.401, 226.289, 226.257, 226.209, 226.154, 226.108, 226.164, 226.332, 227.093, 227.393, 227.771, 228.138, 228.540, 228.895, 229.150, 229.349, 229.404, 229.338, 229.420, 229.492, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 226.507, 227.539, 228.272, 228.390, 228.429, 228.486, 228.446, 228.446, 228.469, 228.428, 228.224, 227.814, 227.313, 226.985, 226.619, 226.064, 226.418, 226.551, 226.468, 227.130, 227.411, 227.775, 228.133, 228.593, 228.880, 229.085, 229.303, 229.498, 229.419, 229.450, 229.536, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 227.788, 228.597, 228.566, 228.581, 228.570, 228.370, 228.276, 228.278, 228.468, 228.573, 228.549, 228.224, 227.500, 227.027, 226.780, 226.424, 226.592, 226.606, 226.710, 227.440, 227.798, 228.074, 228.571, 228.887, 229.124, 229.300, 229.419, 229.623, 229.507, 229.544, 229.619, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 228.076, 228.612, 228.612, 228.569, 228.356, 228.296, 228.225, 228.171, 228.179, 228.249, 228.424, 228.708, 228.566, 227.839, 227.306, 226.903, 226.698, 226.739, 226.689, 227.437, 227.766, 228.097, 228.511, 228.891, 229.194, 229.363, 229.502, 229.629, 229.750, 229.650, 229.614, 229.686, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 227.734, 228.612, 228.612, 228.508, 228.313, 228.312, 228.241, 228.114, 228.021, 228.044, 228.162, 228.306, 228.824, 228.768, 227.986, 227.124, 226.581, 227.185, 226.824, 226.952, 228.046, 228.016, 228.392, 228.873, 229.224, 229.482, 229.687, 229.845, 229.914, 229.948, 229.955, 229.954, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 228.507, 228.699, 228.610, 228.320, 228.312, 228.290, 228.186, 228.037, 227.942, 227.988, 228.122, 228.321, 228.709, 228.548, 227.686, 226.701, 226.037, 226.961, 226.897, 228.118, 228.504, 228.578, 228.682, 229.205, 229.575, 229.848, 230.066, 230.198, 230.232, 230.209, 230.138, 230.074, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 227.858, 228.692, 228.754, 228.401, 228.311, 228.265, 228.208, 228.122, 228.028, 227.995, 228.049, 228.179, 228.563, 228.691, 228.215, 227.353, 225.989, 227.052, 227.017, 227.115, 228.329, 228.693, 229.118, 229.033, 229.502, 229.898, 230.217, 230.446, 230.542, 230.571, 230.492, 230.351, 230.209, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 228.231, 228.816, 228.683, 228.320, 228.280, 228.178, 228.083, 228.051, 228.059, 228.107, 228.178, 228.538, 228.879, 228.769, 228.019, 226.661, 226.963, 227.260, 227.120, 227.204, 228.184, 228.693, 229.764, 229.599, 229.737, 230.184, 230.514, 230.772, 230.890, 230.896, 230.783, 230.575, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, 227.835, 228.612, 228.927, 228.550, 228.311, 228.248, 228.123, 228.013, 228.005, 228.106, 228.234, 228.681, 228.943, 228.918, 228.162, 226.924, 226.757, 227.269, 227.363, 227.185, 227.341, 228.276, 229.557, 230.121, 229.845, 229.794, 230.281, 230.700, 231.001, 231.186, 231.183, 231.070, 230.819, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, 228.237, 228.291, 228.880, 228.410, 228.305, 228.242, 228.132, 228.052, 228.060, 228.155, 228.635, 229.173, 229.170, 228.374, 227.293, 226.776, 227.300, 227.353, 227.466, 227.273, 227.950, 228.644, 230.107, 230.083, 229.814, 229.721, 230.239, 230.777, 231.134, 231.366, 231.465, 231.365, 231.096, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, 227.870, 228.324, 228.579, 228.870, 228.345, 228.287, 228.232, 228.168, 228.140, 228.170, 228.491, 228.913, 229.249, 228.684, 227.469, 227.206, 227.338, 227.316, 227.237, 227.571, 227.593, 228.510, 229.045, 229.945, 229.839, 229.578, 229.637, 230.077, 230.689, 231.134, 231.463, 231.661, 231.637, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, 227.311, 228.406, 229.049, 228.763, 228.643, 228.303, 228.217, 228.160, 228.155, 228.201, 228.322, 228.738, 229.141, 228.842, 227.755, 227.180, 227.362, 227.289, 227.266, 227.620, 227.726, 227.828, 228.976, 229.302, 229.545, 229.562, 229.538, 229.502, 229.934, 230.443, 231.008, 231.410, 231.679, 231.773, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, 228.167, 228.244, 229.060, 228.982, 228.588, 228.218, 228.085, 228.035, 228.090, 228.209, 228.616, 229.024, 229.053, 228.224, 227.246, 227.386, 227.374, 227.450, 227.809, 228.430, 228.122, 227.776, 228.769, 229.101, 229.445, 229.524, 229.564, 229.658, 229.825, 230.248, 230.686, 231.197, 231.559, 231.765, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, 227.636, 228.057, 228.519, 229.085, 228.878, 228.425, 228.140, 227.975, 227.940, 228.044, 228.242, 228.835, 229.110, 228.666, 227.770, 227.435, 227.430, 227.495, 227.837, 228.455, 228.974, 229.323, 227.850, 227.958, 229.409, 229.533, 229.586, 229.755, 229.682, 229.678, 230.106, 230.445, 230.793, 231.276, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, 227.879, 228.927, 229.443, 229.197, 228.756, 228.285, 228.073, 227.909, 227.911, 228.082, 228.657, 229.190, 229.015, 228.227, 227.666, 227.564, 227.730, 228.042, 228.488, 228.934, 229.420, 229.662, 228.816, 228.146, 228.374, 229.873, 229.768, 229.776, 229.885, 229.988, 229.941, 230.270, 230.510, 230.872, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, 227.865, 228.138, 229.123, 229.404, 229.383, 228.623, 228.263, 228.020, 227.887, 227.964, 228.186, 228.919, 229.401, 228.927, 228.023, 227.781, 227.966, 228.495, 228.704, 229.056, 229.360, 229.527, 229.552, 229.901, 228.588, 228.531, 228.783, 229.931, 230.070, 230.097, 230.169, 230.200, 230.045, 230.314, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, 227.898, 229.437, 229.437, 229.434, 229.154, 228.669, 228.352, 228.075, 227.973, 228.083, 228.433, 229.056, 229.288, 228.598, 228.122, 228.024, 228.863, 229.159, 229.426, 229.560, 229.702, 229.690, 229.795, 229.751, 230.323, 228.883, 228.945, 229.188, 230.148, 230.325, 230.406, 230.430, 230.104, 230.304, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, 227.583, 228.471, 229.437, 229.818, 229.567, 229.109, 228.889, 228.582, 228.382, 228.352, 228.401, 228.823, 229.148, 228.959, 228.518, 228.350, 228.762, 229.582, 230.000, 230.092, 230.066, 230.054, 230.041, 230.067, 230.100, 230.110, 230.171, 229.398, 229.373, 229.624, 230.349, 230.708, 230.602, 230.690, 230.621, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, 228.046, 228.945, 229.768, 229.802, 229.264, 229.138, 228.990, 228.863, 228.810, 228.912, 229.157, 229.182, 229.102, 228.861, 228.724, 228.782, 229.619, 230.191, 230.462, 230.540, 230.499, 230.493, 230.439, 230.382, 230.368, 230.379, 230.387, 230.789, 230.238, 229.820, 230.057, 230.485, 230.920, 230.880, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, 227.838, 228.430, 229.267, 229.533, 229.318, 229.182, 229.046, 228.938, 228.945, 229.056, 229.363, 229.647, 229.465, 229.153, 229.109, 228.995, 229.782, 230.342, 230.792, 231.011, 230.992, 230.951, 230.857, 230.812, 230.795, 230.724, 230.702, 230.703, 230.857, 230.807, 230.954, 230.237, 230.502, 230.772, 231.149, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, 227.509, 228.337, 229.008, 229.351, 229.216, 229.229, 229.110, 228.944, 228.890, 229.000, 229.250, 229.663, 229.866, 229.602, 229.489, 229.380, 229.738, 230.386, 230.828, 230.077, 229.805, 230.590, 231.293, 231.102, 231.046, 231.094, 231.164, 231.205, 231.111, 231.166, 231.515, 231.498, 231.157, 230.663, 230.969, 231.229, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, 227.844, 228.557, 229.140, 229.160, 229.268, 229.212, 229.063, 228.936, 228.945, 229.127, 229.645, 229.847, 229.947, 229.800, 229.776, 229.924, 230.766, 231.018, 229.973, 228.866, 228.566, 229.008, 230.269, 231.025, 231.078, 231.275, 231.484, 231.740, 231.746, 231.711, 231.773, 231.826, 231.610, 231.314, 231.205, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, 228.139, 228.937, 229.227, 229.245, 229.291, 229.205, 229.071, 229.015, 229.111, 229.441, 229.814, 230.166, 229.979, 230.209, 230.107, 230.893, 231.534, 230.695, 228.793, 228.205, 228.213, 228.097, 229.143, 230.755, 230.929, 231.271, 231.739, 231.891, 231.952, 231.938, 231.920, 231.949, 231.897, 231.718, 231.670, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, 228.078, 228.990, 229.236, 229.175, 229.292, 229.308, 229.253, 229.167, 229.166, 229.301, 229.751, 229.972, 230.193, 230.093, 230.400, 230.516, 231.513, 231.946, 230.378, 228.591, 227.983, 228.028, 228.745, 229.976, 230.432, 230.408, 230.940, 231.384, 231.712, 232.097, 232.191, 232.217, 232.136, 232.178, 232.119, 232.195, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, 229.078, 229.611, 229.494, 229.207, 229.323, 229.348, 229.340, 229.317, 229.363, 229.489, 229.923, 230.124, 230.214, 230.855, 230.652, 231.272, 231.985, 232.164, 230.396, 228.531, 228.131, 228.781, 229.276, 230.232, 229.975, 230.241, 230.685, 231.173, 231.505, 231.934, 232.206, 232.455, 232.419, 232.480, 232.508, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, 228.378, 229.314, 229.409, 229.136, 229.175, 229.346, 229.403, 229.427, 229.451, 229.520, 229.625, 229.957, 230.465, 230.537, 231.018, 230.919, 231.925, 232.333, 232.223, 230.228, 229.268, 228.801, 229.852, 230.283, 230.005, 229.917, 230.209, 230.588, 230.992, 231.364, 231.647, 232.244, 232.545, 232.748, 232.877, 232.808, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, 229.242, 229.459, 229.265, 229.113, 229.341, 229.452, 229.483, 229.513, 229.560, 229.624, 229.925, 229.903, 230.114, 230.667, 231.168, 231.239, 232.153, 232.429, 232.300, 231.395, 230.604, 230.173, 229.901, 229.782, 229.783, 230.012, 230.297, 230.636, 231.014, 231.332, 231.624, 232.133, 232.675, 232.946, 233.200, 233.263, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, 228.811, 229.545, 229.672, 229.654, 229.673, 229.844, 229.775, 229.752, 229.720, 229.665, 229.865, 230.062, 230.361, 230.892, 231.327, 231.371, 231.601, 232.128, 232.406, 232.239, 231.579, 230.796, 229.838, 229.665, 229.838, 229.989, 230.287, 230.556, 230.748, 231.032, 231.340, 231.688, 232.359, 231.629, 232.837, 233.399, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, 229.411, 229.853, 229.878, 229.941, 230.074, 230.200, 230.074, 230.121, 230.098, 230.029, 230.321, 230.423, 231.036, 231.679, 231.639, 231.568, 231.794, 232.353, 233.021, 232.415, 231.845, 230.873, 230.297, 230.052, 230.130, 230.280, 230.525, 230.691, 230.780, 231.015, 231.347, 231.823, 232.150, 231.212, 231.973, 233.366, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, 229.015, 229.750, 230.098, 230.106, 230.156, 230.216, 230.343, 230.335, 230.344, 230.194, 230.453, 231.241, 231.157, 231.663, 232.128, 231.801, 231.750, 232.038, 232.593, 233.021, 232.871, 232.264, 231.292, 230.756, 230.448, 230.336, 230.430, 230.652, 230.731, 230.741, 230.930, 231.340, 232.143, 231.910, 230.891, 231.474, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, 229.356, 229.861, 230.154, 230.154, 230.266, 230.256, 230.453, 230.546, 230.468, 230.132, 230.229, 231.026, 231.564, 232.122, 232.301, 231.929, 231.916, 232.237, 232.627, 233.283, 233.139, 232.595, 231.777, 231.275, 230.810, 230.519, 230.495, 230.667, 230.769, 230.747, 230.914, 231.395, 232.315, 231.694, 231.106, 231.019, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, 229.284, 229.782, 230.309, 230.532, 230.477, 230.400, 230.315, 230.469, 230.565, 230.570, 230.306, 230.136, 230.946, 232.093, 232.388, 232.400, 232.101, 232.074, 232.394, 232.770, 233.378, 233.315, 232.849, 232.399, 231.629, 231.103, 230.724, 230.630, 230.715, 230.825, 230.905, 231.104, 231.654, 232.538, 231.903, 230.977, 231.038, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, 229.728, 230.158, 230.691, 230.964, 230.864, 230.677, 230.405, 230.499, 230.585, 230.652, 230.626, 230.471, 231.051, 232.228, 232.394, 232.509, 232.282, 232.224, 232.485, 232.810, 233.293, 233.615, 233.259, 232.755, 232.272, 231.691, 231.160, 230.881, 230.928, 231.055, 231.175, 231.459, 231.932, 232.778, 233.203, 233.128, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, 230.267, 230.681, 230.913, 231.130, 231.141, 230.968, 230.565, 230.567, 230.676, 230.707, 230.730, 230.843, 231.497, 232.163, 232.510, 232.651, 232.501, 232.367, 232.450, 232.753, 233.260, 233.856, 233.683, 233.227, 232.716, 232.257, 231.861, 231.356, 231.286, 231.425, 231.537, 231.828, 232.240, 232.940, 233.361, 233.545, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, 230.610, 230.837, 231.140, 231.398, 231.567, 231.569, 231.380, 230.960, 230.967, 231.076, 230.945, 230.820, 231.104, 231.740, 232.097, 232.582, 232.738, 232.788, 232.509, 232.518, 232.677, 233.164, 233.677, 233.867, 233.528, 233.181, 232.817, 232.401, 232.122, 231.688, 231.686, 231.757, 231.963, 232.271, 232.658, 233.309, 233.583, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, 230.774, 231.172, 231.509, 231.869, 232.027, 232.003, 231.820, 231.266, 231.199, 231.344, 231.198, 231.065, 231.324, 231.781, 232.003, 232.257, 232.755, 232.849, 232.635, 232.659, 232.667, 233.063, 233.496, 233.789, 233.824, 233.674, 233.408, 232.935, 232.509, 232.016, 231.726, 231.639, 231.721, 231.997, 232.430, 232.852, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, 230.951, 231.274, 231.664, 232.039, 232.295, 232.324, 232.175, 231.508, 231.379, 231.388, 231.403, 231.412, 231.617, 231.845, 231.957, 232.202, 232.687, 232.875, 232.779, 232.777, 232.793, 233.016, 233.340, 233.602, 234.029, 234.026, 233.852, 233.342, 232.740, 232.273, 231.594, 231.380, 231.427, 231.743, 232.201, 232.659, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, 230.853, 231.172, 231.569, 231.953, 232.349, 232.635, 232.601, 231.927, 231.609, 231.571, 231.726, 231.907, 232.034, 232.050, 232.068, 232.256, 232.521, 233.172, 233.266, 232.890, 232.889, 232.995, 233.190, 233.440, 233.969, 234.113, 233.957, 233.481, 232.826, 232.274, 231.498, 231.214, 231.237, 231.522, 231.966, 232.432, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, 230.763, 231.016, 231.693, 232.285, 232.518, 232.820, 233.041, 232.479, 232.176, 232.065, 232.097, 232.193, 232.257, 232.319, 232.345, 232.425, 232.747, 233.289, 233.495, 233.208, 233.007, 232.993, 233.057, 233.204, 233.725, 234.145, 234.088, 233.592, 232.904, 232.290, 231.499, 231.259, 231.261, 231.489, 231.837, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, 231.420, 231.769, 232.416, 232.915, 233.089, 232.919, 233.197, 232.920, 232.759, 232.484, 232.249, 232.227, 232.391, 232.604, 232.691, 232.827, 233.021, 233.228, 233.536, 233.569, 233.153, 233.119, 233.126, 233.215, 233.830, 234.334, 234.332, 233.789, 233.030, 232.265, 231.633, 231.372, 231.341, 231.506, 231.705, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [231.775, 232.021, 232.652, 233.390, 233.712, 233.645, 233.445, 233.466, 233.353, 232.966, 232.557, 232.298, 232.290, 232.572, 232.880, 233.061, 233.157, 233.125, 233.180, 233.588, 233.695, 233.395, 233.276, 233.252, 233.423, 233.979, 234.641, 234.593, 233.908, 233.134, 232.285, 231.902, 231.641, 231.562, 231.639, 231.711, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [232.418, 232.866, 233.166, 233.501, 233.672, 233.712, 233.594, 233.661, 233.477, 232.922, 232.699, 232.526, 232.589, 232.881, 233.158, 233.347, 233.307, 233.284, 233.341, 233.711, 233.870, 233.646, 233.457, 233.427, 233.589, 234.261, 234.856, 234.664, 233.901, 233.205, 232.619, 232.321, 232.115, 232.044, 231.926, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [233.605, 233.972, 234.009, 233.991, 233.833, 233.708, 233.737, 233.638, 233.517, 233.059, 233.030, 232.952, 233.032, 233.261, 233.515, 233.703, 233.647, 233.797, 233.873, 234.188, 234.324, 234.125, 233.633, 233.624, 233.674, 234.352, 234.902, 234.735, 234.083, 233.435, 233.015, 232.835, 232.706, 232.556, 232.374, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [234.615, 234.663, 234.503, 234.245, 234.094, 233.728, 233.616, 233.616, 233.561, 233.474, 233.368, 233.355, 233.426, 233.648, 233.978, 234.160, 234.169, 234.146, 234.185, 234.620, 234.643, 234.399, 233.854, 233.822, 233.809, 234.518, 234.908, 234.767, 234.303, 233.701, 233.464, 233.377, 233.198, 233.007, 232.763, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [234.880, 234.685, 234.386, 234.089, 233.790, 233.619, 233.672, 233.606, 233.680, 233.845, 233.567, 233.558, 233.625, 233.962, 234.184, 234.264, 234.365, 234.327, 234.350, 234.786, 234.864, 234.635, 234.160, 234.027, 233.988, 234.499, 234.912, 234.799, 234.477, 233.949, 233.828, 233.749, 233.631, 233.449, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [234.917, 234.739, 234.502, 234.094, 233.797, 233.714, 233.726, 233.670, 233.865, 233.904, 233.547, 233.452, 233.609, 233.957, 234.199, 234.279, 234.397, 234.326, 234.320, 234.771, 234.949, 234.857, 234.530, 234.225, 234.172, 234.724, 235.041, 234.912, 234.628, 234.114, 233.981, 233.892, 233.844, 233.726, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [234.840, 234.767, 234.632, 234.287, 233.852, 233.741, 233.507, 233.827, 233.989, 233.948, 233.667, 233.412, 233.634, 233.978, 234.054, 234.126, 234.258, 234.287, 234.258, 234.717, 234.928, 235.068, 234.802, 234.414, 234.370, 235.058, 235.355, 235.156, 234.723, 234.154, 233.995, 233.907, 233.845, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, 234.576, 234.562, 234.296, 233.917, 233.674, 233.605, 233.944, 234.130, 234.079, 233.977, 234.007, 234.128, 234.170, 234.183, 234.315, 234.329, 234.375, 234.513, 234.818, 235.030, 235.211, 235.028, 234.595, 234.606, 235.082, 235.645, 235.370, 234.857, 234.233, 234.102, 233.918, 233.867, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, 235.133, 234.874, 234.649, 234.365, 233.981, 234.008, 234.141, 234.122, 234.164, 234.327, 234.662, 234.425, 234.421, 234.422, 234.478, 234.645, 234.947, 235.094, 235.213, 235.337, 235.370, 235.183, 234.762, 234.779, 235.146, 235.671, 235.412, 234.953, 234.450, 234.162, 233.948, 233.830, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, 235.464, 235.407, 235.178, 234.878, 234.622, 234.423, 234.227, 234.037, 234.362, 234.767, 234.946, 235.012, 234.972, 234.942, 235.037, 235.323, 235.465, 235.472, 235.535, 235.551, 235.521, 235.330, 234.913, 234.927, 235.076, 235.571, 235.482, 235.180, 234.837, 234.185, 233.884, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, 235.881, 235.641, 235.381, 235.174, 234.927, 234.631, 234.385, 234.446, 234.921, 235.122, 235.144, 235.264, 235.363, 235.379, 235.514, 235.602, 235.584, 235.608, 235.623, 235.606, 235.457, 235.076, 235.055, 235.125, 235.387, 235.443, 235.189, 234.880, 234.228, 233.910, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, 235.898, 235.688, 235.627, 235.438, 235.164, 235.073, 235.164, 235.398, 235.144, 235.440, 235.578, 235.557, 235.624, 235.679, 235.749, 235.743, 235.741, 235.706, 235.710, 235.570, 235.370, 235.204, 235.253, 235.361, 235.540, 235.367, 235.058, 234.590, 234.171, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, 236.201, 236.029, 236.044, 235.897, 236.000, 235.894, 235.891, 235.474, 235.819, 235.661, 235.739, 235.770, 235.918, 235.891, 235.817, 235.709, 235.734, 235.665, 235.805, 235.668, 235.355, 235.388, 235.625, 235.614, 235.773, 235.459, 235.041, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, 236.565, 236.454, 236.648, 236.644, 236.729, 236.451, 236.129, 235.979, 235.638, 235.598, 235.927, 236.098, 236.024, 235.865, 235.806, 235.830, 235.861, 236.010, 235.853, 235.553, 235.553, 235.720, 235.780, 236.012, 235.773, 235.337, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, 236.817, 237.026, 237.210, 237.295, 236.932, 236.538, 236.237, 236.043, 235.932, 235.983, 236.063, 236.160, 236.175, 236.148, 236.208, 236.230, 236.168, 236.019, 235.995, 235.702, 235.837, 235.886, 236.021, 235.928, 235.669, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, 237.499, 237.512, 237.200, 236.893, 236.638, 236.541, 236.551, 236.578, 236.413, 236.316, 236.387, 236.315, 236.314, 236.368, 236.295, 236.194, 236.177, 235.990, 235.916, 235.984, 235.851, 236.000, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, 237.308, 237.152, 237.078, 236.868, 236.919, 237.062, 237.118, 237.040, 236.750, 236.551, 236.754, 236.643, 236.618, 236.525, 236.391, 236.366, 236.397, 236.054, 236.090, 236.117, 236.255, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, 237.042, 237.107, 237.372, 237.526, 237.536, 237.406, 237.210, 236.889, 236.745, 236.810, 236.761, 236.706, 236.570, 236.413, 236.441, 236.585, 236.272, 236.320, 236.305, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, 237.482, 237.780, 237.860, 237.799, 237.497, 237.260, 236.957, 237.002, 236.905, 236.569, 236.485, 236.469, 236.492, 236.677, 236.674, 236.533, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 238.205, 238.101, 237.759, 237.461, 237.177, 237.223, 236.890, 236.745, 236.682, 236.674, 236.698, 236.745, 237.063, 236.797, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 237.997, 237.582, 237.385, 237.339, 237.254, 236.954, 236.865, 236.858, 236.865, 236.912, 237.233, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 237.413, 237.324, 237.488, 237.286, 237.014, 237.005, 237.074, 237.354, 237.519, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 237.419, 237.511, 237.452, 237.469, 237.542, 237.626, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 237.636, 237.638, 237.703, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
  ]
};

// prettier-ignore
const HeightMap_Hole_7 = {
  minX:-76,
  maxX:400,
  minZ:576,
  maxZ:680,
  step:4,
h:[
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,222.274,221.763,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,222.296,222.169,222.128,221.724,221.287,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,222.700,222.801,222.155,222.012,221.427,220.891,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,223.102,223.047,223.082,222.548,222.309,221.440,221.141,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,223.324,223.293,223.236,222.786,222.551,221.639,221.311,220.802,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,223.482,223.457,223.289,223.218,222.660,221.814,221.266,220.872,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,223.600,223.500,223.394,223.314,222.727,222.066,221.281,220.891,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,224.027,223.639,223.388,223.342,222.619,222.226,221.316,220.921,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,224.261,223.719,223.347,223.206,222.550,222.268,221.323,220.914,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,223.402,224.186,223.829,223.110,222.707,222.387,222.079,221.189,220.828,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,224.157,224.193,223.768,223.044,222.415,222.008,221.503,220.907,220.606,219.874],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,224.186,224.349,223.885,223.057,222.260,221.846,221.396,220.818,220.508,219.821],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,224.422,224.689,224.183,223.180,222.228,221.801,221.402,220.938,220.557,219.869],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,224.594,224.822,224.260,223.179,222.399,222.082,221.621,221.262,220.712,220.055],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,224.184,224.334,224.296,223.720,222.901,222.368,222.185,221.821,221.592,221.166,220.399],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,224.349,223.910,223.576,223.051,222.572,222.202,222.282,221.903,221.535,221.280,220.535],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,223.993,223.455,223.161,222.764,222.471,221.982,222.042,221.482,221.470,221.174,220.549],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,223.641,223.328,223.135,222.717,222.456,221.965,221.878,221.400,221.513,221.142,220.617],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,223.900,223.648,223.247,222.819,222.443,222.066,222.091,221.848,221.600,221.183,220.721],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,224.129,223.957,223.531,223.000,222.478,222.037,222.131,221.593,221.635,221.326,220.973],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,223.914,224.334,224.068,223.736,223.229,222.601,222.115,222.215,221.721,221.800,221.656,221.420],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,224.222,224.501,224.236,223.901,223.387,222.732,222.195,222.462,221.995,222.055,222.024,221.730],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,224.271,224.501,224.327,223.988,223.450,222.860,222.419,222.414,222.416,222.193,222.053,221.732],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,224.223,224.329,224.196,224.004,223.482,222.969,222.509,222.430,222.439,222.268,222.084,221.621],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,224.319,224.391,224.240,223.995,223.357,222.828,222.440,222.376,222.414,222.331,222.178,221.567],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,224.282,224.280,224.096,223.819,223.245,222.746,222.354,222.391,222.385,222.475,222.311,221.713],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,223.098,223.767,223.815,223.611,223.441,222.969,222.589,222.416,222.415,222.286,222.566,222.303,221.753],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,223.048,223.624,223.716,223.324,223.031,222.708,222.560,222.650,222.503,222.306,222.440,222.060,221.601],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,223.096,223.740,223.702,223.112,222.716,222.569,222.649,222.826,222.707,222.392,222.352,221.981,221.445],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,223.078,223.699,223.480,222.837,222.544,222.622,222.632,222.819,222.832,222.559,222.267,222.155,221.446],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,222.971,223.488,223.212,222.647,222.520,222.740,222.739,222.922,222.866,222.707,222.360,222.246,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,222.396,222.912,223.291,223.150,222.765,222.740,222.926,222.889,223.086,223.039,222.834,222.495,222.441,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,222.568,222.915,223.268,223.251,223.047,223.040,223.113,223.017,223.166,223.166,222.957,222.870,222.704,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,222.829,223.090,223.411,223.467,223.309,223.255,223.271,223.196,223.268,223.237,223.117,222.892,222.667,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,223.199,223.423,223.713,223.807,223.655,223.492,223.393,223.253,223.316,223.254,223.079,222.772,222.580,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,223.640,223.875,224.113,224.249,223.927,223.696,223.624,223.537,223.260,223.205,223.032,222.755,222.548,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,224.107,224.393,224.901,224.832,224.333,223.927,223.735,223.593,223.460,223.324,223.191,222.947,222.377,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,224.236,224.416,224.794,225.168,225.133,224.692,224.321,223.816,223.585,223.418,223.190,223.001,222.689,222.359,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,224.530,224.642,224.809,224.950,224.944,224.642,224.243,223.915,223.577,223.356,223.120,222.859,222.424,222.390,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,224.841,224.927,224.782,224.769,224.621,224.446,224.218,223.972,223.617,223.316,223.063,222.550,222.330,222.457,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,225.112,225.103,224.970,224.902,224.684,224.444,224.275,223.988,223.687,223.333,222.998,222.510,222.391,222.545,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,225.151,225.221,225.126,224.953,224.764,224.209,223.666,223.194,222.706,222.251,221.881,221.662,221.949,222.634,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,225.246,225.241,225.212,224.969,224.534,224.099,223.627,223.121,222.616,222.137,221.690,221.294,220.930,222.708,null],
  [null,null,null,null,null,null,null,null,null,null,null,225.268,225.367,225.293,225.313,224.985,224.620,224.524,224.290,224.067,223.838,223.591,223.136,222.396,221.298,222.824,null],
  [null,null,null,null,null,null,null,null,null,null,null,225.610,225.533,225.344,225.354,225.115,224.786,224.578,224.315,224.099,223.893,223.657,223.449,222.856,222.593,222.938,null],
  [null,null,null,null,null,null,null,null,null,null,null,225.620,225.367,225.444,225.378,225.046,224.771,224.583,224.339,223.898,223.631,223.421,223.468,223.277,222.752,223.048,null],
  [null,null,null,null,null,null,null,null,null,null,null,225.555,225.422,225.459,225.325,225.116,224.849,224.508,224.059,223.853,223.656,223.484,223.343,223.411,222.885,223.151,null],
  [null,null,null,null,null,null,null,null,null,null,null,225.521,225.429,225.396,225.245,225.099,224.797,224.669,224.055,223.902,223.752,223.662,223.435,223.479,223.176,223.254,null],
  [null,null,null,null,null,null,null,null,null,null,null,225.444,225.409,225.309,225.150,225.036,224.749,224.508,224.098,223.950,223.807,223.657,223.442,223.515,223.310,223.357,null],
  [null,null,null,null,null,null,null,null,null,null,225.276,225.312,225.355,225.239,225.073,224.916,224.867,224.618,224.268,223.964,223.839,223.689,223.506,223.384,223.549,223.467,null],
  [null,null,null,null,null,null,null,null,null,null,225.141,225.138,225.338,225.190,225.027,224.859,224.794,224.620,224.290,223.966,223.862,223.712,223.451,223.245,223.687,223.586,null],
  [null,null,null,null,null,null,null,null,null,null,225.095,225.080,225.277,225.134,225.010,224.828,224.701,224.558,224.233,223.941,223.823,223.580,223.396,223.299,223.822,null,null],
  [null,null,null,null,null,null,null,null,null,null,225.017,225.016,225.221,225.047,225.017,224.843,224.615,224.461,224.309,223.831,223.665,223.498,223.380,223.393,223.927,null,null],
  [null,null,null,null,null,null,null,null,null,null,224.946,224.971,225.205,225.039,225.061,224.890,224.546,224.359,224.127,223.713,223.549,223.491,223.475,223.558,224.034,null,null],
  [null,null,null,null,null,null,null,null,null,224.890,225.023,225.016,224.966,224.952,225.121,224.960,224.445,224.210,223.907,223.650,223.592,223.563,223.608,223.892,224.140,null,null],
  [null,null,null,null,null,null,null,null,null,224.717,224.703,224.695,224.794,224.797,225.186,225.047,224.395,224.218,223.792,223.698,223.680,223.750,223.723,224.241,224.245,null,null],
  [null,null,null,null,null,null,null,null,null,224.756,224.770,224.739,224.810,224.858,225.264,225.142,224.477,224.294,223.911,223.863,223.926,224.004,224.121,224.400,224.353,null,null],
  [null,null,null,null,null,null,null,null,null,224.897,224.920,224.873,225.056,224.993,225.351,225.237,224.682,224.401,224.149,224.093,224.226,224.281,224.553,224.683,224.464,null,null],
  [null,null,null,null,null,null,null,null,null,225.167,225.198,225.143,225.356,225.223,225.487,225.340,225.137,224.846,224.681,224.441,224.526,224.564,224.858,224.926,224.574,null,null],
  [null,null,null,null,null,null,null,null,null,225.583,225.601,225.552,225.748,225.553,225.606,225.435,225.474,225.245,224.968,224.786,224.745,224.722,224.984,225.006,224.677,null,null],
  [null,null,null,null,null,null,null,null,225.774,225.728,225.741,225.706,225.973,225.800,225.683,225.524,225.749,225.420,225.118,224.851,224.786,224.781,225.003,224.979,224.786,null,null],
  [null,null,null,null,null,null,null,null,225.901,225.853,225.839,225.939,226.130,225.973,225.767,225.623,225.846,225.576,225.363,225.313,225.179,225.085,225.321,225.210,224.889,null,null],
  [null,null,null,null,null,null,null,null,225.988,225.981,226.036,226.225,226.218,226.104,225.830,225.826,225.957,225.664,225.405,225.395,225.301,225.229,225.420,225.291,224.984,null,null],
  [null,null,null,null,null,null,null,null,226.098,226.097,226.155,226.445,226.374,226.055,225.870,226.123,226.038,225.772,225.497,225.420,225.356,225.275,225.333,225.392,225.086,null,null],
  [null,null,null,null,null,null,null,null,226.248,226.215,226.296,226.533,226.441,226.060,225.962,226.232,226.137,225.770,225.523,225.506,225.428,225.317,225.223,225.455,225.181,null,null],
  [null,null,null,null,null,null,null,null,226.657,226.392,226.628,226.596,226.305,226.092,226.306,226.273,226.178,225.954,225.654,225.555,225.497,225.412,225.400,225.544,225.269,null,null],
  [null,null,null,null,null,null,null,226.634,226.872,226.581,226.732,226.628,226.305,226.144,226.462,226.321,226.216,226.051,225.670,225.593,225.554,225.499,225.460,225.714,225.356,null,null],
  [null,null,null,null,null,null,null,226.748,227.032,226.706,226.851,226.694,226.367,226.307,226.438,226.334,226.210,226.037,225.665,225.650,225.641,225.602,225.638,225.862,225.443,null,null],
  [null,null,null,null,null,null,null,227.165,226.944,226.963,227.040,226.784,226.447,226.486,226.532,226.367,226.279,226.048,225.806,225.782,225.719,225.664,225.641,225.873,225.530,null,null],
  [null,null,null,null,null,null,null,227.330,227.174,227.322,227.198,226.891,226.542,226.587,226.549,226.452,226.281,225.862,225.824,225.924,225.823,225.691,225.675,225.924,225.617,null,null],
  [null,null,null,null,null,null,null,227.380,227.396,227.409,227.332,227.022,226.636,226.650,226.520,226.431,226.211,225.886,225.894,225.973,225.948,225.901,225.953,226.221,225.696,null,null],
  [null,null,null,null,null,null,227.767,227.647,227.659,227.679,227.483,227.088,226.748,226.959,226.858,226.488,226.052,225.957,225.935,226.043,226.003,225.940,225.979,226.209,225.783,null,null],
  [null,null,null,null,null,null,228.067,227.925,228.048,227.909,227.665,227.139,226.876,227.076,226.810,226.297,226.157,226.151,226.061,226.106,226.004,225.963,226.019,226.295,null,null,null],
  [null,null,null,null,null,null,228.527,228.507,228.350,228.192,227.860,227.300,227.076,227.063,226.567,226.375,226.288,226.225,226.139,226.122,226.022,225.982,226.224,226.365,null,null,null],
  [null,null,null,null,null,null,228.977,228.825,228.564,228.252,227.931,227.458,227.321,226.961,226.605,226.446,226.343,226.290,226.289,226.319,226.264,226.210,226.497,226.365,null,null,null],
  [null,null,null,null,null,null,229.251,229.106,228.839,228.606,227.945,227.601,227.521,226.975,226.699,226.510,226.415,226.361,226.390,226.467,226.421,226.344,226.557,226.285,null,null,null],
  [null,null,null,null,null,null,229.426,229.256,228.973,228.705,228.076,227.778,227.478,227.002,226.747,226.548,226.470,226.535,226.464,226.502,226.526,226.702,226.759,226.272,null,null,null],
  [null,null,null,null,null,229.525,229.487,229.449,229.153,228.615,228.211,228.032,227.541,227.033,226.801,226.566,226.525,226.440,226.432,226.509,226.576,226.888,226.879,226.562,null,null,null],
  [null,null,null,null,null,229.826,229.767,229.563,229.044,228.633,228.389,228.130,227.554,227.071,226.787,226.567,226.533,226.432,226.415,226.433,226.792,226.754,226.904,226.675,null,null,null],
  [null,null,null,null,null,229.766,229.596,229.287,228.850,228.715,228.284,228.060,227.329,226.983,226.677,226.495,226.468,226.384,226.392,226.503,226.278,225.407,226.718,226.716,null,null,null],
  [null,null,null,null,null,230.026,229.756,229.664,229.552,229.023,228.371,228.100,227.308,226.929,226.638,226.440,226.346,226.281,226.266,226.425,225.875,225.601,226.559,226.738,null,null,null],
  [null,null,null,null,null,230.654,230.585,230.599,230.272,229.585,228.925,228.217,227.341,226.962,226.702,226.527,226.400,226.352,226.321,226.459,225.692,225.491,226.416,226.791,null,null,null],
  [null,null,null,null,null,231.018,230.895,230.755,230.412,229.635,229.035,228.279,227.457,227.090,226.883,226.726,226.644,226.563,226.463,226.588,225.554,225.247,226.477,226.849,null,null,null],
  [null,null,null,null,229.764,230.466,230.483,230.202,229.989,229.416,229.100,228.520,228.016,227.356,227.220,227.139,227.029,226.927,226.679,226.777,226.513,225.586,226.664,226.969,null,null,null],
  [null,null,null,null,228.067,229.327,230.117,229.917,229.639,229.113,229.067,228.538,228.199,227.557,227.378,227.324,227.314,227.275,227.017,227.106,225.907,225.809,227.137,227.048,null,null,null],
  [null,null,null,null,227.694,227.995,229.456,229.990,229.685,229.461,229.076,228.475,228.049,227.571,227.504,227.460,227.452,227.425,227.324,227.294,226.772,226.260,227.604,227.166,null,null,null],
  [null,null,null,null,228.296,228.023,228.875,229.851,229.717,229.504,229.116,228.534,228.098,227.596,227.577,227.616,227.687,227.625,227.564,227.994,227.233,227.759,227.839,null,null,null,null],
  [null,null,null,null,228.864,229.136,229.702,230.020,230.346,229.971,229.292,228.685,227.902,227.688,227.689,227.830,227.893,227.829,227.783,228.019,228.131,228.047,227.973,null,null,null,null],
  [null,null,null,null,228.335,228.968,229.484,230.002,230.634,230.359,229.412,228.722,227.999,227.769,227.949,228.060,228.105,228.019,228.003,228.027,228.271,228.311,227.875,null,null,null,null],
  [null,null,null,227.823,227.855,228.399,229.008,229.482,229.728,229.829,229.488,228.793,228.111,227.864,228.146,228.210,228.224,228.201,228.180,228.192,228.422,228.325,227.848,null,null,null,null],
  [null,null,null,227.743,227.735,227.984,228.655,228.877,229.003,229.391,229.376,228.733,228.339,228.112,228.264,228.312,228.350,228.352,228.434,228.534,228.757,228.378,null,null,null,null,null],
  [null,null,null,227.776,227.752,228.292,228.909,228.886,228.700,228.984,228.993,228.566,228.354,228.472,228.415,228.470,228.463,228.503,228.623,229.190,229.491,228.825,null,null,null,null,null],
  [null,null,null,227.957,227.910,228.517,228.971,228.917,228.699,228.818,228.956,228.766,228.758,228.746,228.909,228.951,228.967,229.336,229.358,229.803,230.113,229.157,null,null,null,null,null],
  [null,null,null,228.410,228.471,228.527,228.659,228.558,228.503,228.628,228.687,228.763,228.906,228.763,227.496,228.369,229.287,229.685,229.858,230.339,230.221,229.314,null,null,null,null,null],
  [null,null,229.032,228.968,228.883,228.834,228.722,228.550,228.462,228.462,228.486,228.636,228.873,228.568,227.507,227.775,229.521,229.753,230.395,230.960,230.360,229.411,null,null,null,null,null],
  [null,null,230.452,229.782,229.652,229.388,229.071,228.609,228.096,228.230,228.448,228.574,228.782,228.937,227.632,227.938,229.710,230.269,231.340,231.391,230.229,null,null,null,null,null,null],
  [null,null,232.741,231.881,230.801,230.027,229.418,228.087,227.373,227.170,228.524,228.292,228.423,228.951,227.911,227.857,229.622,230.572,231.645,231.269,230.012,null,null,null,null,null,null],
  [null,null,233.421,232.726,231.534,230.550,229.712,227.764,227.420,228.226,228.523,228.336,228.462,228.716,227.910,227.450,228.483,230.560,231.240,230.875,229.867,null,null,null,null,null,null],
  [null,null,233.835,233.095,231.956,230.936,229.673,227.483,227.405,228.812,228.428,228.448,228.590,228.738,228.520,227.212,227.869,230.556,231.206,230.714,229.766,null,null,null,null,null,null],
  [null,null,234.063,233.258,232.201,231.205,229.626,228.579,228.574,228.962,228.628,228.652,228.786,228.949,229.049,228.069,228.687,230.547,230.999,230.296,null,null,null,null,null,null,null],
  [null,234.287,233.977,233.236,232.302,231.371,230.211,229.527,229.417,228.959,228.842,228.866,228.983,229.143,229.590,229.715,230.047,230.839,230.799,229.851,null,null,null,null,null,null,null],
  [null,234.232,233.860,233.157,232.296,231.434,230.675,230.051,229.601,229.079,229.016,229.062,229.158,229.355,229.552,230.059,230.494,231.191,230.844,229.721,null,null,null,null,null,null,null],
  [null,234.168,233.726,233.030,232.217,231.418,230.694,229.853,229.412,229.229,229.190,229.268,229.426,229.624,229.798,230.045,230.665,230.963,230.676,229.759,null,null,null,null,null,null,null],
  [null,234.081,233.560,232.848,232.090,231.332,230.360,229.815,229.505,229.379,229.402,229.530,229.749,229.908,230.067,230.241,230.715,230.797,230.269,null,null,null,null,null,null,null,null],
  [null,233.955,233.363,232.620,231.854,231.067,230.281,229.830,229.571,229.514,229.592,229.743,229.949,230.114,230.280,230.416,230.815,230.891,229.942,null,null,null,null,null,null,null,null],
  [null,233.725,233.095,232.374,231.625,230.726,230.217,229.877,229.712,229.704,229.782,229.924,230.129,230.279,230.416,230.678,230.910,231.066,229.929,null,null,null,null,null,null,null,null],
  [233.935,233.414,232.793,232.113,231.425,230.620,230.225,229.965,229.893,229.901,229.963,230.082,230.225,230.388,230.526,230.929,231.029,230.976,230.013,null,null,null,null,null,null,null,null],
  [233.729,233.142,232.565,231.893,231.256,230.584,230.320,230.130,230.067,230.067,230.130,230.234,230.381,230.492,230.808,231.018,231.061,230.615,230.216,null,null,null,null,null,null,null,null],
  [233.523,233.017,232.448,231.873,231.310,230.922,230.479,230.336,230.297,230.290,230.374,230.455,230.552,230.617,230.952,231.118,231.080,230.446,null,null,null,null,null,null,null,null,null],
  [233.412,232.973,232.497,231.921,231.553,231.268,230.978,230.646,230.605,230.605,230.637,230.687,231.002,231.040,231.131,231.069,231.188,230.469,null,null,null,null,null,null,null,null,null],
  [233.371,232.975,232.631,232.270,231.867,231.632,231.450,231.347,231.287,231.261,231.172,231.362,231.311,231.149,231.124,231.130,231.205,230.542,null,null,null,null,null,null,null,null,null],
  [233.400,233.193,232.984,232.637,232.322,232.121,231.940,231.829,231.773,231.768,231.823,231.736,231.457,231.489,231.594,231.491,231.141,230.742,null,null,null,null,null,null,null,null,null],
  [233.443,233.328,233.190,233.014,232.801,232.709,232.427,232.411,232.335,232.390,232.480,232.310,232.207,232.134,232.082,231.874,231.347,null,null,null,null,null,null,null,null,null,null],
  [233.438,233.365,233.489,233.516,233.429,233.157,233.096,233.059,233.137,233.128,233.109,233.022,232.920,232.790,232.654,232.252,231.567,null,null,null,null,null,null,null,null,null,null],
  [233.326,233.605,233.891,233.992,233.973,233.791,233.755,233.851,233.981,234.060,234.065,233.853,233.614,233.422,233.148,232.629,231.748,null,null,null,null,null,null,null,null,null,null],
  [null,233.726,234.233,234.613,234.493,234.407,234.392,234.679,234.931,235.116,235.133,234.835,234.392,234.065,233.712,232.908,231.909,null,null,null,null,null,null,null,null,null,null],
  [null,null,234.469,234.785,234.860,234.692,234.829,235.210,235.838,236.020,236.048,235.633,235.127,234.786,234.174,233.307,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,234.989,235.001,235.125,235.538,236.169,236.486,236.481,236.066,235.615,235.382,234.732,233.751,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,235.390,235.887,236.298,236.585,236.566,236.184,235.796,235.544,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,236.502,236.491,236.253,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
  ]
};

// prettier-ignore
const HeightMap_Hole_8 = {
  minX:-240,
  maxX:136,
  minZ:400,
  maxZ:628,
  step:4,
  h:[
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,217.965,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,217.437,217.976,218.012,217.923,217.200,216.395,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,217.287,217.558,218.002,218.116,217.695,217.177,216.418,215.589,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,216.764,217.258,217.743,217.987,217.933,217.600,217.030,216.228,215.434,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,216.171,216.741,217.267,217.601,217.720,217.641,217.356,216.877,216.420,215.696,215.383],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,216.179,216.551,216.938,217.175,217.158,216.936,216.968,216.602,216.155,215.797,215.696],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,215.609,216.077,216.304,216.463,216.508,215.425,214.659,215.689,216.328,215.954,215.779,215.961],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,215.114,215.728,215.878,215.905,215.900,215.764,214.309,213.980,214.166,215.470,215.903,215.754,216.139],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,214.652,215.486,215.620,215.439,215.343,215.266,215.540,215.365,214.616,213.706,214.702,215.824,215.748,216.124],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,215.177,215.581,215.704,215.749,215.366,215.200,215.137,215.107,215.414,215.214,214.354,214.243,215.564,216.000,216.060],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,215.444,215.628,215.789,215.511,215.466,215.208,215.175,215.135,215.137,215.536,214.863,214.698,215.764,216.537,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,215.198,215.541,215.838,215.923,215.583,215.452,215.272,215.230,215.183,215.159,215.527,215.454,215.646,215.944,216.684,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,215.213,215.287,215.668,215.985,216.021,215.858,215.576,215.325,215.271,215.230,215.167,215.204,215.568,215.621,215.975,216.824,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,215.287,215.357,215.868,215.950,216.015,215.679,215.575,215.372,215.310,215.270,215.191,215.167,215.190,215.207,215.673,215.872,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,215.270,215.356,215.421,216.005,216.241,216.238,215.809,215.562,215.412,215.357,215.308,215.231,215.175,215.121,215.197,215.662,215.703,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,215.326,215.427,215.507,216.100,216.204,216.017,215.879,215.541,215.452,215.404,215.334,215.285,215.216,215.191,215.479,216.068,215.657,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,215.271,215.397,215.484,215.831,216.188,216.239,215.926,215.854,215.588,215.493,215.451,215.373,215.326,215.256,215.303,215.731,216.424,215.603,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,215.357,215.476,215.830,216.036,216.466,216.495,216.144,215.868,215.634,215.554,215.492,215.428,215.381,215.302,215.579,216.023,216.272,215.933,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,215.310,215.443,215.776,215.890,216.287,216.325,216.270,216.110,215.834,215.696,215.625,215.540,215.491,215.436,215.382,215.854,216.296,215.232,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,215.411,215.534,215.897,216.016,216.472,216.567,216.492,216.132,215.896,215.760,215.697,215.611,215.563,215.492,215.521,216.031,215.662,215.246,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,215.380,215.515,215.681,216.022,216.291,216.781,216.912,216.747,216.224,215.950,215.847,215.775,215.697,215.641,215.641,215.956,215.970,215.366,215.310,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,215.500,215.627,216.033,216.135,216.636,216.718,216.769,216.790,216.207,216.023,215.938,215.895,215.936,216.016,215.943,216.073,215.510,215.445,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,215.484,215.618,215.744,216.163,216.302,216.804,217.000,217.005,216.818,216.530,216.316,216.289,216.082,216.136,216.107,216.069,215.681,215.587,215.818,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,215.625,215.752,215.982,216.281,216.556,216.947,217.025,216.995,216.804,216.554,215.671,214.727,214.269,214.426,215.869,215.921,215.729,215.728,216.981,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,215.633,215.760,215.880,216.225,216.402,216.753,216.769,216.926,216.967,216.732,216.553,214.866,214.247,214.380,214.477,216.147,215.864,215.765,216.799,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,215.642,215.775,215.895,216.013,216.422,216.555,216.821,217.069,216.985,216.917,216.690,216.542,216.554,215.678,215.572,215.953,216.010,215.949,216.317,216.813,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,215.783,215.910,216.029,216.145,216.553,216.880,216.989,217.229,217.071,216.731,216.714,216.715,216.637,216.596,216.651,216.267,216.076,216.062,217.002,217.037,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,215.776,215.918,216.038,216.156,216.379,216.674,217.225,217.330,217.219,217.166,216.922,216.817,216.790,216.735,216.667,216.586,216.196,216.149,216.741,216.938,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,215.902,216.044,216.171,216.284,216.689,217.158,217.525,217.573,217.182,217.151,217.002,216.910,216.931,216.809,216.733,216.341,216.275,216.430,216.863,216.892,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,215.871,216.028,216.171,216.298,216.449,216.823,217.428,217.407,217.425,217.614,217.363,217.044,216.968,216.902,216.803,216.518,216.408,216.373,217.051,217.037,217.078,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,215.990,216.148,216.291,216.424,216.641,217.143,217.525,217.448,217.406,217.643,217.127,216.932,216.916,216.986,216.914,216.537,216.495,216.671,216.976,217.146,217.208,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,215.942,216.115,216.274,216.416,216.537,216.980,217.450,217.511,217.455,217.735,217.434,216.933,216.867,216.835,217.056,216.796,216.622,216.628,217.149,217.192,217.253,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,216.068,216.234,216.393,216.547,216.807,217.412,217.676,217.613,217.616,217.759,217.119,217.001,216.945,216.900,217.115,216.749,216.709,217.042,217.294,217.238,217.637,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,216.029,216.195,216.353,216.510,216.642,217.157,217.836,217.789,217.697,217.719,217.681,217.112,217.057,217.002,217.250,216.957,216.835,216.795,216.999,216.920,217.278,217.607,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,216.179,216.329,216.480,216.624,216.899,217.611,217.717,217.887,217.873,217.910,217.466,217.174,217.120,217.146,217.296,216.954,216.922,216.902,216.946,216.981,217.436,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,216.210,216.330,216.472,216.614,216.792,217.507,217.787,217.732,217.859,217.870,217.710,217.275,217.230,217.175,217.423,217.169,217.041,217.000,217.118,217.150,217.206,217.306,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,216.377,216.503,216.630,216.783,217.200,217.742,217.859,217.844,217.955,217.924,217.371,217.324,217.277,217.298,217.480,217.159,217.129,217.087,217.008,217.250,217.342,217.526,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,216.370,216.551,216.708,216.844,217.034,217.735,218.013,217.872,218.130,218.122,217.486,217.392,217.373,217.318,217.565,217.391,217.238,217.310,217.255,217.254,217.392,217.603,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,216.408,216.543,216.733,216.930,217.113,217.394,218.073,218.183,217.960,218.194,217.625,217.460,217.460,217.412,217.365,217.610,217.349,217.325,217.447,217.180,217.424,217.594,217.885,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,216.600,216.780,216.971,217.200,217.441,217.802,218.188,218.189,218.346,218.080,217.532,217.539,217.522,217.452,217.643,217.643,217.428,217.413,217.529,217.512,217.769,218.069,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,216.724,216.914,217.119,217.310,217.547,217.829,218.339,218.431,218.180,218.418,217.684,217.641,217.626,217.586,217.499,217.744,217.573,217.507,217.500,217.425,217.565,218.065,218.132,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,217.048,217.326,217.499,217.697,217.941,218.339,218.624,218.707,218.271,218.384,217.742,217.759,217.721,217.673,217.578,217.823,217.589,217.586,217.513,217.588,217.702,217.893,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,217.379,217.392,217.721,217.924,218.328,218.630,218.841,218.998,218.705,218.682,218.172,217.885,217.863,217.831,217.775,217.689,217.926,217.707,217.658,217.595,217.554,217.863,218.054,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,216.867,217.176,218.052,218.626,218.796,219.049,219.169,219.186,218.899,218.624,218.344,218.015,217.981,217.949,217.894,217.824,218.053,217.755,217.738,217.856,217.603,217.914,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,216.588,216.753,216.715,218.155,218.967,219.136,219.307,219.441,219.086,219.065,218.541,218.531,218.147,218.101,218.060,218.014,217.958,218.182,217.823,217.818,217.910,217.775,218.053,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,218.092,218.155,218.670,219.250,219.525,219.591,219.613,219.427,219.103,219.068,218.743,218.572,218.274,218.218,218.163,218.116,218.073,218.269,217.894,217.928,218.061,217.977,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,220.087,219.997,219.665,219.681,219.930,220.148,220.275,220.044,219.510,219.228,219.092,218.899,218.494,218.400,218.321,218.258,218.210,218.449,218.293,217.973,218.060,218.227,218.314,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,221.781,221.611,220.990,220.613,220.755,220.842,220.715,220.369,219.623,219.525,219.235,218.803,218.629,218.512,218.424,218.345,218.504,218.535,218.234,218.045,218.234,218.456,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,220.266,222.504,222.888,222.117,221.561,221.493,221.321,221.036,220.312,219.874,219.652,219.397,218.899,218.741,218.614,218.511,218.431,218.669,218.613,218.184,218.131,218.467,218.699,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,219.873,221.740,223.040,222.999,222.553,222.052,221.430,220.915,220.373,220.116,219.767,219.270,219.016,218.843,218.709,218.591,218.520,218.740,218.676,218.230,218.210,218.699,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,219.993,220.650,222.073,222.963,223.791,223.022,222.192,221.309,220.494,220.341,220.121,219.870,219.325,219.104,218.931,218.788,218.669,218.696,218.803,218.720,218.314,218.299,218.785,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,220.367,221.823,222.861,223.656,224.037,222.713,222.644,221.661,220.415,220.413,220.181,219.921,219.399,219.183,219.009,218.859,218.733,218.750,218.844,218.681,218.401,218.430,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,219.481,220.826,222.437,223.279,222.889,222.809,222.329,222.186,221.440,220.665,220.456,220.214,219.981,219.740,219.246,219.073,218.922,218.789,218.871,218.882,218.629,218.488,218.676,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,218.651,219.460,220.399,221.561,221.734,221.706,221.876,221.870,221.654,221.136,220.749,220.503,219.763,218.980,219.734,219.309,219.135,218.978,218.858,218.956,218.899,218.601,218.566,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,219.303,219.904,220.748,221.259,221.169,221.455,221.674,221.562,221.184,220.872,220.755,220.418,219.273,218.711,219.750,219.349,219.182,219.041,218.914,219.004,218.913,218.661,218.623,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,220.969,220.180,220.636,221.292,221.464,221.452,221.586,221.519,221.673,221.536,221.007,220.795,220.286,219.366,219.326,219.787,219.396,219.231,219.096,218.969,218.961,218.888,218.693,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,221.904,221.410,221.283,221.304,221.310,221.297,221.342,221.376,221.424,221.332,221.031,220.819,220.123,218.873,219.723,219.752,219.436,219.286,219.158,219.008,219.118,218.830,218.708,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,223.139,222.628,222.475,221.854,221.547,221.382,221.081,220.976,221.160,221.301,221.220,221.071,220.842,220.376,218.963,219.861,219.784,219.476,219.334,219.192,219.109,219.120,218.781,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,223.100,223.104,222.859,222.194,221.941,221.906,221.103,220.656,220.937,221.223,221.248,221.102,220.858,220.533,220.135,220.096,219.679,219.523,219.381,219.223,219.340,219.100,218.780,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,224.157,223.682,223.282,222.942,222.490,222.316,222.208,221.650,221.192,221.117,221.293,221.285,221.127,220.853,220.359,220.277,220.149,219.705,219.563,219.420,219.261,219.348,219.023,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,225.111,224.700,223.946,223.453,222.896,222.445,222.046,221.883,221.648,221.487,221.451,221.348,220.953,219.830,219.391,220.208,220.036,219.744,219.610,219.467,219.439,219.356,218.932,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,227.132,226.255,225.259,224.293,223.660,223.041,222.656,222.277,221.988,221.790,221.665,221.529,221.042,219.961,219.250,219.221,220.378,219.918,219.791,219.664,219.506,219.568,219.351,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,226.750,226.079,225.225,224.383,223.790,223.343,222.797,222.421,222.093,221.852,221.720,221.544,220.619,219.887,220.336,220.583,220.121,219.950,219.830,219.712,219.567,219.649,219.294,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,227.149,225.865,225.613,225.191,224.648,223.831,223.348,222.944,222.508,222.192,221.955,221.782,221.609,221.301,221.095,220.684,220.345,220.147,219.990,219.885,219.767,219.863,219.681,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,227.009,225.741,225.602,225.281,224.481,223.744,223.346,222.919,222.507,222.183,221.981,221.726,221.436,221.131,220.874,220.598,220.384,220.202,220.060,219.943,219.839,219.964,219.710,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,228.819,227.772,226.489,225.930,225.145,224.491,223.877,223.389,222.908,222.517,222.224,221.793,221.515,221.333,221.127,220.859,220.629,220.425,220.250,220.115,220.013,220.098,220.020,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,229.975,229.079,227.737,226.781,225.856,224.813,224.233,223.825,223.230,222.561,222.515,221.990,221.735,221.530,221.341,221.118,220.851,220.653,220.464,220.298,220.179,220.240,220.258,220.022,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,230.168,229.719,227.997,226.769,225.648,224.645,224.071,223.580,223.113,222.807,222.215,221.973,221.750,221.546,221.341,221.089,220.858,220.676,220.503,220.344,220.318,220.440,220.321,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,229.814,229.366,229.148,227.864,226.755,225.654,224.707,224.187,223.578,223.086,222.362,222.194,221.981,221.760,221.555,221.333,221.063,220.866,220.692,220.534,220.394,220.596,220.504,220.307,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,229.238,228.905,228.561,227.722,226.721,225.477,224.684,224.005,223.467,223.059,222.473,222.219,221.989,221.775,221.561,221.311,221.062,220.874,220.708,220.566,220.741,220.655,220.560,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,229.842,229.281,228.872,228.059,227.176,226.738,225.521,224.583,223.912,223.428,223.022,222.444,222.225,222.003,221.790,221.549,221.278,221.070,220.890,220.733,220.795,220.805,220.856,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,230.227,229.172,228.604,227.718,226.446,226.288,225.148,224.417,223.810,223.299,222.974,222.441,222.242,222.019,221.840,221.581,221.280,221.087,220.915,220.994,220.967,221.062,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,229.626,229.735,228.808,228.617,227.382,225.983,225.717,224.947,224.201,223.584,223.271,222.944,222.374,222.256,222.017,221.853,221.548,221.331,221.137,221.257,221.213,221.279,221.136,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,228.996,228.889,228.694,228.110,226.975,225.541,225.156,224.762,224.059,223.577,223.251,222.936,222.778,222.305,222.139,221.906,221.639,221.432,221.494,221.563,221.483,221.356,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,227.302,228.144,228.084,228.047,227.419,226.512,225.486,225.042,224.171,223.706,223.405,223.168,222.935,222.793,222.601,222.238,222.190,221.986,221.808,221.815,221.689,221.561,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,226.813,227.202,227.246,227.097,226.476,225.859,225.291,224.763,224.147,223.770,223.346,223.105,223.058,222.910,222.677,222.554,222.321,222.138,222.005,221.895,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,225.697,226.115,226.409,226.302,225.957,225.504,224.985,224.600,224.191,223.850,223.605,223.429,223.269,223.104,222.997,222.821,222.637,222.406,222.185,222.082,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,225.374,225.323,225.523,225.368,224.928,224.608,224.234,224.025,223.852,223.694,223.527,223.396,223.309,223.177,223.023,222.929,222.459,222.329,222.234,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,224.628,224.583,224.600,224.814,224.562,224.194,223.916,223.775,223.607,223.754,223.506,223.493,223.309,223.276,223.193,223.049,222.528,222.455,222.377,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,223.670,223.996,223.764,224.087,224.178,224.088,223.832,223.681,223.459,223.579,223.496,223.458,223.449,223.348,223.099,222.891,222.614,222.558,222.496,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,223.171,223.294,223.062,223.670,223.587,223.601,223.492,223.658,223.527,223.481,223.419,223.326,223.330,223.220,222.854,222.684,222.651,222.671,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,222.080,222.519,222.855,223.031,223.332,223.204,223.331,223.316,223.335,223.552,223.406,223.277,223.279,223.238,222.839,222.746,222.709,222.852,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,221.965,222.100,222.532,222.981,222.998,223.195,223.286,223.238,223.127,223.210,223.234,223.159,223.119,222.876,222.796,222.772,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,221.416,221.620,222.174,222.555,222.494,222.955,223.363,223.349,223.102,223.021,223.047,223.090,223.019,222.884,222.842,222.852,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,221.623,221.856,222.162,222.038,222.557,223.116,223.333,223.324,223.079,222.856,222.758,222.975,222.916,222.890,222.898,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,221.586,221.879,222.021,221.751,222.278,222.693,223.151,223.290,223.179,222.952,222.721,222.984,222.963,222.985,222.922,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,221.795,221.949,221.926,222.035,222.352,222.909,223.121,223.125,222.960,222.807,223.002,223.026,223.027,223.329,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,221.883,221.997,221.889,222.026,222.454,222.622,222.707,222.944,222.922,222.906,223.054,223.117,223.081,223.394,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,221.928,221.872,222.015,222.445,222.723,222.867,222.837,222.883,222.828,223.083,222.996,223.120,223.374,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,222.114,222.194,222.385,222.740,222.897,222.975,222.883,222.881,222.788,222.961,223.209,223.295,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [222.166,222.501,222.645,222.724,222.929,222.976,222.897,222.880,222.820,222.775,222.943,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,222.658,222.823,222.750,222.843,222.847,222.850,222.784,222.930,222.883,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,222.564,222.723,222.563,222.650,222.637,222.889,223.031,222.903,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,222.559,222.695,222.759,222.973,222.963,222.918,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,223.228,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
  ]
};

// prettier-ignore
const HeightMap_Hole_9 = {
  minX:500,
  maxX:836,
  minZ:64,
  maxZ:328,
  step:4,
  h:[
    [null,null,null,null,null,228.863,229.159,229.426,229.560,229.702,229.690,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,228.762,229.582,230.000,230.092,230.066,230.054,230.041,230.067,230.100,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,229.619,230.191,230.462,230.540,230.499,230.493,230.439,230.382,230.368,230.379,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,229.782,230.342,230.791,231.011,230.992,230.951,230.857,230.812,230.795,230.724,230.702,230.703,230.857,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,229.738,230.386,230.828,230.077,229.805,230.590,231.293,231.102,231.046,231.094,231.164,231.205,231.111,231.166,231.515,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,229.923,230.766,231.018,229.973,228.866,228.566,229.008,230.269,231.025,231.078,231.275,231.484,231.740,231.746,231.711,231.773,231.826,231.610,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,230.893,231.534,230.695,228.793,228.205,228.213,228.097,229.143,230.755,230.929,231.271,231.739,231.891,231.952,231.938,231.920,231.948,231.897,231.718,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [230.516,231.513,231.946,230.378,228.591,227.983,228.028,228.745,229.976,230.432,230.408,230.940,231.384,231.712,232.097,232.191,232.217,232.136,232.178,232.119,232.195,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [231.272,231.985,232.164,230.396,228.531,228.131,228.781,229.276,230.232,229.975,230.241,230.685,231.173,231.505,231.934,232.206,232.455,232.419,232.480,232.508,232.600,232.703,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [231.925,232.333,232.223,230.228,229.268,228.801,229.852,230.283,230.005,229.917,230.209,230.588,230.992,231.364,231.647,232.244,232.545,232.748,232.877,232.808,233.011,233.118,233.062,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [232.153,232.429,232.300,231.395,230.604,230.173,229.901,229.782,229.783,230.012,230.297,230.636,231.014,231.332,231.624,232.133,232.675,232.946,233.200,233.263,233.551,233.617,233.636,233.363,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [232.128,232.406,232.239,231.579,230.796,229.838,229.665,229.838,229.989,230.287,230.556,230.748,231.032,231.340,231.688,232.359,231.629,232.837,233.399,233.704,233.724,234.050,233.937,233.777,233.495,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [232.353,235.543,232.415,231.845,230.873,230.297,230.052,230.130,230.280,230.525,230.691,230.780,231.015,231.347,231.823,232.150,231.212,231.973,233.366,233.822,233.958,234.159,234.267,234.144,233.995,233.823,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [232.593,233.021,232.871,232.264,231.292,230.756,230.448,230.336,230.430,230.652,230.731,230.741,230.930,231.340,232.143,231.910,230.891,231.474,233.281,233.743,234.082,234.169,234.381,234.416,234.445,234.251,234.199,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [232.627,233.283,233.139,232.595,231.777,231.275,230.810,230.519,230.495,230.667,230.769,230.747,230.914,231.395,232.315,231.694,231.106,231.019,232.350,233.551,233.987,234.167,234.351,234.644,234.733,234.778,234.641,234.477,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [232.770,233.378,233.315,232.849,232.399,231.629,231.103,230.724,230.630,230.715,230.825,230.905,231.104,231.654,232.538,231.903,230.977,231.038,231.526,232.370,233.880,234.214,234.336,234.637,234.892,235.029,235.043,235.045,234.901,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,233.293,233.615,233.259,232.755,232.272,231.691,231.160,230.881,230.928,231.055,231.175,231.459,231.932,232.778,233.203,233.128,232.498,231.656,231.419,233.779,234.107,234.424,234.525,234.979,235.334,235.373,235.412,235.391,235.394,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,233.260,233.856,233.683,233.227,232.716,232.257,231.861,231.356,231.286,231.425,231.537,231.828,232.240,232.940,233.361,233.545,233.609,233.509,232.711,233.945,234.210,234.540,234.836,234.928,235.418,235.619,235.722,235.867,235.873,235.942,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,233.164,233.677,233.867,233.528,233.181,232.817,232.401,232.122,231.688,231.686,231.757,231.963,232.271,232.658,233.309,233.583,233.718,233.799,233.892,234.114,234.421,234.691,234.981,235.306,235.375,235.781,236.051,236.209,236.254,236.313,236.343,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,233.063,233.496,233.789,233.824,233.674,233.408,232.935,232.509,232.016,231.726,231.639,231.721,231.997,232.430,232.852,233.467,233.750,233.885,233.979,234.177,234.469,234.697,234.928,235.262,235.747,235.830,236.136,236.404,236.534,236.572,236.725,236.750,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,233.016,233.340,233.602,234.029,234.026,233.852,233.342,232.740,232.273,231.594,231.380,231.427,231.743,232.201,232.659,233.087,233.434,233.894,234.058,234.192,234.376,234.556,234.723,235.040,235.535,236.015,236.353,236.506,236.693,236.895,236.964,237.182,237.222,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,233.190,233.440,233.969,234.113,233.957,233.481,232.826,232.274,231.498,231.214,231.237,231.522,231.966,232.432,232.919,233.268,233.546,233.738,233.907,234.166,234.492,234.636,234.833,235.229,235.758,236.325,236.668,236.722,236.896,237.056,237.293,237.449,237.632,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,233.057,233.204,233.725,234.145,234.088,233.592,232.904,232.290,231.499,231.259,231.261,231.489,231.837,232.265,232.668,233.024,233.308,233.567,233.820,234.027,234.217,234.430,234.797,235.025,235.442,235.955,236.376,236.750,236.897,236.993,237.297,237.569,237.736,237.992,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,233.126,233.215,233.830,234.334,234.332,233.789,233.030,232.265,231.633,231.372,231.341,231.506,231.705,232.027,232.338,232.667,232.945,233.260,233.616,233.932,234.177,234.390,234.533,234.922,235.230,235.599,235.986,236.367,236.760,237.217,237.299,237.584,237.837,238.000,238.019,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,233.252,233.423,233.979,234.641,234.593,233.908,233.134,232.285,231.902,231.641,231.562,231.639,231.711,231.845,232.021,232.265,232.565,232.928,233.362,233.765,234.067,234.318,234.516,234.706,234.967,235.395,235.664,236.051,236.462,236.951,237.443,237.509,237.685,237.812,237.919,237.969,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,233.427,233.589,234.261,234.856,234.664,233.901,233.205,232.619,232.321,232.115,232.044,231.926,231.864,231.838,231.854,231.975,232.289,232.638,233.103,233.584,233.971,234.247,234.437,234.626,234.793,235.228,235.545,235.838,236.241,236.665,237.057,237.570,237.345,237.536,237.715,237.804,237.999,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,233.674,234.352,234.902,234.735,234.083,233.435,233.015,232.835,232.706,232.556,232.374,232.202,232.028,231.940,232.019,232.265,232.540,232.951,233.473,233.907,234.161,234.273,234.454,234.636,234.865,235.433,235.694,235.986,236.332,236.653,236.983,237.100,237.139,237.375,237.664,237.840,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,233.809,234.518,234.908,234.767,234.303,233.701,233.464,233.377,233.198,233.007,232.763,232.510,232.272,232.109,232.115,232.265,232.478,232.842,233.307,233.677,233.947,234.081,234.240,234.437,234.690,235.016,235.536,235.756,236.019,236.275,236.632,236.723,236.743,236.898,237.109,237.373,237.684,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,233.988,234.499,234.912,234.799,234.477,233.949,233.828,233.749,233.631,233.449,233.189,232.903,232.613,232.417,232.312,232.359,232.532,232.810,233.136,233.428,233.686,233.853,234.019,234.233,234.517,234.849,235.254,235.592,235.759,235.969,236.196,236.311,236.565,236.582,236.793,237.084,237.257,237.477,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,234.172,234.724,235.041,234.912,234.628,234.114,233.981,233.892,233.844,233.726,233.504,233.268,233.031,232.811,232.653,232.582,232.682,232.849,233.087,233.353,233.529,233.679,233.861,234.114,234.422,234.801,235.125,235.618,235.742,235.845,235.985,236.111,236.358,236.268,236.574,236.723,236.811,237.099,237.163,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,234.370,235.058,235.355,235.156,234.723,234.154,233.995,233.907,233.845,233.912,233.767,233.624,233.417,233.197,233.039,232.914,232.937,233.070,233.252,233.394,233.528,233.624,233.822,234.107,234.415,234.801,235.094,235.452,235.703,235.760,235.886,236.010,236.206,236.200,236.120,236.459,236.595,236.826,236.998,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,234.606,235.082,235.645,235.370,234.857,234.233,234.102,233.918,233.867,233.917,233.862,233.765,233.569,233.379,233.212,233.166,233.236,233.331,233.402,233.482,233.602,233.705,233.918,234.233,234.526,234.864,235.095,235.316,235.654,235.649,235.693,235.831,235.845,236.100,235.866,236.300,236.583,236.690,236.775,237.049,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,235.146,235.671,235.412,234.953,234.450,234.162,233.948,233.830,233.829,233.815,233.790,233.673,233.506,233.363,233.364,233.427,233.515,233.593,233.658,233.790,233.949,234.154,234.454,234.700,234.975,235.143,235.261,235.515,235.593,235.607,235.559,235.709,235.974,235.857,236.470,236.807,236.828,236.953,236.965,236.898,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,235.076,235.571,235.482,235.180,234.837,234.185,233.884,233.768,233.757,233.782,233.884,233.916,233.827,233.762,233.810,233.811,233.892,233.994,234.144,234.302,234.344,234.469,234.714,234.921,235.164,235.314,235.370,235.454,235.593,235.600,235.690,235.744,236.196,236.302,236.875,237.250,237.318,237.136,236.897,236.881,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,235.125,235.387,235.443,235.189,234.880,234.228,233.910,233.894,233.885,233.898,233.989,234.059,233.932,233.917,233.973,234.066,234.193,234.319,234.499,234.610,234.650,234.729,234.912,235.070,235.258,235.307,235.323,235.349,235.591,235.592,235.629,235.617,236.130,236.883,237.348,237.836,238.020,237.591,237.244,236.967,237.006,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,235.361,235.540,235.367,235.058,234.590,234.171,234.152,234.255,234.299,234.286,234.145,234.011,233.987,234.058,234.225,234.389,234.532,234.650,234.729,234.785,234.819,235.006,235.110,235.251,235.253,235.252,235.267,235.545,235.552,235.543,235.713,236.323,237.252,237.754,238.334,238.417,238.147,237.535,237.067,237.051,237.259,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,235.625,235.614,235.773,235.459,235.041,234.445,234.365,234.314,234.391,234.361,234.233,234.146,234.061,234.116,234.296,234.493,234.645,234.755,234.788,234.835,234.859,235.022,235.087,235.190,235.214,235.238,235.230,235.530,235.538,235.569,235.900,236.668,237.509,238.305,238.719,238.826,238.381,237.688,237.165,236.910,237.346,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,235.720,235.780,236.012,235.773,235.337,235.041,234.597,234.477,234.464,234.590,234.650,234.571,234.492,234.614,234.644,234.753,234.919,235.115,235.016,234.990,234.961,235.054,235.119,235.261,235.410,235.455,235.354,235.614,235.710,235.773,236.059,236.731,237.638,238.488,238.732,238.782,238.389,237.833,237.441,237.145,237.458,237.793,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,235.886,236.021,235.928,235.669,235.395,235.089,234.732,234.802,234.874,234.959,234.872,234.789,234.899,235.086,235.024,235.165,235.282,235.197,235.165,235.126,235.173,235.268,235.379,235.497,235.521,235.497,235.645,235.821,235.886,236.162,236.723,237.539,238.226,238.571,238.571,238.418,238.003,237.648,237.684,237.900,238.060,238.347,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,235.984,235.851,236.000,235.899,235.712,235.504,235.018,235.101,235.117,235.133,235.095,235.118,235.206,235.418,235.380,235.459,235.511,235.473,235.449,235.356,235.403,235.444,235.570,235.601,235.624,235.609,235.659,235.925,236.029,236.343,236.754,237.389,237.859,238.355,238.324,238.203,238.200,238.097,238.206,238.353,238.406,238.664,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,236.117,236.255,236.362,236.244,236.042,235.700,235.504,235.425,235.481,235.536,235.429,235.541,235.698,235.735,235.759,235.807,235.816,235.800,235.705,235.750,235.766,235.860,235.868,235.876,235.875,235.892,236.184,236.303,236.509,236.801,237.250,237.671,237.896,238.189,238.341,238.484,238.485,238.607,238.614,238.798,239.000,239.063,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,236.320,236.305,236.712,236.754,236.654,236.407,235.924,235.782,235.838,235.949,236.103,236.349,236.507,236.321,236.382,236.493,236.491,236.366,236.191,236.161,236.139,236.249,236.417,236.319,236.255,236.186,236.237,236.588,236.652,236.856,237.079,237.369,237.681,237.902,238.141,238.325,238.533,238.629,238.749,239.057,239.285,239.378,239.263,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,236.592,236.473,236.987,237.130,237.029,236.701,236.273,236.225,236.311,236.509,236.768,236.879,236.981,237.037,237.013,236.895,236.809,236.622,236.581,236.540,236.549,236.604,236.532,236.453,236.389,236.492,236.588,236.840,236.937,237.048,237.259,237.475,237.737,238.098,238.371,238.507,238.631,238.950,239.174,239.514,239.528,239.469,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,236.763,236.869,237.329,237.378,237.251,237.127,236.827,236.832,236.913,237.039,237.167,237.269,237.338,237.322,237.255,237.203,237.084,236.982,236.865,236.732,236.690,236.549,236.493,236.494,236.618,236.697,236.725,237.077,237.189,237.361,237.765,237.843,238.079,238.303,238.358,238.517,238.860,239.241,239.488,239.601,239.618,239.804,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,237.141,237.001,237.301,237.547,237.528,237.549,237.637,237.429,237.310,237.390,237.547,237.742,237.887,237.966,237.949,237.865,237.618,237.330,237.111,236.895,236.676,236.526,236.469,236.511,236.659,236.784,236.824,237.103,237.323,237.537,237.803,238.082,238.043,238.322,238.449,238.554,238.896,239.149,239.308,239.594,239.832,240.230,240.454,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,237.457,237.514,237.810,237.923,238.000,238.187,238.154,238.215,238.291,238.403,238.363,238.205,238.138,237.950,237.111,237.935,237.723,237.402,237.124,236.903,236.674,236.557,236.635,236.738,236.815,236.825,236.898,237.372,237.615,237.849,238.095,238.161,238.171,238.470,238.627,238.806,238.981,239.192,239.503,240.097,240.663,241.080,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,237.771,237.806,238.159,238.244,238.485,238.477,238.519,238.620,238.657,238.494,237.384,236.746,236.692,236.904,238.136,238.239,237.741,237.449,237.164,236.866,236.778,236.817,236.896,236.850,236.888,236.943,237.239,237.724,237.954,238.202,238.448,238.505,238.643,238.780,238.803,238.908,239.070,239.512,240.210,240.932,241.514,241.854,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,237.979,238.061,238.033,238.373,238.607,238.764,238.776,238.811,238.867,238.865,237.557,236.813,236.385,237.353,238.691,238.612,238.120,237.820,237.536,237.228,237.094,237.062,237.076,236.994,237.017,237.039,237.213,237.568,238.067,238.353,238.581,238.767,238.830,238.846,238.894,238.957,238.863,239.437,240.200,241.072,241.965,242.328,242.173,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,238.248,238.355,238.469,238.840,238.925,239.003,239.136,239.087,239.155,239.157,238.315,237.386,236.947,238.648,238.904,238.496,238.216,237.917,237.635,237.443,237.324,237.292,237.286,237.331,237.299,237.356,237.567,237.990,238.343,238.594,238.880,239.026,239.011,239.002,238.969,239.068,239.529,240.390,241.293,242.241,242.821,242.789,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,238.507,238.673,238.890,239.288,239.394,239.459,239.426,239.464,239.512,239.610,239.236,237.750,237.892,239.157,238.857,238.664,238.459,238.151,237.860,237.709,237.663,237.660,237.591,237.537,237.536,237.632,237.820,238.300,238.533,238.797,239.204,239.211,239.182,239.183,239.430,239.813,240.640,241.979,242.880,243.487,243.384,242.689,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,238.800,238.967,239.394,239.481,239.598,239.614,239.641,239.782,239.776,239.761,239.348,238.003,239.378,239.167,239.006,238.720,238.359,238.018,237.837,237.860,237.860,237.839,237.813,237.735,237.735,237.814,238.072,238.526,238.827,239.173,239.483,239.399,239.262,239.645,240.294,241.152,242.345,243.510,244.157,244.000,243.307,242.319,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,239.061,239.235,239.535,239.658,239.793,239.857,239.904,239.921,239.866,239.861,239.784,239.713,239.558,238.967,238.829,238.448,238.055,237.886,237.933,238.060,238.155,238.138,238.044,237.965,237.987,238.090,238.564,238.911,239.260,239.629,239.713,239.478,240.052,240.760,241.640,242.870,244.025,244.700,244.561,243.833,242.784,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,239.287,239.489,239.701,239.907,240.092,240.277,240.184,240.190,240.211,240.138,240.024,239.929,239.298,238.934,238.597,238.287,238.200,238.224,238.414,238.563,238.509,238.405,238.272,238.185,238.233,238.455,238.997,239.319,239.537,239.773,240.059,240.272,241.045,241.953,243.226,244.235,244.861,244.819,244.111,243.055,242.124,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,239.525,239.867,240.010,240.141,240.295,240.399,240.456,240.484,240.428,240.294,240.182,239.514,239.125,238.728,238.470,238.436,238.447,238.658,238.884,238.777,238.675,238.541,238.437,238.429,238.564,239.024,239.316,239.492,239.672,240.085,240.614,241.123,242.102,243.036,244.128,244.764,244.857,244.099,243.152,242.416,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,239.674,239.978,240.072,240.280,240.444,240.532,240.629,240.594,240.514,240.356,239.821,239.323,238.935,238.643,238.503,238.572,238.783,238.974,238.990,238.938,238.841,238.730,238.683,238.762,238.947,239.458,239.632,239.596,240.011,240.529,241.054,241.828,242.844,243.823,244.393,244.492,243.918,243.205,242.627,242.054,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,239.712,239.822,239.976,240.349,240.532,240.645,240.611,240.509,240.438,240.119,239.568,239.219,238.905,238.793,238.791,238.949,239.184,239.305,239.306,239.203,239.045,238.944,238.959,239.077,239.493,239.806,239.913,240.169,240.618,241.055,241.623,242.652,243.580,244.133,244.080,243.694,243.085,242.574,242.241,242.080,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,239.980,240.052,240.390,240.638,240.564,240.692,240.509,240.476,240.306,239.885,239.583,239.307,239.125,238.969,239.008,239.188,239.285,239.378,239.400,239.268,239.142,239.102,239.197,239.385,239.871,240.112,240.269,240.763,241.362,241.853,242.648,243.453,243.894,243.780,243.722,243.411,243.060,242.817,242.844,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,240.359,240.565,240.720,240.590,240.563,240.630,240.523,240.461,240.299,239.867,239.614,239.346,239.087,239.023,239.171,239.290,239.395,239.503,239.464,239.316,239.252,239.338,239.513,240.045,240.261,240.589,241.093,241.704,242.461,242.977,243.527,243.716,243.827,243.913,244.059,243.825,243.750,243.547,243.633,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,240.635,240.708,240.772,240.858,240.588,240.572,240.667,240.557,240.531,240.120,239.829,239.568,239.301,239.143,239.213,239.361,239.465,239.551,239.542,239.433,239.395,239.496,239.678,240.194,240.494,240.959,241.544,242.207,242.937,243.721,244.032,243.938,243.870,244.021,244.371,244.551,244.679,244.547,244.413,244.085,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,240.528,240.598,240.683,240.754,240.813,240.722,240.715,240.593,240.493,239.996,239.727,239.473,239.300,239.275,239.400,239.450,239.480,239.480,239.473,239.527,239.663,239.837,240.314,240.778,241.321,241.964,242.774,243.557,244.169,244.522,244.385,243.774,243.788,244.219,244.804,245.207,245.360,245.197,244.674,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,240.462,240.522,240.691,240.715,240.792,240.846,240.835,240.573,240.376,239.877,239.671,239.529,239.473,239.506,239.489,239.481,239.503,239.545,239.654,239.822,240.035,240.481,240.960,241.464,242.143,242.997,243.857,244.442,244.632,244.367,243.976,244.141,244.337,244.948,245.750,245.900,245.625,245.104,244.755,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,240.492,240.539,240.591,240.763,240.777,240.832,240.872,240.587,240.312,239.986,239.853,239.735,239.646,239.574,239.519,239.521,239.592,239.781,240.003,240.280,240.601,241.131,241.521,242.136,242.911,243.737,244.340,244.586,244.496,244.335,244.507,244.817,245.354,245.733,245.943,245.756,245.350,245.136,245.387,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,240.402,240.533,240.642,240.648,240.779,240.847,240.957,240.640,240.416,240.142,240.018,239.853,239.727,239.664,239.697,239.791,240.046,240.345,240.636,240.847,241.261,241.510,241.956,242.635,243.409,244.041,244.387,244.426,244.444,244.680,245.105,245.674,246.141,246.110,245.747,245.501,245.505,245.820,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,240.492,240.620,240.634,240.723,240.949,240.966,241.088,241.069,240.925,240.616,240.453,240.218,240.178,240.402,240.440,240.761,240.957,241.116,241.324,241.519,241.489,241.789,242.432,243.124,243.734,244.087,244.143,244.175,244.420,244.903,245.486,245.843,245.827,245.564,245.366,245.807,246.350,246.812,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,240.607,240.280,239.976,240.715,241.175,241.118,241.267,241.437,241.375,241.043,240.856,240.816,240.935,241.069,241.259,241.402,241.527,241.872,241.922,241.979,242.088,242.447,243.022,243.519,243.804,243.875,243.814,243.963,244.350,244.848,245.201,245.243,245.274,245.458,246.022,246.842,247.211,246.989,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,239.282,238.915,239.779,241.085,241.330,241.327,241.489,241.658,241.654,241.310,241.259,241.415,241.490,241.639,241.813,242.144,242.249,242.358,242.461,242.634,242.851,243.189,243.541,243.763,243.741,243.486,243.568,243.836,244.192,244.492,244.653,244.889,245.505,246.190,246.831,247.572,247.960,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,239.087,239.449,241.214,241.424,241.456,241.594,241.718,241.900,242.066,242.213,241.855,241.991,242.186,242.484,242.521,242.613,242.757,242.913,243.100,243.281,243.471,243.654,243.762,243.687,243.564,243.490,243.655,243.850,244.083,244.337,244.745,245.393,246.229,246.750,247.424,248.100,247.622,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,240.892,241.417,241.533,241.572,241.616,241.712,241.946,242.155,242.342,242.538,242.766,242.671,242.757,242.812,243.005,243.120,243.275,243.417,243.542,243.619,243.677,243.694,243.629,243.252,243.214,243.322,243.488,243.895,244.303,244.598,245.096,246.081,246.865,247.451,247.937,248.471,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,241.259,241.556,241.694,241.778,241.936,242.072,242.232,242.427,242.647,242.823,243.045,243.194,243.107,243.222,243.416,243.521,243.615,243.654,243.623,243.568,243.543,243.258,243.195,243.187,243.275,243.364,243.604,244.316,243.953,243.392,245.158,246.784,247.446,247.774,248.406,247.849],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,241.347,241.474,241.790,241.986,242.120,241.410,241.730,242.715,242.910,243.040,243.169,243.401,243.475,243.493,243.607,243.692,243.721,243.664,243.559,243.448,243.310,243.156,243.170,243.142,243.195,243.273,243.529,244.242,244.109,243.106,243.620,245.682,247.390,247.723,248.113,248.269],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,241.647,241.766,242.104,242.394,241.319,240.988,242.287,243.272,243.406,243.488,243.560,243.776,243.799,243.736,243.792,243.734,243.624,243.495,243.242,243.103,243.221,243.252,243.187,243.140,243.290,243.530,244.292,243.747,242.969,243.024,243.740,246.004,247.590,247.686,247.975],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,241.994,242.169,242.700,241.515,241.070,242.157,243.353,243.701,243.765,243.831,243.939,243.859,243.859,243.869,243.757,243.662,243.344,243.191,243.277,243.448,243.418,243.346,243.243,243.386,243.687,244.529,244.082,243.149,243.224,244.172,246.381,247.414,247.273,247.433],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,242.438,242.928,241.501,241.316,241.977,243.182,243.922,243.970,244.017,244.097,244.027,243.972,243.934,243.789,243.448,243.346,243.387,243.536,243.683,243.592,243.456,243.386,243.560,244.149,244.827,244.078,243.178,243.804,244.887,246.607,247.202,246.899,246.898],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,243.218,242.539,241.829,242.460,243.409,244.111,244.129,244.167,244.246,244.137,244.065,243.989,243.615,243.504,243.470,243.511,243.614,243.706,243.606,243.452,243.480,243.823,244.595,245.144,243.984,243.071,244.555,246.470,247.037,247.077,246.514,246.497],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,243.213,242.382,242.767,244.022,244.277,244.277,244.323,244.382,244.219,244.205,243.827,243.680,243.562,243.512,243.504,243.566,243.575,243.474,243.513,243.926,244.373,245.039,245.778,244.443,244.044,245.300,246.977,247.077,246.871,246.467,246.103],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,244.107,244.264,244.382,244.429,244.428,244.464,244.501,244.359,244.246,243.922,243.766,243.660,243.567,243.535,243.520,243.513,243.614,243.846,244.185,244.784,245.544,246.302,246.348,245.979,246.885,247.193,247.108,246.867,246.368,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,244.423,244.531,244.578,244.601,244.609,244.626,244.540,244.441,244.080,243.908,243.767,243.717,243.692,243.678,243.709,243.973,244.177,244.634,245.305,246.064,246.751,247.138,247.250,247.258,247.195,247.080,246.531,246.174,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,244.720,244.761,244.792,244.807,244.769,244.868,244.753,244.346,244.193,244.075,244.049,244.081,244.122,244.499,244.542,244.487,244.643,245.425,246.498,247.083,247.281,247.265,247.170,246.996,246.513,246.243,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,245.005,245.044,245.083,244.942,245.098,245.116,245.015,244.777,244.597,244.572,244.802,244.996,244.948,244.492,244.006,244.232,245.009,245.909,247.214,247.218,247.053,246.838,246.397,246.106,245.758,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,245.305,245.360,245.106,245.216,245.535,245.518,245.480,245.456,245.260,245.122,244.716,244.243,243.721,243.816,243.987,244.534,246.009,247.114,246.941,246.655,246.196,245.664,245.360,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,245.368,245.337,245.379,245.888,245.954,246.000,245.789,244.260,244.030,243.735,243.388,243.840,244.088,244.421,245.499,246.799,246.775,246.499,246.095,245.351,244.959,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,245.752,245.527,245.852,246.115,246.261,246.286,245.086,244.041,243.944,243.533,244.053,244.641,245.726,246.607,246.554,246.307,245.925,245.385,245.031,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,245.565,245.685,246.189,246.309,246.383,246.438,246.087,245.585,245.067,244.968,245.325,246.197,246.199,246.057,245.764,245.369,244.988,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,245.582,245.679,246.073,246.159,246.168,246.127,246.041,245.923,245.775,245.794,245.724,245.624,245.260,245.409,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,245.511,245.646,245.732,245.664,245.538,245.649,245.670,245.650,245.609,null,null,null,null,null,null,null,null,null,null,null]
  ]
};

//************************
// -/ GBL: DEBUG
//************************

type DebugLevel = 0 | 1 | 2;

enum LogOType {
  None,
  Player,
  Group,
}

const DEBUG_MODE_LEVEL: DebugLevel = 1; // 0 = no debug, 1 = basic, 2 = advanced

//************************
// -/ GBL: VECTORS & MATH
//************************

type V3 = { x: number; y: number; z: number };

type XZ = { x: number; z: number };

enum DistanceType {
  XZ,
  XYZ,
}

enum DistanceUnit {
  Meters,
  Yards,
}

const GLOBAL_TICK_RATE = 0.032;
const ZERO_VEC = mod.CreateVector(0, 0, 0);
const ZERO_V3 = { x: 0, y: 0, z: 0 };

//************************
// -/ GBL: SPATIAL OBJECTS
//************************

const matchmaking_Panel_1_id = 701;

const intPt_MatchmakingUI_1_id = 801;
const intPt_MatchmakingUI_2_id = 802;

const intPt_LobbyMusic_id = 803;

const wallSpeaker1_id = 1001;
const wallSpeaker2_id = 1002;
const wallSpeaker3_id = 1003;

const bushSoundOrigin_id = 2001;

const rtc = mod.RuntimeSpawn_Common;
const rte = mod.RuntimeSpawn_Eastwood;

// Models

const modelBall = rtc.BallGo01;
const modelGolfBag = rte.GolfBag_01;

// VFX

const vfxPlayingBall = rtc.FX_Gadget_DeployableMortar_Target_Area;

const vfxSparks = rtc.FX_Sparks;

const vfxDefaultFlightTrail = rtc.FX_ThrowingKnife_Trail;
const vfxPowerHitFlightTrail = rtc.FX_Gadget_Sabotage_02_SparkLoop;

const vfxGoodHitFlightTrail = rtc.FX_ThrowingKnife_Trail; // rtc.FX_Grenade_Incendiary_Trail;
const vfxDefaultGroundTrail = rtc.FX_ThrowingKnife_Trail_Friendly; //rtc.FX_Gadget_DeployableMortar_Projectile_Trail;

const vfxBallHitSand = rtc.FX_Impact_LoadoutCrate_Sand;
const vfxBallHitWater = rtc.FX_Grenade_40mm_HE_Detonation_Underwater;
const vfxBallDefaultHitGround = rtc.FX_DeployableCover_Deploy_Dirt;
const vfxBallPowerHitGround = rtc.FX_Gadget_C4_Explosives_Detonation;

// Ball fall range?: mod.RuntimeSpawn_Common.FX_SupplyVehicleStation_Range_Indicator

// SFX

let startCourseMusic: mod.MusicEvents;
let endCourseMusic: mod.MusicEvents;
let playerRoundMusic: mod.MusicEvents;

let lobbySFX: mod.SFX | null;
let lobbySFX2: mod.SFX | null;

const sfxCloseMenu = rtc.SFX_UI_MenuNavigation_Home_OpenPartyMenu_OneShot2D;
const sfxOpenMenu =
  rtc.SFX_UI_MenuNavigation_Default_PrimaryActivation_OneShot2D;

const sfxBallInHoleOneShot = rtc.SFX_UI_EOR_RankUp_Normal_OneShot2D;
const sfxBallInHoleCrowd =
  rtc.SFX_Levels_Cairo_SP_NightRaid_Spots_Walla_RiotCrowdCheer_SimpleLoop3D;

const sfxPowerActivating =
  rtc.SFX_UI_Gamemode_Shared_LeadChange_Positive_OneShot2D;
const sfxPowerDeactivating =
  rtc.SFX_UI_Gamemode_Shared_LeadChange_Negative_OneShot2D;
const sfxPowerActivatingCharging =
  rtc.SFX_Gadgets_Defibrillator_Equipped_Charge_OneShot3D;

const sfxClockTickOneShot =
  rtc.SFX_UI_Gamemode_Shared_OutOfBounds_Countdown_OneShot2D;
const sfxClockTickLoop =
  rtc.SFX_UI_Gamemode_Shared_CaptureObjectives_CapturingTick_IsFriendly_SimpleLoop2D;

const sfxWaterOneShot =
  rtc.SFX_Soldier_States_Local_UnderwaterTransition_Out_OneShot2D;

const sfxOutOfBoundsOneShot =
  rtc.SFX_Soldier_Revive_Effort_FemaleHurt_OneShot2D;
const sfxAimingOutOfBoundsOneShot =
  rtc.SFX_UI_Map_MapMovement_ZoomBlocked_OneShot2D;

const sfxButtonDenied = rtc.SFX_UI_Map_MapMovement_ZoomBlocked_OneShot2D;

const sfxSelectClub = rtc.SFX_UI_MenuNavigation_Challenges_Untrack_OneShot2D;

const sfxUnready = rtc.SFX_UI_MenuNavigation_Default_Focus_OneShot2D;
const sfxReady = rtc.SFX_UI_MenuNavigation_Challenges_Track_OneShot2D;

const sfxLobbyMusic = rtc.SFX_Levels_Brooklyn_Spots_SmallRadio_SimpleLoop3D;

const sfxWoodHit1 = rtc.SFX_Gadgets_ATMine_Bounce_Soft_OneShot3D;
const sfxWoodHit2 =
  rtc.SFX_Projectiles_Flybys_Bullet_Crack_DMR_Distant_OneShot3D;

const sfxIronHit1 = rtc.SFX_Gadgets_Defibrillator_Equipped_ChargeRub_OneShot3D;
const sfxIronHit2 = rtc.SFX_GameModes_BR_Mission_CTF_DataDrive_Insert_OneShot3D;
const sfxIronHit3 =
  rtc.SFX_Soldier_Melee_Takedown_Victim_TurnAround_SlowShort_OneShot3D;

const sfxPutterHit = rtc.SFX_Gadgets_EoDBot_Spawnable_Stop_Idle_OneShot3D;

const sfxSwingWoosh =
  rtc.SFX_Soldier_Melee_Takedown_Attacker_SledgehammerSwing_OneShot3D;

//************************
// -/ GBL: UI COLORS
//************************

const UICOLORS = {
  GOLF_GREEN: mod.CreateVector(0, 0.404, 0.278), // #006747
  GOLF_GREEN_DARK: mod.CreateVector(0, 0.303, 0.209), // #004D3A
  RED: mod.CreateVector(0.678, 0.137, 0.137), // #AD2323

  GOLF_GREEN_COMP: mod.CreateVector(0.078, 0.549, 0.18), // #006747 BUT COMPENSATED

  FRIENDLY_PRIMARY: mod.CreateVector(0.439, 0.922, 1.0), // #70EBFF
  FRIENDLY_DARK: mod.CreateVector(0.075, 0.184, 0.247), // #132F3F

  ENEMY_PRIMARY: mod.CreateVector(1.0, 0.514, 0.38), // #FF8361
  ENEMY_DARK: mod.CreateVector(0.251, 0.094, 0.067), // #401811

  GREEN_PRIMARY: mod.CreateVector(0.678, 0.992, 0.525), // #ADFD86
  GREEN_DARK: mod.CreateVector(0.278, 0.447, 0.212), // #477236

  GREY_WHITE100: mod.CreateVector(1.0, 1.0, 1.0), // #FFFFFF
  GREY_89: mod.CreateVector(0.835, 0.922, 0.95), // #D5EBF9 - 976
  GREY_36: mod.CreateVector(0.329, 0.369, 0.382), // #545E63 - 388
  GREY_22: mod.CreateVector(0.212, 0.224, 0.23), // #36393C - 235
  GREY_BLACK3: mod.CreateVector(0.031, 0.031, 0.04), // #08080B - 043
};

//************************
// -/ GBL: CLUBS
//************************

enum ClubType {
  DR1,
  DR3,
  I4,
  I5,
  I6,
  I7,
  I8,
  I9,
  PW,
  SW,
  PT,
}

type ClubKey =
  | "DR1"
  | "DR3"
  | "I4"
  | "I5"
  | "I6"
  | "I7"
  | "I8"
  | "I9"
  | "PW"
  | "SW"
  | "PT";

type Club = {
  type: ClubType;
  key: ClubKey;
};

const ClubList: Club[] = [
  { type: ClubType.DR1, key: "DR1" },
  { type: ClubType.DR3, key: "DR3" },
  { type: ClubType.I4, key: "I4" },
  { type: ClubType.I5, key: "I5" },
  { type: ClubType.I6, key: "I6" },
  { type: ClubType.I7, key: "I7" },
  { type: ClubType.I8, key: "I8" },
  { type: ClubType.I9, key: "I9" },
  { type: ClubType.PW, key: "PW" },
  { type: ClubType.SW, key: "SW" },
  { type: ClubType.PT, key: "PT" },
];

interface ClubParams {
  velocity: number;
  angle: number;
  backspin: number;
  forwardSpin: number; // TODO (CURRENTLY UNUSED): implement forward spin effect?
}

const ClubParams: Record<ClubType, ClubParams> = {
  [ClubType.DR1]: { velocity: 49, angle: 10, backspin: 0.2, forwardSpin: 0 },
  [ClubType.DR3]: { velocity: 46, angle: 12, backspin: 0.2, forwardSpin: 0 },
  [ClubType.I4]: { velocity: 42, angle: 16, backspin: 0.25, forwardSpin: 0 },
  [ClubType.I5]: { velocity: 40, angle: 21, backspin: 0.3, forwardSpin: 0 },
  [ClubType.I6]: { velocity: 38, angle: 25, backspin: 0.35, forwardSpin: 0 },
  [ClubType.I7]: { velocity: 36, angle: 29, backspin: 0.45, forwardSpin: 0 },
  [ClubType.I8]: { velocity: 34, angle: 33, backspin: 0.45, forwardSpin: 0 },
  [ClubType.I9]: { velocity: 31, angle: 37, backspin: 0.45, forwardSpin: 0 },
  [ClubType.PW]: { velocity: 23, angle: 44, backspin: 0.45, forwardSpin: 0 },
  [ClubType.SW]: { velocity: 17, angle: 53, backspin: 0.5, forwardSpin: 0 },
  [ClubType.PT]: { velocity: 15, angle: 0, backspin: 0, forwardSpin: 0.1 },
};

//************************
// -/ GBL: TERRAIN & SURFACES
//************************

type TerrainSample = {
  slopeX: number;
  slopeZ: number;
  h: number;
};

enum SurfaceType {
  Trees,
  OutOfBounds,
  Fairway,
  Green,
  Fringe,
  Rough,
  Sand,
  TeeBox,
  Water,
}

type SurfaceValue = SurfaceData | SurfaceData[]; // some surfaces (e.g. sand) can have multiple disjoint areas, so we allow an array of SurfaceData for those

type HoleSurfaces = Partial<Record<SurfaceType, SurfaceValue>>; // not all holes have all surface types, so we use Partial

type SurfaceKey =
  | "Trees"
  | "OutOfBounds"
  | "Fairway"
  | "Green"
  | "Fringe"
  | "Rough"
  | "Sand"
  | "TeeBox"
  | "Water";

type TeeOffSpawnDirection = "TowardsTeeOff" | "TowardsFlag";

type PanelSpawnPosition = "Left" | "Right";

type SurfaceParams = {
  key: SurfaceKey;
  priority: number; // lower = more priority when multiple surfaces overlap (e.g. sand in fairway; fairway in rough)
  color: mod.Vector; // assigned color for UI
  rollDecay: number; // higher = more friction (more roll speed decay)
  powerPenalty: number; // factor of power lost on hit (0 = no penalty, 1 = all power lost)
  accuracyPenalty: number; // factor of accuracy lost on hit (0 = no penalty, 1 = random direction)
};

const Surfaces: Record<SurfaceType, SurfaceParams> = {
  [SurfaceType.Trees]: {
    key: "Trees",
    priority: 1,
    color: UICOLORS.GOLF_GREEN_DARK,
    rollDecay: 8,
    powerPenalty: 0.2,
    accuracyPenalty: 0.1,
  },
  [SurfaceType.Green]: {
    key: "Green",
    priority: 2,
    color: UICOLORS.GOLF_GREEN,
    rollDecay: 1.8,
    powerPenalty: 0,
    accuracyPenalty: 0,
  },
  [SurfaceType.Fringe]: {
    key: "Fringe",
    priority: 3,
    color: UICOLORS.GOLF_GREEN,
    rollDecay: 5,
    powerPenalty: 0,
    accuracyPenalty: 0,
  },
  [SurfaceType.Sand]: {
    key: "Sand",
    priority: 4,
    color: mod.CreateVector(194 / 255, 178 / 255, 128 / 255), // HEX: #c2ab80
    rollDecay: 12,
    powerPenalty: 0.2,
    accuracyPenalty: 0.1,
  },
  [SurfaceType.TeeBox]: {
    key: "TeeBox",
    priority: 5,
    color: UICOLORS.GOLF_GREEN,
    rollDecay: 5,
    powerPenalty: 0,
    accuracyPenalty: 0,
  },
  [SurfaceType.Fairway]: {
    key: "Fairway",
    priority: 6,
    color: UICOLORS.GOLF_GREEN,
    rollDecay: 5,
    powerPenalty: 0,
    accuracyPenalty: 0,
  },
  [SurfaceType.Water]: {
    key: "Water",
    priority: 7,
    color: mod.CreateVector(39 / 255, 101 / 255, 160 / 255), // HEX: #2765a0
    rollDecay: 20,
    powerPenalty: 1,
    accuracyPenalty: 1,
  },
  [SurfaceType.OutOfBounds]: {
    key: "OutOfBounds",
    priority: 8,
    color: UICOLORS.RED,
    rollDecay: 0,
    powerPenalty: 0,
    accuracyPenalty: 0,
  },
  [SurfaceType.Rough]: {
    key: "Rough",
    priority: 9,
    color: UICOLORS.GOLF_GREEN_DARK,
    rollDecay: 8,
    powerPenalty: 0.1,
    accuracyPenalty: 0.05,
  },
};

type HeightGrid = {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
  step: number;
  h: (number | null)[][];
};

type SurfaceData = {
  grid?: HeightGrid;
  hull?: XZ[];
  bbox?: { minX: number; maxX: number; minZ: number; maxZ: number };
};

//************************
// -/ GBL: HOLE DATA
//************************

type HoleData = {
  par: number;
  panelHoleNumber: number; // which hole number to show on the panel model (1-18)
  panelSpawnPosition: PanelSpawnPosition; // which side of the teeoff to spawn the hole panel
  heightMap: SurfaceData;
  teeOffPt: V3;
  teeOffSpawnDirection: TeeOffSpawnDirection;
  teeOffPlayerPts: V3[]; // [0] must be left, [1] must be right
  cartPts: V3[]; // [0] must be first in front, [1] must be behind
  flagPt: V3;
  spawnBag: boolean;
  spawnFlag: boolean;
  teeBoxClubs: ClubType[]; // which clubs are allowed in the tee box (if undefined or empty, all clubs are allowed)
  cameraAimPts?: V3[]; // optional: points for the camera to aim at during different phases of the hole (for dogleg holes only). Include (center of fairway) (1)first landing area, (2)apex bend, (3)post-bend landing area.
  surfaces: HoleSurfaces;
};

const bboxEpsilon = 0.05;

// prettier-ignore
const CourseData: Record<number, HoleData> = {
  
  1: {
    par: 4,
    panelHoleNumber: 3,
    panelSpawnPosition: "Left",
    heightMap: { grid: HeightMap_Hole_1 },
    teeOffPt: { x: 1050.154, y: 242.930, z: -370.198 },
    teeOffPlayerPts: [ { x: 1038.973, y: 245.214, z: -379.452 }, { x: 1034.229, y: 245.214, z: -383.111 } ],
    teeOffSpawnDirection: "TowardsFlag",
    cartPts: [ {x: 1015.690, y: 241.578, z: -361.603}, {x: 1022.484, y: 242.129, z: -369.458} ],
    spawnBag: false,
    flagPt: { x: 834.437, y: 238.246, z: -169.687 },
    spawnFlag: true,
    teeBoxClubs: [ClubType.DR1],
    cameraAimPts: [ { x: 894.454, y: 237.419, z: -231.415 } ],
    surfaces: {
      [SurfaceType.TeeBox]: {
        hull: [{ x: 1045.298, z: -380.527 }, { x: 1048.089, z: -384.696 }, { x: 1051.572, z: -388.258 }, { x: 1056.339, z: -389.734 }, { x: 1061.291, z: -389.363 }, { x: 1066.007, z: -387.641 }, { x: 1070.361, z: -385.141 }, { x: 1073.752, z: -381.499 }, { x: 1074.782, z: -376.677 }, { x: 1072.928, z: -372.042 }, { x: 1070.312, z: -367.770 }, { x: 1066.728, z: -364.266 }, { x: 1062.358, z: -361.846 }, { x: 1057.469, z: -362.342 }, { x: 1053.223, z: -364.992 }, { x: 1049.448, z: -368.305 }, { x: 1046.229, z: -372.157 }, { x: 1043.702, z: -376.454 }],
        bbox: {
          minX: 1043.702 - bboxEpsilon,
          maxX: 1074.782 + bboxEpsilon,
          minZ: -389.734 - bboxEpsilon,
          maxZ: -361.846 + bboxEpsilon,
        }
      },
      [SurfaceType.Green]: {
        hull: [{ x: 826.260, z: -164.821 }, { x: 826.370, z: -159.828 }, { x: 827.775, z: -155.009 }, { x: 830.331, z: -150.711 }, { x: 833.949, z: -147.265 }, { x: 838.589, z: -145.458 }, { x: 843.570, z: -146.006 }, { x: 848.168, z: -147.944 }, { x: 851.909, z: -151.269 }, { x: 854.541, z: -155.503 }, { x: 856.107, z: -160.257 }, { x: 856.547, z: -165.243 }, { x: 855.625, z: -170.159 }, { x: 853.851, z: -174.858 }, { x: 851.611, z: -179.342 }, { x: 847.805, z: -182.540 }, { x: 842.986, z: -183.879 }, { x: 838.149, z: -182.904 }, { x: 834.549, z: -179.426 }, { x: 831.199, z: -175.685 }, { x: 828.328, z: -171.583 }, { x: 826.528, z: -166.936 }],
        bbox: {
          minX: 826.260 - bboxEpsilon,
          maxX: 856.547 + bboxEpsilon,
          minZ: -183.879 - bboxEpsilon,
          maxZ: -145.458 + bboxEpsilon,
        }
      },
      [SurfaceType.Fringe]: {
        hull: [{ x: 848.466, z: -187.077 }, { x: 843.674, z: -188.322 }, { x: 838.828, z: -187.102 }, { x: 834.654, z: -184.341 }, { x: 830.761, z: -181.177 }, { x: 827.389, z: -177.486 }, { x: 824.553, z: -173.357 }, { x: 822.291, z: -168.896 }, { x: 820.638, z: -164.175 }, { x: 820.074, z: -159.225 }, { x: 821.360, z: -154.395 }, { x: 823.517, z: -149.864 }, { x: 826.313, z: -145.702 }, { x: 829.864, z: -142.189 }, { x: 834.368, z: -140.001 }, { x: 839.309, z: -139.275 }, { x: 844.299, z: -139.754 }, { x: 848.775, z: -141.942 }, { x: 852.324, z: -145.488 }, { x: 855.047, z: -149.677 }, { x: 856.653, z: -154.425 }, { x: 857.677, z: -159.327 }, { x: 858.569, z: -164.268 }, { x: 859.453, z: -169.210 }, { x: 861.427, z: -173.749 }, { x: 865.108, z: -177.135 }, { x: 865.750, z: -181.951 }, { x: 862.458, z: -185.662 }, { x: 857.842, z: -187.624 }, { x: 852.898, z: -188.422 }],
        bbox: {
          minX: 820.074 - bboxEpsilon,
          maxX: 865.750 + bboxEpsilon,
          minZ: -188.422 - bboxEpsilon,
          maxZ: -139.275 + bboxEpsilon,
        }
      },
      [SurfaceType.Sand]: [
        { hull: [{ x: 828.160, z: -183.566 }, { x: 831.816, z: -186.986 }, { x: 835.815, z: -190.021 }, { x: 839.334, z: -193.549 }, { x: 841.131, z: -197.526 }, { x: 841.144, z: -202.150 }, { x: 837.616, z: -205.278 }, { x: 832.899, z: -204.644 }, { x: 829.858, z: -201.458 }, { x: 827.569, z: -197.600 }, { x: 823.970, z: -195.069 }, { x: 819.572, z: -194.187 }, { x: 817.329, z: -190.216 }, { x: 816.887, z: -185.751 }, { x: 817.328, z: -181.313 }, { x: 820.914, z: -178.460 }, { x: 824.842, z: -180.445 }], bbox: { minX: 816.887 - bboxEpsilon, maxX: 841.144 + bboxEpsilon, minZ: -205.278 - bboxEpsilon, maxZ: -178.460 + bboxEpsilon }},
        { hull: [{ x: 859.824, z: -152.210 }, { x: 861.885, z: -148.034 }, { x: 866.737, z: -148.396 }, { x: 870.048, z: -152.054 }, { x: 872.588, z: -156.379 }, { x: 874.455, z: -161.007 }, { x: 874.475, z: -165.972 }, { x: 872.442, z: -170.499 }, { x: 867.941, z: -172.293 }, { x: 863.675, z: -169.801 }, { x: 862.072, z: -165.123 }, { x: 861.862, z: -160.110 }, { x: 860.246, z: -155.394 }], bbox: { minX: 859.824 - bboxEpsilon, maxX: 874.475 + bboxEpsilon, minZ: -172.293 - bboxEpsilon, maxZ: -148.034 + bboxEpsilon }},
        { hull: [{ x: 882.248, z: -253.468 }, { x: 886.221, z: -256.038 }, { x: 889.758, z: -259.230 }, { x: 893.475, z: -262.092 }, { x: 897.865, z: -261.527 }, { x: 900.603, z: -257.738 }, { x: 899.788, z: -253.434 }, { x: 896.069, z: -250.197 }, { x: 891.978, z: -247.287 }, { x: 888.297, z: -243.992 }, { x: 884.123, z: -241.912 }, { x: 880.542, z: -244.808 }, { x: 880.624, z: -249.224 }], bbox: { minX: 880.542 - bboxEpsilon, maxX: 900.603 + bboxEpsilon, minZ: -262.092 - bboxEpsilon, maxZ: -241.912 + bboxEpsilon }},
      ],
      [SurfaceType.Fairway]: {
        hull: [{ x: 904.943, z: -255.471 }, { x: 905.865, z: -260.398 }, { x: 906.163, z: -265.409 }, { x: 907.429, z: -270.260 }, { x: 909.466, z: -274.850 }, { x: 912.097, z: -279.120 }, { x: 914.985, z: -283.220 }, { x: 917.792, z: -287.381 }, { x: 920.795, z: -291.385 }, { x: 925.091, z: -293.924 }, { x: 929.044, z: -296.902 }, { x: 930.404, z: -301.707 }, { x: 933.198, z: -305.837 }, { x: 937.104, z: -308.953 }, { x: 941.523, z: -311.332 }, { x: 945.527, z: -314.339 }, { x: 949.701, z: -317.102 }, { x: 954.074, z: -319.563 }, { x: 957.912, z: -322.784 }, { x: 961.546, z: -326.244 }, { x: 965.462, z: -329.388 }, { x: 969.319, z: -332.601 }, { x: 972.813, z: -336.203 }, { x: 975.987, z: -340.094 }, { x: 979.265, z: -343.895 }, { x: 982.890, z: -347.362 }, { x: 986.875, z: -350.416 }, { x: 990.924, z: -353.382 }, { x: 994.954, z: -356.377 }, { x: 998.998, z: -359.336 }, { x: 1003.293, z: -361.621 }, { x: 1007.992, z: -363.356 }, { x: 1012.725, z: -364.986 }, { x: 1016.679, z: -368.064 }, { x: 1021.210, z: -369.947 }, { x: 1025.423, z: -367.516 }, { x: 1027.758, z: -363.079 }, { x: 1029.697, z: -358.471 }, { x: 1030.216, z: -353.505 }, { x: 1028.951, z: -348.657 }, { x: 1026.759, z: -344.144 }, { x: 1024.373, z: -339.723 }, { x: 1022.305, z: -335.147 }, { x: 1020.201, z: -330.588 }, { x: 1017.594, z: -326.297 }, { x: 1014.768, z: -322.144 }, { x: 1011.958, z: -317.981 }, { x: 1008.958, z: -313.959 }, { x: 1005.585, z: -310.236 }, { x: 1002.379, z: -306.369 }, { x: 999.049, z: -302.613 }, { x: 995.099, z: -300.605 }, { x: 992.141, z: -297.392 }, { x: 991.265, z: -292.156 }, { x: 988.138, z: -288.229 }, { x: 984.954, z: -284.344 }, { x: 981.586, z: -280.630 }, { x: 977.483, z: -277.766 }, { x: 972.748, z: -276.135 }, { x: 967.787, z: -275.511 }, { x: 962.800, z: -275.727 }, { x: 958.118, z: -274.022 }, { x: 953.955, z: -271.233 }, { x: 950.339, z: -267.755 }, { x: 946.871, z: -264.133 }, { x: 943.508, z: -260.415 }, { x: 940.083, z: -256.756 }, { x: 936.438, z: -253.308 }, { x: 932.718, z: -249.939 }, { x: 928.853, z: -246.740 }, { x: 924.846, z: -243.723 }, { x: 920.439, z: -241.316 }, { x: 915.968, z: -239.025 }, { x: 911.510, z: -236.712 }, { x: 907.075, z: -234.353 }, { x: 902.688, z: -231.907 }, { x: 898.251, z: -229.550 }, { x: 894.151, z: -226.669 }, { x: 891.218, z: -222.629 }, { x: 889.245, z: -218.010 }, { x: 887.316, z: -213.385 }, { x: 885.482, z: -208.719 }, { x: 883.764, z: -204.000 }, { x: 882.228, z: -199.220 }, { x: 880.739, z: -194.423 }, { x: 878.817, z: -189.784 }, { x: 876.532, z: -185.314 }, { x: 873.594, z: -181.270 }, { x: 869.339, z: -178.644 }, { x: 864.598, z: -177.130 }, { x: 859.726, z: -178.152 }, { x: 855.481, z: -180.820 }, { x: 851.379, z: -183.719 }, { x: 847.189, z: -186.476 }, { x: 845.103, z: -190.887 }, { x: 846.217, z: -195.759 }, { x: 847.635, z: -200.577 }, { x: 848.744, z: -205.474 }, { x: 850.217, z: -210.275 }, { x: 852.291, z: -214.846 }, { x: 855.022, z: -219.053 }, { x: 858.761, z: -222.359 }, { x: 862.932, z: -225.124 }, { x: 866.996, z: -228.036 }, { x: 869.823, z: -231.389 }, { x: 872.630, z: -234.897 }, { x: 877.029, z: -235.535 }, { x: 881.891, z: -234.398 }, { x: 886.855, z: -234.602 }, { x: 891.503, z: -236.468 }, { x: 895.449, z: -239.555 }, { x: 899.184, z: -242.910 }, { x: 902.482, z: -246.672 }, { x: 904.096, z: -251.397 }],
        bbox: {
          minX: 845.103 - bboxEpsilon,
          maxX: 1030.216 + bboxEpsilon,
          minZ: -369.947 - bboxEpsilon,
          maxZ: -177.130 + bboxEpsilon,
        }
      },
    }
  },

  2: {
    par: 4,
    panelHoleNumber: 7,
    panelSpawnPosition: "Right",
    heightMap: { grid: HeightMap_Hole_2 },
    teeOffPt: { x: 442.016, y: 229.639, z: 175.681 },
    teeOffPlayerPts: [ { x: 442.841, y: 229.477, z: 166.122 }, { x: 432.699, y: 229.353, z: 174.088 } ],
    teeOffSpawnDirection: "TowardsFlag",
    cartPts: [ { x: 465.233, y: 230.185, z: 172.425 }, { x: 460.387, y: 230.270, z: 166.645 } ],
    flagPt: { x: 611.081, y: 237.705, z: 462.723 },
    spawnBag: true,
    spawnFlag: true,
    teeBoxClubs: [ClubType.DR1],
    cameraAimPts: [ { x: 581.835, y: 234.272, z: 330.783 } ],
    surfaces: {
      [SurfaceType.TeeBox]: {
        hull: [ { x: 459.489, z: 169.856 }, { x: 455.505, z: 166.823 }, { x: 451.496, z: 163.799 }, { x: 447.042, z: 161.549 }, { x: 442.076, z: 160.983 }, { x: 437.361, z: 162.475 }, { x: 433.359, z: 165.503 }, { x: 430.172, z: 169.365 }, { x: 428.581, z: 174.076 }, { x: 428.065, z: 178.973 }, { x: 428.489, z: 183.978 }, { x: 429.665, z: 188.757 }, { x: 432.591, z: 192.828 }, { x: 435.844, z: 196.657 }, { x: 439.154, z: 200.436 }, { x: 442.974, z: 203.683 }, { x: 447.459, z: 205.930 }, { x: 452.363, z: 206.704 }, { x: 457.273, z: 205.668 }, { x: 461.892, z: 203.721 }, { x: 465.908, z: 200.738 }, { x: 469.102, z: 196.887 }, { x: 470.909, z: 192.235 }, { x: 471.025, z: 187.231 }, { x: 469.390, z: 182.516 }, { x: 467.026, z: 178.086 }, { x: 463.954, z: 174.135 }, { x: 460.746, z: 171.004 } ],
        bbox: {
          minX: 428.065 - bboxEpsilon,
          maxX: 471.025 + bboxEpsilon,
          minZ: 160.983 - bboxEpsilon,
          maxZ: 206.704 + bboxEpsilon,
        }
      },
      [SurfaceType.Green]: {
        hull: [ { x: 599.983, z: 476.717 }, { x: 604.240, z: 479.868 }, { x: 608.947, z: 482.314 }, { x: 614.041, z: 483.728 }, { x: 619.331, z: 484.106 }, { x: 624.604, z: 483.821 }, { x: 629.537, z: 481.944 }, { x: 634.142, z: 479.361 }, { x: 638.125, z: 475.897 }, { x: 641.573, z: 471.896 }, { x: 643.163, z: 466.887 }, { x: 643.256, z: 461.584 }, { x: 643.183, z: 456.279 }, { x: 643.117, z: 450.973 }, { x: 643.137, z: 445.666 }, { x: 643.285, z: 440.359 }, { x: 643.579, z: 435.059 }, { x: 643.074, z: 429.806 }, { x: 640.962, z: 424.952 }, { x: 637.559, z: 420.915 }, { x: 633.405, z: 417.624 }, { x: 628.685, z: 415.210 }, { x: 623.840, z: 413.055 }, { x: 618.761, z: 411.595 }, { x: 613.458, z: 411.397 }, { x: 608.163, z: 411.673 }, { x: 602.971, z: 412.712 }, { x: 598.716, z: 415.796 }, { x: 595.555, z: 420.030 }, { x: 593.645, z: 424.975 }, { x: 591.885, z: 429.981 }, { x: 590.297, z: 435.035 }, { x: 590.010, z: 440.332 }, { x: 589.986, z: 445.640 }, { x: 590.060, z: 450.948 }, { x: 589.959, z: 456.256 }, { x: 590.404, z: 461.518 }, { x: 591.787, z: 466.640 }, { x: 594.042, z: 471.391 }, { x: 597.844, z: 475.082 } ],
        bbox: {
          minX: 589.959 - bboxEpsilon,
          maxX: 643.579 + bboxEpsilon,
          minZ: 411.397 - bboxEpsilon,
          maxZ: 484.106 + bboxEpsilon,
        }
      },
      [SurfaceType.Fringe]: {
        hull: [ { x: 600.780, z: 491.123 }, { x: 605.685, z: 493.148 }, { x: 610.539, z: 495.290 }, { x: 615.536, z: 497.034 }, { x: 620.800, z: 496.863 }, { x: 625.794, z: 495.147 }, { x: 630.555, z: 492.867 }, { x: 635.167, z: 490.308 }, { x: 639.238, z: 486.939 }, { x: 642.335, z: 482.703 }, { x: 644.282, z: 477.773 }, { x: 646.455, z: 472.931 }, { x: 648.131, z: 467.915 }, { x: 648.154, z: 462.616 }, { x: 648.569, z: 457.362 }, { x: 649.420, z: 452.174 }, { x: 648.254, z: 447.011 }, { x: 648.251, z: 441.711 }, { x: 648.859, z: 436.440 }, { x: 649.445, z: 431.173 }, { x: 648.368, z: 426.027 }, { x: 645.424, z: 421.645 }, { x: 641.542, z: 418.038 }, { x: 637.225, z: 414.968 }, { x: 632.532, z: 412.502 }, { x: 627.618, z: 410.514 }, { x: 622.528, z: 409.029 }, { x: 617.307, z: 408.116 }, { x: 612.003, z: 408.005 }, { x: 606.726, z: 408.522 }, { x: 601.663, z: 410.072 }, { x: 597.326, z: 413.067 }, { x: 594.128, z: 417.271 }, { x: 591.598, z: 421.931 }, { x: 589.355, z: 426.741 }, { x: 587.411, z: 431.679 }, { x: 585.807, z: 436.738 }, { x: 584.467, z: 441.871 }, { x: 583.170, z: 447.014 }, { x: 581.907, z: 452.167 }, { x: 580.728, z: 457.340 }, { x: 579.851, z: 462.561 }, { x: 580.234, z: 467.827 }, { x: 582.289, z: 472.685 }, { x: 585.013, z: 477.235 }, { x: 588.177, z: 481.495 }, { x: 591.717, z: 485.441 }, { x: 595.972, z: 488.597 }, { x: 600.099, z: 490.784 } ],
        bbox: {
          minX: 579.851 - bboxEpsilon,
          maxX: 649.445 + bboxEpsilon,
          minZ: 408.005 - bboxEpsilon,
          maxZ: 497.034 + bboxEpsilon,
        }
      },
      [SurfaceType.Sand]: [
        { hull: [ { x: 670.649, z: 451.241 }, { x: 673.285, z: 446.765 }, { x: 675.603, z: 442.136 }, { x: 677.809, z: 437.428 }, { x: 679.517, z: 432.552 }, { x: 678.588, z: 427.546 }, { x: 675.919, z: 423.105 }, { x: 671.703, z: 420.312 }, { x: 666.574, z: 420.530 }, { x: 661.550, z: 421.741 }, { x: 657.184, z: 424.436 }, { x: 654.647, z: 428.916 }, { x: 653.193, z: 433.900 }, { x: 652.310, z: 439.017 }, { x: 652.094, z: 444.204 }, { x: 652.042, z: 449.401 }, { x: 652.967, z: 454.442 }, { x: 656.576, z: 457.912 }, { x: 661.583, z: 459.016 }, { x: 665.957, z: 456.542 }, { x: 669.008, z: 453.166 } ], bbox: { minX: 652.042 - bboxEpsilon, maxX: 679.517 + bboxEpsilon, minZ: 420.312 - bboxEpsilon, maxZ: 459.016 + bboxEpsilon }},
        { hull: [ { x: 672.346, z: 401.798 }, { x: 673.857, z: 396.949 }, { x: 677.902, z: 393.798 }, { x: 681.603, z: 390.197 }, { x: 685.804, z: 387.458 }, { x: 690.726, z: 388.800 }, { x: 694.646, z: 392.061 }, { x: 696.452, z: 396.879 }, { x: 695.609, z: 401.902 }, { x: 692.491, z: 406.040 }, { x: 689.104, z: 409.985 }, { x: 685.502, z: 413.710 }, { x: 680.537, z: 414.378 }, { x: 675.557, z: 413.077 }, { x: 671.922, z: 409.673 }, { x: 671.963, z: 404.505 } ], bbox: { minX: 671.922 - bboxEpsilon, maxX: 696.452 + bboxEpsilon, minZ: 387.458 - bboxEpsilon, maxZ: 414.378 + bboxEpsilon }},
        { hull: [ { x: 567.421, z: 374.964 }, { x: 567.436, z: 369.766 }, { x: 567.029, z: 364.601 }, { x: 565.131, z: 359.785 }, { x: 561.371, z: 356.417 }, { x: 556.335, z: 355.971 }, { x: 552.458, z: 359.125 }, { x: 552.032, z: 364.236 }, { x: 552.780, z: 369.355 }, { x: 553.077, z: 374.522 }, { x: 554.185, z: 379.523 }, { x: 556.342, z: 384.232 }, { x: 560.292, z: 387.360 }, { x: 565.305, z: 386.580 }, { x: 567.066, z: 381.943 }, { x: 567.278, z: 376.749 } ], bbox: { minX: 552.032 - bboxEpsilon, maxX: 567.436 + bboxEpsilon, minZ: 355.971 - bboxEpsilon, maxZ: 387.360 + bboxEpsilon }},
        { hull: [ { x: 546.393, z: 353.867 }, { x: 541.467, z: 354.976 }, { x: 536.615, z: 353.460 }, { x: 533.354, z: 349.463 }, { x: 530.931, z: 344.903 }, { x: 529.458, z: 339.972 }, { x: 529.811, z: 334.862 }, { x: 533.806, z: 331.763 }, { x: 538.288, z: 329.216 }, { x: 543.148, z: 327.485 }, { x: 548.183, z: 328.104 }, { x: 551.147, z: 332.199 }, { x: 551.410, z: 337.270 }, { x: 549.342, z: 341.840 }, { x: 547.467, z: 346.616 }, { x: 547.599, z: 351.706 } ], bbox: { minX: 529.458 - bboxEpsilon, maxX: 551.410 + bboxEpsilon, minZ: 327.485 - bboxEpsilon, maxZ: 354.976 + bboxEpsilon }},

      ],
      [SurfaceType.Fairway]: {
        hull: [ { x: 466.639, z: 177.597 }, { x: 471.461, z: 178.755 }, { x: 476.110, z: 180.637 }, { x: 480.933, z: 181.969 }, { x: 485.270, z: 184.500 }, { x: 489.450, z: 187.284 }, { x: 493.480, z: 190.280 }, { x: 497.375, z: 193.450 }, { x: 501.190, z: 196.715 }, { x: 504.790, z: 200.212 }, { x: 508.009, z: 204.058 }, { x: 510.711, z: 208.291 }, { x: 513.302, z: 212.585 }, { x: 515.625, z: 217.034 }, { x: 517.230, z: 221.787 }, { x: 517.934, z: 226.754 }, { x: 518.659, z: 231.718 }, { x: 519.823, z: 236.602 }, { x: 521.694, z: 241.257 }, { x: 524.103, z: 245.654 }, { x: 526.946, z: 249.783 }, { x: 530.048, z: 253.727 }, { x: 533.400, z: 257.452 }, { x: 536.904, z: 261.040 }, { x: 540.798, z: 264.206 }, { x: 544.737, z: 267.309 }, { x: 548.547, z: 270.575 }, { x: 551.309, z: 274.726 }, { x: 553.126, z: 279.404 }, { x: 555.104, z: 284.020 }, { x: 557.300, z: 288.532 }, { x: 560.259, z: 292.585 }, { x: 563.436, z: 296.467 }, { x: 566.613, z: 300.343 }, { x: 570.115, z: 303.920 }, { x: 574.393, z: 306.479 }, { x: 578.018, z: 309.853 }, { x: 582.158, z: 312.579 }, { x: 586.783, z: 314.475 }, { x: 591.476, z: 316.205 }, { x: 596.337, z: 317.398 }, { x: 601.276, z: 318.231 }, { x: 606.173, z: 319.298 }, { x: 611.167, z: 319.560 }, { x: 616.186, z: 319.621 }, { x: 621.138, z: 320.442 }, { x: 625.913, z: 321.985 }, { x: 630.409, z: 324.216 }, { x: 634.735, z: 326.767 }, { x: 638.989, z: 329.429 }, { x: 643.378, z: 331.792 }, { x: 647.593, z: 334.224 }, { x: 650.449, z: 338.325 }, { x: 654.143, z: 341.716 }, { x: 657.962, z: 344.965 }, { x: 660.803, z: 349.092 }, { x: 663.202, z: 353.497 }, { x: 665.145, z: 358.122 }, { x: 667.027, z: 362.773 }, { x: 668.962, z: 367.394 }, { x: 669.657, z: 372.355 }, { x: 670.015, z: 377.352 }, { x: 670.208, z: 382.368 }, { x: 670.189, z: 387.386 }, { x: 669.464, z: 392.333 }, { x: 667.485, z: 396.944 }, { x: 665.090, z: 401.358 }, { x: 662.322, z: 405.545 }, { x: 659.363, z: 409.600 }, { x: 656.428, z: 413.672 }, { x: 653.963, z: 418.035 }, { x: 652.022, z: 422.665 }, { x: 650.232, z: 427.357 }, { x: 646.853, z: 430.806 }, { x: 642.181, z: 429.662 }, { x: 639.120, z: 425.719 }, { x: 636.405, z: 421.497 }, { x: 632.950, z: 417.860 }, { x: 629.045, z: 414.719 }, { x: 624.490, z: 412.615 }, { x: 619.728, z: 411.053 }, { x: 614.732, z: 410.597 }, { x: 609.718, z: 410.799 }, { x: 604.776, z: 411.648 }, { x: 600.278, z: 413.804 }, { x: 596.828, z: 417.429 }, { x: 594.150, z: 421.655 }, { x: 592.214, z: 426.287 }, { x: 590.646, z: 431.053 }, { x: 589.388, z: 435.917 }, { x: 588.294, z: 440.819 }, { x: 587.225, z: 445.724 }, { x: 586.188, z: 450.637 }, { x: 585.667, z: 455.626 }, { x: 586.129, z: 460.624 }, { x: 585.594, z: 465.565 }, { x: 582.510, z: 469.290 }, { x: 579.272, z: 466.169 }, { x: 577.925, z: 461.045 }, { x: 576.909, z: 456.135 }, { x: 576.200, z: 451.169 }, { x: 575.586, z: 446.193 }, { x: 575.035, z: 441.203 }, { x: 574.402, z: 436.228 }, { x: 573.492, z: 431.295 }, { x: 572.430, z: 426.392 }, { x: 571.802, z: 421.418 }, { x: 571.486, z: 416.411 }, { x: 571.018, z: 411.418 }, { x: 570.431, z: 406.444 }, { x: 569.551, z: 401.517 }, { x: 568.384, z: 396.651 }, { x: 569.361, z: 391.801 }, { x: 571.532, z: 387.277 }, { x: 573.250, z: 382.578 }, { x: 573.922, z: 377.605 }, { x: 574.163, z: 372.594 }, { x: 573.925, z: 367.587 }, { x: 572.058, z: 362.941 }, { x: 569.160, z: 358.849 }, { x: 566.477, z: 354.612 }, { x: 564.595, z: 349.991 }, { x: 564.389, z: 345.006 }, { x: 564.687, z: 340.013 }, { x: 564.310, z: 335.069 }, { x: 561.950, z: 330.676 }, { x: 558.402, z: 327.150 }, { x: 554.061, z: 324.659 }, { x: 549.387, z: 322.821 }, { x: 544.607, z: 321.286 }, { x: 539.814, z: 319.842 }, { x: 535.105, z: 318.146 }, { x: 530.334, z: 316.622 }, { x: 525.522, z: 315.193 }, { x: 521.194, z: 312.670 }, { x: 516.735, z: 310.399 }, { x: 511.874, z: 309.212 }, { x: 507.907, z: 306.198 }, { x: 504.531, z: 302.492 }, { x: 500.994, z: 298.931 }, { x: 497.371, z: 295.459 }, { x: 493.813, z: 291.914 }, { x: 490.477, z: 288.158 }, { x: 487.102, z: 284.438 }, { x: 483.661, z: 280.782 }, { x: 480.062, z: 277.283 }, { x: 476.467, z: 273.799 }, { x: 472.640, z: 270.569 }, { x: 468.698, z: 267.483 }, { x: 464.652, z: 264.541 }, { x: 460.451, z: 261.817 }, { x: 456.196, z: 259.170 }, { x: 452.214, z: 256.141 }, { x: 448.641, z: 252.617 }, { x: 445.401, z: 248.779 }, { x: 442.288, z: 244.846 }, { x: 439.400, z: 240.738 }, { x: 436.866, z: 236.404 }, { x: 434.772, z: 231.849 }, { x: 433.086, z: 227.126 }, { x: 431.726, z: 222.294 }, { x: 430.729, z: 217.372 }, { x: 429.745, z: 212.446 }, { x: 428.833, z: 207.506 }, { x: 428.211, z: 202.528 }, { x: 428.657, z: 197.543 }, { x: 430.328, z: 192.833 }, { x: 434.277, z: 190.213 }, { x: 438.720, z: 192.344 }, { x: 443.001, z: 194.913 }, { x: 447.983, z: 194.812 }, { x: 452.343, z: 192.489 }, { x: 455.559, z: 188.632 }, { x: 458.620, z: 184.667 }, { x: 461.940, z: 180.919 }, { x: 465.475, z: 178.321 } ],
        bbox: {
          minX: 428.211 - bboxEpsilon,
          maxX: 670.208 + bboxEpsilon,
          minZ: 177.597 - bboxEpsilon,
          maxZ: 469.290 + bboxEpsilon,
        }
      },
    }
  },

  3: {
    par: 4,
    panelHoleNumber: 18,
    panelSpawnPosition: "Right",
    heightMap: { grid: HeightMap_Hole_3 },
    teeOffPt: { x: 123.241, y: 225.756, z: 234.622 },
    teeOffPlayerPts: [ { x: 113.287, y: 225.726, z: 236.718 }, { x: 119.711, y: 225.786, z: 243.537 } ],
    teeOffSpawnDirection: "TowardsFlag",
    cartPts: [ { x: 115.188, y: 225.430, z: 224.785 }, { x: 107.414, y: 225.474, z: 229.771 } ],
    flagPt: {x: 302.008, y: 227.547, z: 53.044},
    spawnBag: true,
    spawnFlag: false,
    teeBoxClubs: [ClubType.DR1, ClubType.DR3, ClubType.I4],
    cameraAimPts: [ { x: 242.277, y: 224.939, z: 109.936 } ],
    surfaces: {
      [SurfaceType.TeeBox]: {
        hull: [
          { x: 117.094, z: 233.105 }, { x: 113.177, z: 236.198 }, { x: 112.096, z: 240.390 }, { x: 115.408, z: 244.453 }, { x: 120.305, z: 244.099 }, { x: 124.136, z: 241.003 }, { x: 127.379, z: 237.494 }, { x: 124.620, z: 233.114 }, { x: 120.901, z: 230.241 }
        ],
        bbox: {
          minX: 112.096 - bboxEpsilon,
          maxX: 127.379 + bboxEpsilon,
          minZ: 230.241 - bboxEpsilon,
          maxZ: 244.453 + bboxEpsilon,
        }
      },
      [SurfaceType.Green]: {
        hull: [ { x: 287.700, z: 57.358 }, { x: 288.912, z: 52.899 }, { x: 291.195, z: 49.159 }, { x: 295.499, z: 47.785 }, { x: 299.356, z: 45.395 }, { x: 303.445, z: 44.087 }, { x: 306.828, z: 47.070 }, { x: 308.718, z: 51.153 }, { x: 309.144, z: 55.676 }, { x: 308.877, z: 60.212 }, { x: 306.857, z: 64.213 }, { x: 302.927, z: 66.477 }, { x: 298.732, z: 68.143 }, { x: 294.275, z: 67.585 }, { x: 290.280, z: 65.421 }, { x: 287.363, z: 62.010 } ],
        bbox: {
          minX: 287.363 - bboxEpsilon,
          maxX: 309.144 + bboxEpsilon,
          minZ: 44.087 - bboxEpsilon,
          maxZ: 68.143 + bboxEpsilon,
        }
      },
      [SurfaceType.Fringe]: {
        hull: [ { x: 299.163, z: 70.833 }, { x: 303.992, z: 68.939 }, { x: 308.968, z: 67.556 }, { x: 313.997, z: 66.433 }, { x: 317.532, z: 62.743 }, { x: 316.255, z: 57.955 }, { x: 312.404, z: 54.500 }, { x: 310.762, z: 49.581 }, { x: 308.299, z: 45.042 }, { x: 304.345, z: 41.768 }, { x: 299.472, z: 42.705 }, { x: 294.904, z: 45.165 }, { x: 289.962, z: 46.776 }, { x: 286.804, z: 50.704 }, { x: 285.366, z: 55.701 }, { x: 284.460, z: 60.751 }, { x: 286.838, z: 65.303 }, { x: 290.604, z: 68.838 }, { x: 295.408, z: 70.751 } ],
        bbox: {
          minX: 284.460 - bboxEpsilon,
          maxX: 317.532 + bboxEpsilon,
          minZ: 41.768 - bboxEpsilon,
          maxZ: 70.833 + bboxEpsilon,
        }
      },
      [SurfaceType.Sand]: [
        { hull: [ { x: 290.582, z: 34.478 }, { x: 293.739, z: 31.296 }, { x: 295.925, z: 27.374 }, { x: 300.330, z: 26.906 }, { x: 304.022, z: 29.415 }, { x: 308.013, z: 31.451 }, { x: 308.917, z: 35.645 }, { x: 304.816, z: 37.298 }, { x: 300.474, z: 36.109 }, { x: 296.462, z: 38.067 }, { x: 293.092, z: 40.978 }, { x: 289.052, z: 39.162 }, { x: 290.295, z: 35.054 } ], bbox: { minX: 289.052 - bboxEpsilon, maxX: 308.917 + bboxEpsilon, minZ: 26.906 - bboxEpsilon, maxZ: 40.978 + bboxEpsilon }},
        { hull: [ { x: 323.631, z: 41.340 }, { x: 326.847, z: 45.495 }, { x: 326.521, z: 50.234 }, { x: 326.339, z: 55.176 }, { x: 324.360, z: 59.026 }, { x: 321.205, z: 55.946 }, { x: 318.034, z: 52.719 }, { x: 315.656, z: 48.958 }, { x: 315.086, z: 44.469 }, { x: 314.311, z: 40.170 }, { x: 318.777, z: 39.594 }, { x: 322.853, z: 40.840 } ], bbox: { minX: 314.311 - bboxEpsilon, maxX: 326.847 + bboxEpsilon, minZ: 39.594 - bboxEpsilon, maxZ: 59.026 + bboxEpsilon }},
        { hull: [ { x: 196.367, z: 188.825 }, { x: 196.959, z: 193.300 }, { x: 198.231, z: 197.754 }, { x: 194.670, z: 200.532 }, { x: 190.787, z: 198.475 }, { x: 188.239, z: 194.759 }, { x: 185.836, z: 190.916 }, { x: 185.982, z: 186.487 }, { x: 188.515, z: 182.754 }, { x: 192.736, z: 181.681 }, { x: 195.850, z: 184.740 } ], bbox: { minX: 185.836 - bboxEpsilon, maxX: 198.231 + bboxEpsilon, minZ: 181.681 - bboxEpsilon, maxZ: 200.532 + bboxEpsilon }},
      ],
      [SurfaceType.Fairway]: {
        hull: [
          { x: 125.595, z: 255.217 }, { x: 120.679, z: 255.194 }, { x: 116.448, z: 251.367 }, { x: 112.670, z: 247.088 }, { x: 109.066, z: 242.655 }, { x: 106.080, z: 237.795 }, { x: 103.899, z: 232.532 }, { x: 104.705, z: 227.082 }, { x: 108.428, z: 222.764 }, { x: 112.774, z: 219.482 }, { x: 117.442, z: 216.326 }, { x: 122.944, z: 214.982 }, { x: 128.584, z: 214.091 }, { x: 134.156, z: 212.830 }, { x: 139.602, z: 211.119 }, { x: 144.548, z: 208.307 }, { x: 149.402, z: 205.301 }, { x: 153.762, z: 201.617 }, { x: 158.035, z: 197.918 }, { x: 160.540, z: 192.881 }, { x: 161.812, z: 187.394 }, { x: 162.996, z: 181.872 }, { x: 165.133, z: 176.691 }, { x: 168.959, z: 172.469 }, { x: 174.071, z: 170.105 }, { x: 179.610, z: 168.758 }, { x: 185.115, z: 167.255 }, { x: 189.922, z: 166.002 }, { x: 195.156, z: 163.801 }, { x: 199.258, z: 159.860 }, { x: 202.958, z: 155.506 }, { x: 206.186, z: 150.800 }, { x: 208.865, z: 145.758 }, { x: 210.806, z: 140.400 }, { x: 212.514, z: 134.957 }, { x: 214.108, z: 129.474 }, { x: 216.937, z: 124.540 }, { x: 220.817, z: 120.351 }, { x: 224.956, z: 116.412 }, { x: 229.211, z: 112.599 }, { x: 233.203, z: 108.513 }, { x: 236.701, z: 104.012 }, { x: 239.259, z: 98.931 }, { x: 240.851, z: 93.461 }, { x: 242.010, z: 87.873 }, { x: 243.821, z: 82.475 }, { x: 246.532, z: 77.449 }, { x: 249.666, z: 72.685 }, { x: 253.501, z: 68.464 }, { x: 257.843, z: 64.759 }, { x: 262.714, z: 61.795 }, { x: 268.188, z: 60.230 }, { x: 273.844, z: 60.614 }, { x: 278.941, z: 63.041 }, { x: 282.833, z: 67.202 }, { x: 284.701, z: 72.487 }, { x: 283.655, z: 78.006 }, { x: 280.144, z: 82.477 }, { x: 275.910, z: 86.305 }, { x: 271.698, z: 90.166 }, { x: 267.968, z: 94.481 }, { x: 263.915, z: 98.478 }, { x: 259.409, z: 101.982 }, { x: 255.136, z: 105.768 }, { x: 251.555, z: 110.203 }, { x: 248.990, z: 115.283 }, { x: 247.315, z: 120.727 }, { x: 245.849, z: 126.221 }, { x: 244.472, z: 131.757 }, { x: 242.691, z: 137.180 }, { x: 240.197, z: 142.307 }, { x: 236.939, z: 146.995 }, { x: 233.180, z: 151.296 }, { x: 228.860, z: 155.023 }, { x: 224.099, z: 158.171 }, { x: 219.458, z: 161.480 }, { x: 215.790, z: 165.837 }, { x: 212.699, z: 170.642 }, { x: 208.772, z: 174.741 }, { x: 203.622, z: 177.115 }, { x: 197.986, z: 177.391 }, { x: 192.302, z: 176.933 }, { x: 186.948, z: 178.714 }, { x: 183.040, z: 182.752 }, { x: 181.524, z: 188.221 }, { x: 182.804, z: 193.714 }, { x: 185.474, z: 198.757 }, { x: 188.125, z: 203.758 }, { x: 186.780, z: 209.117 }, { x: 182.521, z: 212.732 }, { x: 176.980, z: 213.980 }, { x: 171.941, z: 216.537 }, { x: 167.484, z: 220.095 }, { x: 163.328, z: 224.003 }, { x: 159.922, z: 228.580 }, { x: 155.045, z: 231.087 }, { x: 149.408, z: 231.953 }, { x: 144.205, z: 234.260 }, { x: 139.761, z: 237.818 }, { x: 136.069, z: 242.177 }, { x: 132.528, z: 246.654 }, { x: 129.206, z: 251.300 }, { x: 126.173, z: 254.721 }
        ],
        bbox: {
          minX: 103.899 - bboxEpsilon,
          maxX: 284.701 + bboxEpsilon,
          minZ: 60.230 - bboxEpsilon,
          maxZ: 255.217 + bboxEpsilon,
        }
      }
    },
  },

  4: {
    par: 5,
    panelHoleNumber: 10,
    panelSpawnPosition: "Left",
    heightMap: { grid: HeightMap_Hole_4 },
    teeOffPt: { x: -44.071, y: 218.87, z: 584.287 },
    teeOffPlayerPts: [ { x: -52.474, y: 218.571, z: 580.706 }, { x: -51.893, y: 218.484, z: 589.445 } ],
    teeOffSpawnDirection: "TowardsTeeOff",
    cartPts: [ { x: -41.029, y: 219.682, z: 601.249 }, { x: -48.054, y: 219.635, z: 603.051 } ],
    flagPt: { x: 244.598, y: 221.15, z: 285.925 },
    spawnBag: true,
    spawnFlag: false,
    teeBoxClubs: [ClubType.DR1],
    cameraAimPts: [ { x: 185.254, y: 224.554, z: 541.890 }, { x: 301.970, y: 225.389, z: 442.112 }/*, { x: 285.642, y: 224.872, z: 374.935 }*/ ],
    surfaces: {
      [SurfaceType.OutOfBounds]: {
        hull: [ { x: 206.148, z: 328.168 }, { x: 208.438, z: 337.064 }, { x: 204.388, z: 344.686 }, { x: 195.829, z: 348.315 }, { x: 189.119, z: 354.637 }, { x: 186.268, z: 363.404 }, { x: 185.347, z: 372.676 }, { x: 184.628, z: 381.962 }, { x: 181.870, z: 390.863 }, { x: 177.811, z: 399.257 }, { x: 173.225, z: 407.379 }, { x: 168.712, z: 415.542 }, { x: 164.049, z: 423.617 }, { x: 157.819, z: 430.533 }, { x: 151.069, z: 436.972 }, { x: 144.619, z: 443.713 }, { x: 138.727, z: 450.927 }, { x: 132.318, z: 457.675 }, { x: 125.372, z: 463.901 }, { x: 119.082, z: 470.775 }, { x: 113.156, z: 477.970 }, { x: 107.116, z: 485.076 }, { x: 100.995, z: 492.095 }, { x: 94.696, z: 498.901 }, { x: 87.877, z: 505.214 }, { x: 80.432, z: 510.808 }, { x: 72.663, z: 515.883 }, { x: 64.789, z: 520.740 }, { x: 56.612, z: 525.216 }, { x: 48.378, z: 529.592 }, { x: 39.901, z: 533.476 }, { x: 30.812, z: 535.088 }, { x: 22.039, z: 532.263 }, { x: 16.428, z: 524.947 }, { x: 16.913, z: 515.881 }, { x: 22.262, z: 508.298 }, { x: 28.914, z: 501.770 }, { x: 35.667, z: 495.341 }, { x: 42.414, z: 488.907 }, { x: 49.148, z: 482.494 }, { x: 55.886, z: 476.106 }, { x: 62.651, z: 469.746 }, { x: 69.731, z: 463.692 }, { x: 76.807, z: 457.649 }, { x: 83.890, z: 451.597 }, { x: 90.690, z: 445.778 }, { x: 97.140, z: 439.237 }, { x: 103.401, z: 432.485 }, { x: 109.635, z: 425.739 }, { x: 115.882, z: 418.972 }, { x: 122.011, z: 412.099 }, { x: 128.040, z: 405.148 }, { x: 133.386, z: 397.719 }, { x: 138.748, z: 390.240 }, { x: 144.107, z: 382.778 }, { x: 149.447, z: 375.345 }, { x: 154.583, z: 367.790 }, { x: 159.607, z: 360.169 }, { x: 164.528, z: 352.432 }, { x: 169.445, z: 344.665 }, { x: 174.337, z: 336.923 }, { x: 179.298, z: 329.238 }, { x: 186.783, z: 324.327 }, { x: 195.822, z: 323.359 }, { x: 204.342, z: 326.113 } ],
        bbox: {
          minX: 16.428 - bboxEpsilon,
          maxX: 208.438 + bboxEpsilon,
          minZ: 323.359 - bboxEpsilon,
          maxZ: 535.088 + bboxEpsilon,
        }
      },
      [SurfaceType.TeeBox]: { 
        hull: [ { x: -53.682, z: 586.243 }, { x: -49.924, z: 589.026 }, { x: -45.106, z: 588.975 }, { x: -40.274, z: 588.890 }, { x: -35.443, z: 588.797 }, { x: -30.617, z: 588.706 }, { x: -25.794, z: 588.459 }, { x: -20.987, z: 587.973 }, { x: -16.233, z: 587.211 }, { x: -11.972, z: 585.466 }, { x: -11.417, z: 580.888 }, { x: -14.640, z: 577.827 }, { x: -19.445, z: 578.266 }, { x: -24.233, z: 578.921 }, { x: -29.017, z: 579.601 }, { x: -33.836, z: 579.850 }, { x: -38.668, z: 579.788 }, { x: -43.499, z: 579.739 }, { x: -48.269, z: 579.621 }, { x: -52.696, z: 581.064 }, { x: -54.105, z: 585.472 } ],
        bbox: {
          minX: -54.105 - bboxEpsilon,
          maxX: -11.417 + bboxEpsilon,
          minZ: 577.827 - bboxEpsilon,
          maxZ: 589.274 + bboxEpsilon 
        } 
      },
      [SurfaceType.Green]: {
        hull: [ { x: 236.826, z: 275.745 }, { x: 240.260, z: 272.786 }, { x: 242.987, z: 269.146 }, { x: 245.964, z: 265.720 }, { x: 249.812, z: 263.329 }, { x: 254.188, z: 262.676 }, { x: 258.261, z: 265.836 }, { x: 260.441, z: 270.112 }, { x: 263.275, z: 273.972 }, { x: 266.272, z: 277.729 }, { x: 267.239, z: 282.400 }, { x: 266.593, z: 287.177 }, { x: 264.968, z: 291.717 }, { x: 263.302, z: 296.250 }, { x: 262.029, z: 300.912 }, { x: 260.136, z: 305.333 }, { x: 256.757, z: 308.725 }, { x: 252.363, z: 310.651 }, { x: 247.577, z: 310.860 }, { x: 242.865, z: 309.803 }, { x: 238.241, z: 308.409 }, { x: 234.027, z: 306.101 }, { x: 231.134, z: 302.290 }, { x: 228.814, z: 298.061 }, { x: 227.452, z: 293.468 }, { x: 227.379, z: 288.672 }, { x: 228.317, z: 283.957 }, { x: 231.008, z: 280.026 }, { x: 234.762, z: 276.987 } ],
        bbox: {
          minX: 227.379 - bboxEpsilon,
          maxX: 267.239 + bboxEpsilon,
          minZ: 262.676 - bboxEpsilon,
          maxZ: 310.86 + bboxEpsilon,
        }
      },
      [SurfaceType.Fringe]: {
        hull: [ { x: 257.438, z: 256.552 }, { x: 261.962, z: 259.021 }, { x: 263.879, z: 263.945 }, { x: 265.932, z: 268.827 }, { x: 267.872, z: 273.767 }, { x: 269.732, z: 278.735 }, { x: 271.641, z: 283.686 }, { x: 272.749, z: 288.851 }, { x: 270.370, z: 293.415 }, { x: 268.284, z: 298.255 }, { x: 268.012, z: 303.541 }, { x: 266.573, z: 308.601 }, { x: 266.329, z: 313.894 }, { x: 264.797, z: 318.929 }, { x: 261.424, z: 322.934 }, { x: 256.536, z: 324.767 }, { x: 252.151, z: 322.098 }, { x: 248.007, z: 318.853 }, { x: 243.252, z: 316.527 }, { x: 238.045, z: 315.594 }, { x: 232.922, z: 314.237 }, { x: 227.838, z: 312.758 }, { x: 222.822, z: 311.245 }, { x: 219.296, z: 307.490 }, { x: 218.476, z: 302.283 }, { x: 217.652, z: 297.044 }, { x: 216.572, z: 291.853 }, { x: 217.083, z: 286.620 }, { x: 219.409, z: 281.863 }, { x: 222.876, z: 277.880 }, { x: 227.594, z: 275.514 }, { x: 232.575, z: 273.697 }, { x: 237.085, z: 270.912 }, { x: 240.402, z: 266.805 }, { x: 243.076, z: 262.226 }, { x: 246.279, z: 258.055 }, { x: 251.187, z: 256.212 }, { x: 256.157, z: 256.432 } ],
        bbox: {
          minX: 216.572 - bboxEpsilon,
          maxX: 272.749 + bboxEpsilon,
          minZ: 256.212 - bboxEpsilon,
          maxZ: 324.767 + bboxEpsilon,
        }
      },
      [SurfaceType.Sand]: [
        { hull: [ { x: 256.468, z: 497.881 }, { x: 259.336, z: 495.917 }, { x: 262.666, z: 494.886 }, { x: 266.138, z: 494.520 }, { x: 269.615, z: 494.748 }, { x: 272.910, z: 495.759 }, { x: 274.994, z: 498.445 }, { x: 274.702, z: 502.053 }, { x: 272.332, z: 504.565 }, { x: 268.995, z: 505.497 }, { x: 265.548, z: 505.661 }, { x: 262.214, z: 506.633 }, { x: 258.823, z: 507.315 }, { x: 255.989, z: 505.023 }, { x: 255.346, z: 501.651 } ], bbox: { minX: 255.346 - bboxEpsilon, maxX: 274.994 + bboxEpsilon, minZ: 494.520 - bboxEpsilon, maxZ: 507.315 + bboxEpsilon } },
        { hull: [ { x: 238.534, z: 461.119 }, { x: 238.889, z: 457.521 }, { x: 240.930, z: 453.938 }, { x: 243.982, z: 450.937 }, { x: 247.253, z: 448.192 }, { x: 251.348, z: 447.079 }, { x: 255.557, z: 446.451 }, { x: 259.526, z: 447.896 }, { x: 262.978, z: 450.322 }, { x: 263.214, z: 454.327 }, { x: 260.652, z: 457.573 }, { x: 257.283, z: 459.996 }, { x: 253.442, z: 461.833 }, { x: 249.552, z: 463.630 }, { x: 245.560, z: 465.154 }, { x: 241.428, z: 464.714 }, { x: 238.560, z: 462.086 } ], bbox: { minX: 238.534 - bboxEpsilon, maxX: 263.214 + bboxEpsilon, minZ: 446.451 - bboxEpsilon, maxZ: 465.154 + bboxEpsilon } },
        { hull: [ { x: 263.551, z: 427.149 }, { x: 263.799, z: 423.600 }, { x: 264.757, z: 419.599 }, { x: 266.532, z: 415.727 }, { x: 269.611, z: 412.807 }, { x: 273.674, z: 411.634 }, { x: 277.878, z: 411.740 }, { x: 280.701, z: 414.729 }, { x: 280.786, z: 418.936 }, { x: 279.253, z: 422.839 }, { x: 277.936, z: 426.915 }, { x: 275.540, z: 430.342 }, { x: 271.561, z: 431.632 }, { x: 267.313, z: 431.480 }, { x: 264.088, z: 428.956 } ], bbox: { minX: 263.551 - bboxEpsilon, maxX: 280.786 + bboxEpsilon, minZ: 411.634 - bboxEpsilon, maxZ: 431.632 + bboxEpsilon } },
        { hull: [ { x: 240.203, z: 331.398 }, { x: 236.177, z: 330.129 }, { x: 232.078, z: 328.891 }, { x: 227.855, z: 328.531 }, { x: 224.183, z: 328.639 }, { x: 221.239, z: 327.069 }, { x: 219.633, z: 323.993 }, { x: 219.694, z: 320.586 }, { x: 221.530, z: 317.645 }, { x: 224.746, z: 316.474 }, { x: 228.095, z: 317.347 }, { x: 231.391, z: 318.482 }, { x: 234.859, z: 318.875 }, { x: 238.276, z: 319.522 }, { x: 241.625, z: 320.525 }, { x: 244.811, z: 321.968 }, { x: 247.558, z: 324.075 }, { x: 249.337, z: 327.025 }, { x: 249.813, z: 330.460 }, { x: 247.375, z: 333.081 }, { x: 243.943, z: 332.785 }, { x: 241.122, z: 331.639 } ], bbox: { minX: 219.633 - bboxEpsilon, maxX: 249.813 + bboxEpsilon, minZ: 316.474 - bboxEpsilon, maxZ: 333.081 + bboxEpsilon } },
        { hull: [ { x: 272.756, z: 298.493 }, { x: 274.664, z: 295.571 }, { x: 276.413, z: 292.565 }, { x: 276.000, z: 289.130 }, { x: 274.630, z: 285.917 }, { x: 273.838, z: 282.545 }, { x: 275.425, z: 279.614 }, { x: 278.809, z: 279.067 }, { x: 282.052, z: 280.288 }, { x: 284.462, z: 282.801 }, { x: 286.002, z: 285.880 }, { x: 287.120, z: 289.163 }, { x: 287.441, z: 292.621 }, { x: 286.561, z: 296.000 }, { x: 284.856, z: 299.021 }, { x: 282.593, z: 301.589 }, { x: 279.973, z: 303.842 }, { x: 276.677, z: 304.808 }, { x: 273.516, z: 303.601 }, { x: 272.428, z: 300.166 } ], bbox: { minX: 272.428 - bboxEpsilon, maxX: 287.441 + bboxEpsilon, minZ: 279.067 - bboxEpsilon, maxZ: 304.808 + bboxEpsilon } },
        { hull: [ { x: 229.307, z: 270.404 }, { x: 225.641, z: 270.304 }, { x: 222.935, z: 268.054 }, { x: 222.479, z: 264.383 }, { x: 223.429, z: 260.758 }, { x: 225.376, z: 257.603 }, { x: 228.262, z: 255.247 }, { x: 231.750, z: 253.936 }, { x: 235.282, z: 254.757 }, { x: 237.796, z: 257.472 }, { x: 238.442, z: 261.082 }, { x: 237.444, z: 264.673 }, { x: 235.176, z: 267.607 }, { x: 231.904, z: 269.401 } ], bbox: { minX: 222.479 - bboxEpsilon, maxX: 238.442 + bboxEpsilon, minZ: 253.936 - bboxEpsilon, maxZ: 270.404 + bboxEpsilon } }
      ],
      [SurfaceType.Fairway]: {
        hull: [ { x: 72.429, z: 576.479 }, { x: 80.889, z: 573.264 }, { x: 89.206, z: 569.648 }, { x: 97.331, z: 565.819 }, { x: 105.759, z: 562.704 }, { x: 114.294, z: 559.716 }, { x: 123.252, z: 560.401 }, { x: 132.227, z: 561.125 }, { x: 141.282, z: 561.017 }, { x: 150.186, z: 559.358 }, { x: 158.971, z: 557.198 }, { x: 167.816, z: 556.683 }, { x: 176.288, z: 559.699 }, { x: 184.314, z: 559.448 }, { x: 193.370, z: 559.418 }, { x: 202.118, z: 557.568 }, { x: 209.632, z: 552.562 }, { x: 215.748, z: 545.943 }, { x: 218.965, z: 537.507 }, { x: 222.526, z: 529.193 }, { x: 227.153, z: 521.431 }, { x: 233.630, z: 515.129 }, { x: 238.989, z: 507.826 }, { x: 245.330, z: 501.388 }, { x: 252.927, z: 496.507 }, { x: 260.688, z: 491.846 }, { x: 269.085, z: 488.652 }, { x: 277.702, z: 485.966 }, { x: 285.968, z: 482.281 }, { x: 294.772, z: 480.769 }, { x: 303.167, z: 477.717 }, { x: 310.430, z: 472.304 }, { x: 317.175, z: 466.255 }, { x: 323.402, z: 459.685 }, { x: 327.838, z: 451.832 }, { x: 329.792, z: 443.020 }, { x: 329.119, z: 434.030 }, { x: 325.868, z: 425.602 }, { x: 321.295, z: 417.801 }, { x: 318.096, z: 409.384 }, { x: 316.546, z: 400.460 }, { x: 314.660, z: 391.611 }, { x: 310.410, z: 383.659 }, { x: 304.162, z: 377.155 }, { x: 295.740, z: 374.341 }, { x: 286.787, z: 374.488 }, { x: 280.098, z: 380.169 }, { x: 277.454, z: 388.784 }, { x: 278.494, z: 397.754 }, { x: 280.869, z: 406.441 }, { x: 284.468, z: 414.714 }, { x: 284.283, z: 423.677 }, { x: 279.889, z: 431.449 }, { x: 273.943, z: 438.238 }, { x: 270.946, z: 446.773 }, { x: 268.177, z: 455.396 }, { x: 263.818, z: 463.165 }, { x: 256.473, z: 468.331 }, { x: 247.690, z: 470.442 }, { x: 239.615, z: 474.444 }, { x: 231.825, z: 479.053 }, { x: 224.248, z: 484.002 }, { x: 217.330, z: 489.823 }, { x: 212.017, z: 497.158 }, { x: 205.756, z: 503.637 }, { x: 197.518, z: 507.155 }, { x: 189.630, z: 511.115 }, { x: 182.824, z: 517.093 }, { x: 175.464, z: 522.371 }, { x: 167.892, z: 527.329 }, { x: 159.760, z: 531.291 }, { x: 150.999, z: 533.551 }, { x: 142.053, z: 534.925 }, { x: 133.137, z: 536.433 }, { x: 124.439, z: 538.968 }, { x: 115.707, z: 541.373 }, { x: 106.881, z: 543.411 }, { x: 97.864, z: 543.948 }, { x: 88.834, z: 543.428 }, { x: 79.843, z: 544.098 }, { x: 70.949, z: 545.798 }, { x: 62.175, z: 548.003 }, { x: 55.193, z: 553.469 }, { x: 52.051, z: 561.899 }, { x: 52.969, z: 570.714 }, { x: 58.861, z: 577.395 }, { x: 67.640, z: 577.909 } ],
        bbox: {
          minX: 52.051 - bboxEpsilon,
          maxX: 329.792 + bboxEpsilon,
          minZ: 374.341 - bboxEpsilon,
          maxZ: 577.909 + bboxEpsilon 
        } 
      },
      [SurfaceType.Water]: {
        hull:[ {x:117.343,z:498.438},{x:123.411,z:505.445},{x:132.79,z:504.795},{x:141.841,z:503.324},{x:149.104,z:497.579},{x:156.965,z:492.781},{x:164.605,z:487.669},{x:171.719,z:481.716},{x:178.978,z:475.925},{x:186.13,z:470.002},{x:192.702,z:463.454},{x:199.923,z:457.633},{x:207.801,z:452.947},{x:215.012,z:448.193},{x:218.498,z:439.705},{x:222.844,z:431.505},{x:229.936,z:425.715},{x:236.215,z:418.988},{x:241.797,z:411.585},{x:244.88,z:402.897},{x:246.265,z:393.718},{x:245.448,z:384.572},{x:242.432,z:375.794},{x:237.012,z:368.289},{x:231.927,z:360.526},{x:224.856,z:354.634},{x:217.866,z:348.639},{x:210.937,z:342.845},{x:201.975,z:343.458},{x:193.403,z:346.961},{x:187.142,z:353.663},{x:183.77,z:362.263},{x:183.084,z:371.513},{x:182.611,z:380.775},{x:179.858,z:389.633},{x:176.406,z:398.238},{x:171.757,z:406.269},{x:166.912,z:414.163},{x:162.646,z:422.406},{x:157.091,z:429.778},{x:150.351,z:436.165},{x:143.479,z:442.412},{x:137.255,z:449.298},{x:131.105,z:456.248},{x:123.368,z:461.35},{x:118.074,z:468.71},{x:115.693,z:477.685},{x:114.466,z:486.879},{x:116.198,z:495.724}],
        bbox:{minX:114.466-bboxEpsilon,maxX:246.265+bboxEpsilon,minZ:342.845-bboxEpsilon,maxZ:505.445+bboxEpsilon}}
    }
  },

  5: {
    par: 3,
    panelHoleNumber: 1,
    panelSpawnPosition: "Right",
    heightMap: { grid: HeightMap_Hole_5 },
    teeOffPt: { x: 597.599, y: 231.889, z: -121.513 },
    teeOffPlayerPts: [ { x: 606.880, y: 231.845, z: -121.932 }, { x: 601.864, y: 231.845, z: -130.082 } ],
    teeOffSpawnDirection: "TowardsFlag",
    cartPts: [ { x: 556.516, y: 230.083, z: -138.837 }, { x: 563.620, y: 230.173, z: -141.193 } ],
    flagPt: { x: 394.468, y: 227.594, z: -11.500 },
    spawnBag: true,
    spawnFlag: false,
    teeBoxClubs: [ClubType.DR1, ClubType.DR3, ClubType.I4, ClubType.I5, ClubType.I6],
    cameraAimPts: [ { x: 463.972, y: 228.286, z: -53.066 } ],
    surfaces: {
      [SurfaceType.Trees]: {
        hull: [{ x: 492.832, z: -72.625 }, { x: 493.360, z: -73.504 }, { x: 492.810, z: -74.466 }, { x: 491.634, z: -74.491 }, { x: 491.051, z: -73.541 }, { x: 491.714, z: -72.617 }],
        bbox: {
          minX: 491.051 - bboxEpsilon,
          maxX: 493.360 + bboxEpsilon,
          minZ: -74.491 - bboxEpsilon,
          maxZ: -72.617 + bboxEpsilon,
        }
      },
      [SurfaceType.TeeBox]: {
        hull: [{ x: 612.445, z: -137.971 }, { x: 615.818, z: -133.872 }, { x: 618.580, z: -129.373 }, { x: 618.395, z: -124.239 }, { x: 615.355, z: -119.892 }, { x: 611.915, z: -115.854 }, { x: 607.893, z: -112.422 }, { x: 602.844, z: -111.054 }, { x: 597.754, z: -112.408 }, { x: 593.830, z: -115.910 }, { x: 591.111, z: -120.420 }, { x: 588.713, z: -125.135 }, { x: 588.103, z: -130.346 }, { x: 590.487, z: -135.006 }, { x: 594.050, z: -138.930 }, { x: 598.165, z: -142.246 }, { x: 603.227, z: -143.732 }, { x: 608.347, z: -142.708 }, { x: 611.786, z: -139.065 }],
        bbox: {
          minX: 588.103 - bboxEpsilon,
          maxX: 618.580 + bboxEpsilon,
          minZ: -143.732 - bboxEpsilon,
          maxZ: -111.054 + bboxEpsilon,
        }
      },
      [SurfaceType.Green]: {
        hull: [{ x: 385.493, z: -15.208 }, { x: 386.729, z: -10.897 }, { x: 389.647, z: -7.438 }, { x: 393.750, z: -5.732 }, { x: 398.010, z: -7.131 }, { x: 401.343, z: -10.224 }, { x: 404.110, z: -13.834 }, { x: 406.459, z: -17.732 }, { x: 408.217, z: -21.920 }, { x: 408.242, z: -26.408 }, { x: 405.556, z: -29.988 }, { x: 401.451, z: -31.782 }, { x: 396.997, z: -31.195 }, { x: 392.972, z: -29.120 }, { x: 389.503, z: -26.176 }, { x: 386.623, z: -22.683 }, { x: 385.291, z: -18.362 }],
        bbox: {
          minX: 385.291 - bboxEpsilon,
          maxX: 408.242 + bboxEpsilon,
          minZ: -31.782 - bboxEpsilon,
          maxZ: -5.732 + bboxEpsilon,
        }
      },
      [SurfaceType.Fringe]: {
        hull: [{ x: 386.603, z: -25.344 }, { x: 390.429, z: -29.023 }, { x: 394.545, z: -32.365 }, { x: 399.350, z: -34.499 }, { x: 404.569, z: -33.762 }, { x: 408.954, z: -30.976 }, { x: 411.110, z: -26.214 }, { x: 409.959, z: -21.106 }, { x: 407.488, z: -16.412 }, { x: 405.020, z: -12.334 }, { x: 402.209, z: -8.410 }, { x: 398.345, z: -4.868 }, { x: 393.122, z: -4.318 }, { x: 388.086, z: -5.796 }, { x: 384.274, z: -9.419 }, { x: 382.158, z: -14.261 }, { x: 382.573, z: -19.462 }, { x: 385.328, z: -23.864 }],
        bbox: {
          minX: 382.158 - bboxEpsilon,
          maxX: 411.110 + bboxEpsilon,
          minZ: -34.499 - bboxEpsilon,
          maxZ: -4.318 + bboxEpsilon,
        }
      },
      [SurfaceType.Sand]: [
        { hull: [{ x: 386.014, z: -44.242 }, { x: 381.948, z: -42.397 }, { x: 378.411, z: -39.639 }, { x: 375.493, z: -36.286 }, { x: 372.901, z: -32.662 }, { x: 371.350, z: -28.520 }, { x: 372.380, z: -24.201 }, { x: 376.094, z: -21.194 }, { x: 380.680, z: -21.883 }, { x: 383.485, z: -25.305 }, { x: 386.011, z: -28.869 }, { x: 389.787, z: -31.258 }, { x: 392.078, z: -35.099 }, { x: 395.919, z: -37.910 }, { x: 396.543, z: -42.198 }, { x: 392.586, z: -44.844 }, { x: 387.824, z: -44.803 }], bbox: { minX: 371.350 - bboxEpsilon, maxX: 396.543 + bboxEpsilon, minZ: -44.844 - bboxEpsilon, maxZ: -21.194 + bboxEpsilon }},
        { hull: [{ x: 408.163, z: 3.681 }, { x: 412.378, z: 2.410 }, { x: 415.679, z: -0.568 }, { x: 418.288, z: -4.221 }, { x: 420.409, z: -8.150 }, { x: 420.789, z: -12.554 }, { x: 418.585, z: -16.412 }, { x: 414.050, z: -17.784 }, { x: 410.238, z: -14.949 }, { x: 408.468, z: -10.844 }, { x: 405.274, z: -7.751 }, { x: 402.560, z: -4.267 }, { x: 402.993, z: 0.493 }, { x: 406.577, z: 3.387 }], bbox: { minX: 402.560 - bboxEpsilon, maxX: 420.789 + bboxEpsilon, minZ: -17.784 - bboxEpsilon, maxZ: 3.681 + bboxEpsilon }},
        { hull: [{ x: 439.087, z: -29.431 }, { x: 444.101, z: -29.546 }, { x: 448.210, z: -27.769 }, { x: 451.251, z: -24.550 }, { x: 452.142, z: -20.178 }, { x: 449.620, z: -16.291 }, { x: 445.415, z: -14.765 }, { x: 440.972, z: -14.264 }, { x: 436.690, z: -15.516 }, { x: 432.677, z: -17.474 }, { x: 429.955, z: -21.330 }, { x: 431.961, z: -25.612 }, { x: 435.700, z: -28.040 }], bbox: { minX: 429.955 - bboxEpsilon, maxX: 452.142 + bboxEpsilon, minZ: -29.546 - bboxEpsilon, maxZ: -14.264 + bboxEpsilon }},
      ],
      [SurfaceType.Fairway]: {
        hull: [{ x: 584.567, z: -101.406 }, { x: 582.229, z: -96.866 }, { x: 578.123, z: -93.506 }, { x: 573.899, z: -90.298 }, { x: 569.747, z: -86.998 }, { x: 565.273, z: -84.196 }, { x: 560.177, z: -82.729 }, { x: 555.026, z: -81.454 }, { x: 549.869, z: -80.205 }, { x: 544.831, z: -78.586 }, { x: 540.160, z: -76.074 }, { x: 535.359, z: -73.816 }, { x: 530.669, z: -71.347 }, { x: 527.045, z: -67.560 }, { x: 524.098, z: -63.182 }, { x: 519.897, z: -59.982 }, { x: 515.151, z: -57.625 }, { x: 510.339, z: -55.389 }, { x: 505.533, z: -53.134 }, { x: 500.732, z: -50.878 }, { x: 495.987, z: -48.516 }, { x: 491.197, z: -46.250 }, { x: 486.486, z: -43.809 }, { x: 481.663, z: -41.635 }, { x: 476.515, z: -40.387 }, { x: 471.422, z: -38.910 }, { x: 466.514, z: -36.897 }, { x: 461.674, z: -34.726 }, { x: 456.600, z: -33.200 }, { x: 451.349, z: -32.738 }, { x: 446.048, z: -32.989 }, { x: 440.746, z: -33.161 }, { x: 435.447, z: -32.912 }, { x: 430.286, z: -31.701 }, { x: 425.238, z: -30.058 }, { x: 420.448, z: -27.781 }, { x: 415.949, z: -24.965 }, { x: 411.728, z: -21.746 }, { x: 407.296, z: -18.908 }, { x: 402.142, z: -19.238 }, { x: 398.009, z: -22.554 }, { x: 394.879, z: -26.795 }, { x: 394.824, z: -31.813 }, { x: 398.516, z: -35.615 }, { x: 402.171, z: -39.442 }, { x: 406.022, z: -43.076 }, { x: 410.059, z: -46.345 }, { x: 414.647, z: -48.776 }, { x: 419.442, z: -50.785 }, { x: 424.242, z: -52.780 }, { x: 429.141, z: -54.506 }, { x: 434.157, z: -55.869 }, { x: 439.136, z: -57.346 }, { x: 444.018, z: -59.114 }, { x: 448.797, z: -61.145 }, { x: 452.713, z: -64.517 }, { x: 454.672, z: -69.233 }, { x: 454.929, z: -74.406 }, { x: 456.253, z: -79.359 }, { x: 459.362, z: -83.463 }, { x: 463.632, z: -86.236 }, { x: 468.203, z: -88.665 }, { x: 471.931, z: -92.278 }, { x: 475.508, z: -96.045 }, { x: 479.807, z: -98.949 }, { x: 484.725, z: -100.575 }, { x: 489.919, z: -100.664 }, { x: 495.118, z: -100.573 }, { x: 500.310, z: -100.350 }, { x: 505.251, z: -98.901 }, { x: 509.348, z: -95.714 }, { x: 513.315, z: -92.376 }, { x: 518.268, z: -90.908 }, { x: 523.411, z: -90.135 }, { x: 528.557, z: -90.563 }, { x: 533.178, z: -92.913 }, { x: 537.678, z: -95.487 }, { x: 542.400, z: -97.609 }, { x: 547.205, z: -99.588 }, { x: 551.903, z: -101.787 }, { x: 556.030, z: -104.942 }, { x: 559.871, z: -108.439 }, { x: 563.775, z: -111.868 }, { x: 568.245, z: -114.498 }, { x: 572.585, z: -116.547 }, { x: 577.032, z: -116.853 }, { x: 580.624, z: -113.516 }, { x: 583.334, z: -109.145 }, { x: 584.494, z: -104.117 }],
        bbox: {
          minX: 394.824 - bboxEpsilon,
          maxX: 584.567 + bboxEpsilon,
          minZ: -116.853 - bboxEpsilon,
          maxZ: -18.908 + bboxEpsilon,
        }
      },
    }
  },

  6: {
    par: 4,
    panelHoleNumber: 5,
    panelSpawnPosition: "Right",
    heightMap: { grid: HeightMap_Hole_6 },
    teeOffPt: { x: 668.322, y: 236.517, z: 70.211 },
    teeOffPlayerPts: [ { x: 671.871, y: 236.662, z: 78.075 }, { x: 677.325, y: 236.940, z: 70.839 } ],
    teeOffSpawnDirection: "TowardsTeeOff",
    cartPts: [ {x: 652.091, y: 235.740, z: 81.365}, {x: 660.645, y: 236.105, z: 86.773} ],
    spawnBag: true,
    flagPt: { x: 331.746, y: 223.405, z: 182.174 },
    spawnFlag: false,
    teeBoxClubs: [ClubType.I4, ClubType.I5, ClubType.I6, ClubType.I7, ClubType.I8, ClubType.I9],
    cameraAimPts: [ { x: 551.385, y: 230.316, z: 21.750 }, { x: 399.664, y: 223.846, z: 117.652 }],
    surfaces: {
      [SurfaceType.OutOfBounds]: {
        hull: [ { x: 378.007, z: 195.460 }, { x: 383.944, z: 188.275 }, { x: 388.734, z: 180.303 }, { x: 392.918, z: 171.964 }, { x: 396.652, z: 163.556 }, { x: 402.455, z: 156.281 }, { x: 408.987, z: 149.803 }, { x: 415.960, z: 143.605 }, { x: 422.972, z: 137.450 }, { x: 429.981, z: 131.291 }, { x: 437.414, z: 125.709 }, { x: 445.422, z: 120.931 }, { x: 453.654, z: 116.548 }, { x: 461.908, z: 112.206 }, { x: 469.208, z: 106.598 }, { x: 475.214, z: 99.486 }, { x: 481.960, z: 93.041 }, { x: 489.222, z: 87.201 }, { x: 496.291, z: 81.126 }, { x: 504.706, z: 77.456 }, { x: 513.637, z: 75.295 }, { x: 522.503, z: 72.761 }, { x: 531.387, z: 70.024 }, { x: 540.346, z: 67.510 }, { x: 549.159, z: 64.713 }, { x: 557.412, z: 68.706 }, { x: 564.945, z: 74.203 }, { x: 573.773, z: 77.125 }, { x: 582.850, z: 79.280 }, { x: 591.907, z: 81.470 }, { x: 600.977, z: 83.515 }, { x: 609.887, z: 86.279 }, { x: 618.912, z: 88.644 }, { x: 627.944, z: 90.989 }, { x: 636.910, z: 93.550 }, { x: 645.550, z: 97.036 }, { x: 653.768, z: 101.381 }, { x: 657.185, z: 109.677 }, { x: 651.060, z: 116.162 }, { x: 642.116, z: 118.220 }, { x: 633.893, z: 122.606 }, { x: 625.674, z: 126.978 }, { x: 617.193, z: 130.756 }, { x: 608.391, z: 133.771 }, { x: 599.559, z: 136.774 }, { x: 590.750, z: 139.693 }, { x: 581.931, z: 142.624 }, { x: 573.068, z: 145.544 }, { x: 564.226, z: 148.522 }, { x: 555.527, z: 151.885 }, { x: 546.786, z: 155.072 }, { x: 538.156, z: 158.068 }, { x: 529.519, z: 161.063 }, { x: 520.976, z: 164.215 }, { x: 512.230, z: 166.919 }, { x: 503.503, z: 169.829 }, { x: 494.840, z: 172.921 }, { x: 486.272, z: 176.192 }, { x: 477.642, z: 179.302 }, { x: 468.958, z: 182.322 }, { x: 460.254, z: 185.299 }, { x: 451.617, z: 188.429 }, { x: 443.460, z: 192.688 }, { x: 435.245, z: 196.849 }, { x: 426.859, z: 200.635 }, { x: 418.409, z: 204.295 }, { x: 409.749, z: 207.387 }, { x: 400.652, z: 207.872 }, { x: 391.970, z: 205.001 }, { x: 383.848, z: 200.794 } ],
        bbox: {
          minX: 378.007 - bboxEpsilon,
          maxX: 657.185 + bboxEpsilon,
          minZ: 64.713 - bboxEpsilon,
          maxZ: 207.872 + bboxEpsilon,
        }
      },
      [SurfaceType.TeeBox]: {
        hull: [ { x: 673.487, z: 57.919 }, { x: 677.712, z: 60.938 }, { x: 681.603, z: 64.385 }, { x: 684.520, z: 68.617 }, { x: 684.466, z: 73.772 }, { x: 683.085, z: 78.776 }, { x: 680.820, z: 83.449 }, { x: 676.953, z: 86.796 }, { x: 671.861, z: 87.115 }, { x: 667.073, z: 85.187 }, { x: 662.680, z: 82.416 }, { x: 658.408, z: 79.461 }, { x: 654.106, z: 76.549 }, { x: 649.681, z: 73.825 }, { x: 645.362, z: 70.934 }, { x: 641.055, z: 68.023 }, { x: 637.088, z: 64.703 }, { x: 636.266, z: 59.670 }, { x: 637.625, z: 54.704 }, { x: 640.360, z: 50.316 }, { x: 644.613, z: 47.460 }, { x: 649.748, z: 47.430 }, { x: 654.598, z: 49.291 }, { x: 659.423, z: 51.196 }, { x: 664.191, z: 53.242 }, { x: 668.817, z: 55.594 } ],
        bbox: {
          minX: 636.266 - bboxEpsilon,
          maxX: 684.520 + bboxEpsilon,
          minZ: 47.430 - bboxEpsilon,
          maxZ: 87.115 + bboxEpsilon,
        }
      },
      [SurfaceType.Green]: {
        hull: [ { x: 350.691, z: 187.682 }, { x: 346.222, z: 190.157 }, { x: 341.185, z: 191.378 }, { x: 336.033, z: 191.809 }, { x: 330.967, z: 190.818 }, { x: 326.267, z: 188.624 }, { x: 321.987, z: 185.695 }, { x: 318.934, z: 181.536 }, { x: 317.832, z: 176.488 }, { x: 319.287, z: 171.561 }, { x: 322.494, z: 167.479 }, { x: 326.080, z: 163.713 }, { x: 328.986, z: 159.421 }, { x: 332.532, z: 155.720 }, { x: 337.244, z: 153.539 }, { x: 342.351, z: 152.696 }, { x: 347.501, z: 153.159 }, { x: 351.828, z: 155.955 }, { x: 354.890, z: 160.125 }, { x: 357.684, z: 164.495 }, { x: 358.768, z: 169.555 }, { x: 358.638, z: 174.737 }, { x: 357.019, z: 179.645 }, { x: 354.453, z: 184.150 }, { x: 351.209, z: 187.333 } ],
        bbox: {
          minX: 317.832 - bboxEpsilon,
          maxX: 358.768 + bboxEpsilon,
          minZ: 152.696 - bboxEpsilon,
          maxZ: 191.809 + bboxEpsilon,
        }
      },
      [SurfaceType.Fringe]: {
        hull: [ { x: 350.059, z: 193.257 }, { x: 345.058, z: 194.593 }, { x: 339.921, z: 195.294 }, { x: 334.754, z: 195.431 }, { x: 329.589, z: 195.000 }, { x: 324.733, z: 193.337 }, { x: 320.684, z: 190.082 }, { x: 316.984, z: 186.429 }, { x: 313.412, z: 182.650 }, { x: 311.522, z: 177.900 }, { x: 312.652, z: 172.893 }, { x: 315.455, z: 168.521 }, { x: 319.443, z: 165.214 }, { x: 323.504, z: 161.973 }, { x: 326.230, z: 157.599 }, { x: 328.024, z: 152.721 }, { x: 330.601, z: 148.629 }, { x: 335.304, z: 146.602 }, { x: 340.465, z: 146.241 }, { x: 345.585, z: 146.970 }, { x: 350.344, z: 149.044 }, { x: 354.492, z: 152.144 }, { x: 358.120, z: 155.860 }, { x: 360.728, z: 160.343 }, { x: 362.585, z: 165.193 }, { x: 363.405, z: 170.311 }, { x: 363.102, z: 175.485 }, { x: 361.471, z: 180.411 }, { x: 359.405, z: 185.145 }, { x: 356.501, z: 189.379 }, { x: 352.258, z: 192.320 } ],
        bbox: {
          minX: 311.522 - bboxEpsilon,
          maxX: 363.405 + bboxEpsilon,
          minZ: 146.241 - bboxEpsilon,
          maxZ: 195.431 + bboxEpsilon,
        }
      },
      [SurfaceType.Sand]: [
        { hull: [ { x: 306.635, z: 196.395 }, { x: 301.918, z: 194.310 }, { x: 298.832, z: 191.321 }, { x: 296.487, z: 187.493 }, { x: 295.380, z: 183.094 }, { x: 296.170, z: 178.729 }, { x: 298.633, z: 174.922 }, { x: 302.950, z: 174.722 }, { x: 304.736, z: 178.741 }, { x: 305.566, z: 183.152 }, { x: 308.572, z: 186.549 }, { x: 312.171, z: 189.328 }, { x: 315.557, z: 192.344 }, { x: 315.033, z: 196.500 }, { x: 310.546, z: 196.980 } ], bbox: { minX: 295.380 - bboxEpsilon, maxX: 315.557 + bboxEpsilon, minZ: 174.722 - bboxEpsilon, maxZ: 196.980 + bboxEpsilon }},
        { hull: [ { x: 313.381, z: 146.153 }, { x: 317.331, z: 142.974 }, { x: 320.861, z: 140.284 }, { x: 325.055, z: 141.556 }, { x: 326.190, z: 145.761 }, { x: 324.501, z: 149.930 }, { x: 322.138, z: 153.810 }, { x: 318.998, z: 157.001 }, { x: 314.821, z: 158.579 }, { x: 310.971, z: 156.132 }, { x: 311.172, z: 151.477 }, { x: 312.764, z: 147.246 } ], bbox: { minX: 310.971 - bboxEpsilon, maxX: 326.190 + bboxEpsilon, minZ: 140.284 - bboxEpsilon, maxZ: 158.579 + bboxEpsilon }},
        { hull: [ { x: 380.348, z: 144.502 }, { x: 384.846, z: 144.009 }, { x: 389.171, z: 144.196 }, { x: 390.827, z: 148.277 }, { x: 389.576, z: 152.626 }, { x: 387.935, z: 156.852 }, { x: 385.497, z: 160.652 }, { x: 382.316, z: 163.870 }, { x: 379.428, z: 167.330 }, { x: 375.238, z: 167.709 }, { x: 373.032, z: 163.862 }, { x: 371.970, z: 159.464 }, { x: 372.822, z: 155.018 }, { x: 373.959, z: 150.656 }, { x: 376.774, z: 147.121 } ], bbox: { minX: 371.970 - bboxEpsilon, maxX: 390.827 + bboxEpsilon, minZ: 144.009 - bboxEpsilon, maxZ: 167.709 + bboxEpsilon }},
        { hull: [ { x: 398.105, z: 90.489 }, { x: 399.152, z: 85.625 }, { x: 403.080, z: 82.239 }, { x: 407.690, z: 80.089 }, { x: 412.544, z: 80.346 }, { x: 415.684, z: 83.263 }, { x: 416.401, z: 87.755 }, { x: 414.771, z: 91.822 }, { x: 411.696, z: 95.157 }, { x: 407.461, z: 96.561 }, { x: 402.927, z: 96.286 }, { x: 399.153, z: 94.168 } ], bbox: { minX: 398.105 - bboxEpsilon, maxX: 416.401 + bboxEpsilon, minZ: 80.089 - bboxEpsilon, maxZ: 96.561 + bboxEpsilon }},
      ],
      
      [SurfaceType.Fairway]: [
        { hull: [ { x: 623.558, z: 52.654 }, { x: 618.955, z: 54.997 }, { x: 613.769, z: 55.180 }, { x: 608.574, z: 55.402 }, { x: 603.411, z: 55.636 }, { x: 598.255, z: 55.476 }, { x: 593.400, z: 53.639 }, { x: 588.641, z: 51.557 }, { x: 583.979, z: 49.319 }, { x: 579.318, z: 47.026 }, { x: 574.918, z: 44.260 }, { x: 570.349, z: 41.784 }, { x: 565.759, z: 39.370 }, { x: 562.375, z: 35.680 }, { x: 558.412, z: 32.456 }, { x: 553.382, z: 31.250 }, { x: 548.296, z: 31.738 }, { x: 544.746, z: 35.456 }, { x: 541.030, z: 39.031 }, { x: 536.226, z: 40.978 }, { x: 531.231, z: 42.422 }, { x: 526.232, z: 43.851 }, { x: 521.319, z: 45.526 }, { x: 516.956, z: 48.330 }, { x: 512.820, z: 51.480 }, { x: 508.955, z: 54.947 }, { x: 505.420, z: 58.487 }, { x: 500.507, z: 60.162 }, { x: 495.503, z: 61.571 }, { x: 490.694, z: 63.530 }, { x: 486.008, z: 65.783 }, { x: 481.319, z: 68.034 }, { x: 476.782, z: 70.569 }, { x: 472.731, z: 73.817 }, { x: 469.113, z: 77.548 }, { x: 465.671, z: 81.445 }, { x: 461.911, z: 85.027 }, { x: 457.637, z: 87.988 }, { x: 452.999, z: 90.284 }, { x: 448.301, z: 88.832 }, { x: 444.886, z: 84.917 }, { x: 443.071, z: 80.106 }, { x: 442.869, z: 74.922 }, { x: 444.237, z: 69.924 }, { x: 446.334, z: 65.167 }, { x: 448.809, z: 60.594 }, { x: 452.093, z: 56.570 }, { x: 456.246, z: 53.478 }, { x: 460.770, z: 50.915 }, { x: 465.606, z: 49.013 }, { x: 470.601, z: 47.571 }, { x: 475.706, z: 46.577 }, { x: 480.829, z: 45.682 }, { x: 485.947, z: 44.760 }, { x: 490.900, z: 43.257 }, { x: 495.149, z: 40.288 }, { x: 499.172, z: 37.020 }, { x: 503.343, z: 33.924 }, { x: 507.364, z: 30.634 }, { x: 511.221, z: 27.152 }, { x: 514.603, z: 23.204 }, { x: 518.546, z: 19.826 }, { x: 522.905, z: 16.994 }, { x: 527.365, z: 14.322 }, { x: 532.164, z: 12.418 }, { x: 537.330, z: 12.428 }, { x: 542.350, z: 11.285 }, { x: 547.398, z: 10.187 }, { x: 552.584, z: 9.894 }, { x: 557.778, z: 10.060 }, { x: 562.962, z: 10.455 }, { x: 568.134, z: 10.940 }, { x: 573.308, z: 11.218 }, { x: 578.385, z: 10.229 }, { x: 583.506, z: 9.616 }, { x: 588.644, z: 9.686 }, { x: 593.636, z: 11.108 }, { x: 598.673, z: 12.365 }, { x: 603.547, z: 14.159 }, { x: 608.497, z: 15.713 }, { x: 613.446, z: 17.298 }, { x: 618.294, z: 19.167 }, { x: 622.866, z: 21.625 }, { x: 626.925, z: 24.753 }, { x: 630.200, z: 28.756 }, { x: 631.919, z: 33.622 }, { x: 632.035, z: 38.800 }, { x: 630.739, z: 43.801 }, { x: 628.053, z: 48.217 }, { x: 624.677, z: 51.629 } ],
          bbox: {
            minX: 442.869 - bboxEpsilon,
            maxX: 632.035 + bboxEpsilon,
            minZ: 9.616 - bboxEpsilon,
            maxZ: 90.284 + bboxEpsilon,
          }
        },
        {
          hull: [ { x: 404.104, z: 130.744 }, { x: 399.615, z: 133.369 }, { x: 394.760, z: 135.151 }, { x: 389.619, z: 135.814 }, { x: 384.430, z: 136.113 }, { x: 379.450, z: 137.512 }, { x: 375.725, z: 141.020 }, { x: 373.224, z: 145.568 }, { x: 371.055, z: 150.277 }, { x: 368.834, z: 154.976 }, { x: 367.053, z: 159.824 }, { x: 367.499, z: 164.980 }, { x: 366.942, z: 170.060 }, { x: 364.519, z: 174.652 }, { x: 360.542, z: 177.626 }, { x: 356.769, z: 174.611 }, { x: 355.850, z: 169.503 }, { x: 354.949, z: 164.387 }, { x: 352.974, z: 159.619 }, { x: 349.420, z: 155.861 }, { x: 345.099, z: 153.008 }, { x: 340.056, z: 152.452 }, { x: 334.978, z: 153.555 }, { x: 330.377, z: 151.655 }, { x: 330.330, z: 146.681 }, { x: 331.171, z: 141.591 }, { x: 331.510, z: 136.422 }, { x: 332.848, z: 131.434 }, { x: 336.170, z: 127.484 }, { x: 340.787, z: 125.178 }, { x: 345.488, z: 122.991 }, { x: 349.724, z: 119.975 }, { x: 354.149, z: 117.259 }, { x: 358.942, z: 115.255 }, { x: 363.812, z: 113.472 }, { x: 368.661, z: 111.738 }, { x: 373.679, z: 110.433 }, { x: 378.649, z: 108.902 }, { x: 383.683, z: 107.623 }, { x: 388.827, z: 106.938 }, { x: 393.998, z: 107.019 }, { x: 398.530, z: 107.960 }, { x: 401.981, z: 105.319 }, { x: 405.244, z: 102.379 }, { x: 409.594, z: 103.175 }, { x: 413.208, z: 105.751 }, { x: 414.565, z: 110.677 }, { x: 413.993, z: 115.842 }, { x: 413.157, z: 120.962 }, { x: 410.598, z: 125.455 }, { x: 406.747, z: 128.931 } ],
          bbox: {
            minX: 330.330 - bboxEpsilon,
            maxX: 414.565 + bboxEpsilon,
            minZ: 102.379 - bboxEpsilon,
            maxZ: 177.626 + bboxEpsilon,
          }
        }
      ],
    }
  },

  7: {
    par: 4,
    panelHoleNumber: 12,
    panelSpawnPosition: "Left",
    heightMap: { grid: HeightMap_Hole_7 },
    teeOffPt: { x: -41.029, y: 222.292, z: 664.910 },
    teeOffPlayerPts: [ { x: -47.717, y: 223.302, z: 660.283 }, { x: -48.170, y: 222.450, z: 666.802 } ],
    teeOffSpawnDirection: "TowardsTeeOff",
    cartPts: [ {x: -33.012, y: 219.536, z: 683.337}, {x: -43.359, y: 219.406, z: 683.325} ],
    spawnBag: true,
    flagPt: { x: 344.867, y: 229.823, z: 616.263 },
    spawnFlag: true,
    teeBoxClubs: [ClubType.DR1],
    cameraAimPts: [ { x: 182.835, y: 225.490, z: 655.671 } ],
    surfaces: {
      [SurfaceType.TeeBox]: {
        hull: [ { x: -50.463, z: 651.198 }, { x: -54.930, z: 653.395 }, { x: -56.655, z: 658.038 }, { x: -57.717, z: 662.856 }, { x: -57.157, z: 667.674 }, { x: -53.904, z: 671.436 }, { x: -49.326, z: 673.342 }, { x: -44.321, z: 673.746 }, { x: -39.310, z: 673.480 }, { x: -34.319, z: 672.958 }, { x: -29.338, z: 672.322 }, { x: -24.375, z: 671.686 }, { x: -19.585, z: 670.435 }, { x: -17.809, z: 665.934 }, { x: -20.116, z: 661.669 }, { x: -24.517, z: 659.288 }, { x: -29.288, z: 657.748 }, { x: -33.933, z: 656.562 }, { x: -38.586, z: 654.763 }, { x: -43.198, z: 652.816 }, { x: -47.883, z: 651.478 } ],
        bbox: {
          minX: -57.717 - bboxEpsilon,
          maxX: -17.809 + bboxEpsilon,
          minZ: 651.198 - bboxEpsilon,
          maxZ: 673.746 + bboxEpsilon,
        }
      },
      [SurfaceType.Green]: {
        hull: [ { x: 328.279, z: 611.119 }, { x: 323.860, z: 613.420 }, { x: 319.237, z: 615.368 }, { x: 314.584, z: 617.245 }, { x: 310.405, z: 618.801 }, { x: 307.258, z: 621.883 }, { x: 310.192, z: 625.302 }, { x: 315.261, z: 625.998 }, { x: 319.589, z: 626.251 }, { x: 323.699, z: 628.067 }, { x: 327.788, z: 630.527 }, { x: 332.107, z: 633.057 }, { x: 337.026, z: 633.647 }, { x: 341.797, z: 632.172 }, { x: 346.305, z: 629.955 }, { x: 350.635, z: 627.422 }, { x: 354.484, z: 624.212 }, { x: 357.423, z: 620.159 }, { x: 359.160, z: 615.451 }, { x: 359.608, z: 610.476 }, { x: 358.018, z: 605.755 }, { x: 354.672, z: 602.020 }, { x: 350.610, z: 599.153 }, { x: 345.639, z: 598.750 }, { x: 340.811, z: 600.063 }, { x: 336.566, z: 602.721 }, { x: 332.885, z: 606.107 }, { x: 329.668, z: 609.887 } ],
        bbox: {
          minX: 307.258 - bboxEpsilon,
          maxX: 359.608 + bboxEpsilon,
          minZ: 598.750 - bboxEpsilon,
          maxZ: 633.647 + bboxEpsilon,
        }
      },
      [SurfaceType.Fringe]: {
        hull: [ { x: 324.105, z: 610.897 }, { x: 319.847, z: 612.483 }, { x: 315.085, z: 614.784 }, { x: 310.454, z: 617.145 }, { x: 306.526, z: 620.464 }, { x: 305.300, z: 624.583 }, { x: 308.562, z: 627.500 }, { x: 313.334, z: 628.771 }, { x: 318.487, z: 629.381 }, { x: 323.304, z: 631.214 }, { x: 326.976, z: 634.842 }, { x: 330.956, z: 636.881 }, { x: 335.620, z: 638.016 }, { x: 340.736, z: 637.428 }, { x: 345.450, z: 635.264 }, { x: 350.013, z: 632.774 }, { x: 354.455, z: 630.098 }, { x: 357.832, z: 626.177 }, { x: 360.483, z: 621.708 }, { x: 362.801, z: 617.071 }, { x: 363.211, z: 611.921 }, { x: 362.357, z: 606.795 }, { x: 360.462, z: 601.975 }, { x: 357.411, z: 597.782 }, { x: 353.215, z: 594.763 }, { x: 348.090, z: 594.036 }, { x: 342.982, z: 594.790 }, { x: 338.169, z: 596.742 }, { x: 334.083, z: 599.850 }, { x: 331.300, z: 604.170 }, { x: 328.847, z: 608.708 } ],
        bbox: {
          minX: 305.300 - bboxEpsilon,
          maxX: 363.211 + bboxEpsilon,
          minZ: 594.036 - bboxEpsilon,
          maxZ: 638.016 + bboxEpsilon,
        }
      },
      [SurfaceType.Sand]: [
        { hull: [ { x: 324.094, z: 601.435 }, { x: 320.424, z: 599.002 }, { x: 315.948, z: 599.489 }, { x: 311.766, z: 601.179 }, { x: 307.464, z: 602.520 }, { x: 303.856, z: 604.986 }, { x: 303.410, z: 609.465 }, { x: 305.704, z: 613.192 }, { x: 310.055, z: 613.258 }, { x: 314.247, z: 611.563 }, { x: 318.316, z: 609.598 }, { x: 322.115, z: 607.189 }, { x: 324.182, z: 603.293 } ], bbox: { minX: 303.410 - bboxEpsilon, maxX: 324.182 + bboxEpsilon, minZ: 599.002 - bboxEpsilon, maxZ: 613.258 + bboxEpsilon }},
        { hull: [ { x: 312.205, z: 640.488 }, { x: 307.809, z: 639.457 }, { x: 303.391, z: 638.548 }, { x: 298.927, z: 637.742 }, { x: 295.124, z: 635.500 }, { x: 293.970, z: 631.208 }, { x: 297.201, z: 628.099 }, { x: 301.679, z: 627.922 }, { x: 306.008, z: 629.306 }, { x: 310.429, z: 630.261 }, { x: 314.944, z: 630.559 }, { x: 319.357, z: 631.553 }, { x: 322.345, z: 634.663 }, { x: 321.390, z: 638.977 }, { x: 317.439, z: 640.989 }, { x: 313.167, z: 640.658 } ], bbox: { minX: 293.970 - bboxEpsilon, maxX: 322.345 + bboxEpsilon, minZ: 627.922 - bboxEpsilon, maxZ: 640.989 + bboxEpsilon }},
        { hull: [ { x: 249.863, z: 663.800 }, { x: 244.668, z: 663.905 }, { x: 239.516, z: 663.609 }, { x: 236.289, z: 659.787 }, { x: 240.062, z: 656.232 }, { x: 244.949, z: 654.502 }, { x: 250.120, z: 654.211 }, { x: 255.238, z: 654.942 }, { x: 259.773, z: 652.740 }, { x: 264.573, z: 651.783 }, { x: 268.185, z: 655.326 }, { x: 266.791, z: 659.978 }, { x: 261.977, z: 661.759 }, { x: 256.987, z: 663.071 }, { x: 251.874, z: 663.725 } ], bbox: { minX: 236.289 - bboxEpsilon, maxX: 268.185 + bboxEpsilon, minZ: 651.783 - bboxEpsilon, maxZ: 663.905 + bboxEpsilon }},
      ],
      [SurfaceType.Fairway]: [
        { hull: [ { x: -50.463, z: 651.198 }, { x: -54.930, z: 653.395 }, { x: -56.655, z: 658.038 }, { x: -57.717, z: 662.856 }, { x: -57.157, z: 667.674 }, { x: -53.904, z: 671.436 }, { x: -49.326, z: 673.342 }, { x: -44.321, z: 673.746 }, { x: -39.310, z: 673.480 }, { x: -34.319, z: 672.958 }, { x: -29.338, z: 672.322 }, { x: -24.375, z: 671.686 }, { x: -19.585, z: 670.435 }, { x: -17.809, z: 665.934 }, { x: -20.116, z: 661.669 }, { x: -24.517, z: 659.288 }, { x: -29.288, z: 657.748 }, { x: -33.933, z: 656.562 }, { x: -38.586, z: 654.763 }, { x: -43.198, z: 652.816 }, { x: -47.883, z: 651.478 } ],
          bbox: {
            minX: -57.717 - bboxEpsilon,
            maxX: -17.809 + bboxEpsilon,
            minZ: 651.198 - bboxEpsilon,
            maxZ: 673.746 + bboxEpsilon,
          }
        },
        { hull: [ { x: 121.470, z: 647.820 }, { x: 126.479, z: 648.181 }, { x: 131.493, z: 648.426 }, { x: 136.496, z: 648.244 }, { x: 141.373, z: 647.088 }, { x: 146.057, z: 645.279 }, { x: 150.920, z: 644.109 }, { x: 155.903, z: 643.919 }, { x: 160.905, z: 644.075 }, { x: 165.924, z: 644.226 }, { x: 170.946, z: 644.240 }, { x: 175.966, z: 644.130 }, { x: 180.987, z: 644.164 }, { x: 185.984, z: 644.629 }, { x: 191.003, z: 644.811 }, { x: 195.961, z: 644.101 }, { x: 200.636, z: 642.278 }, { x: 205.034, z: 639.858 }, { x: 208.874, z: 636.644 }, { x: 212.528, z: 633.209 }, { x: 216.441, z: 630.071 }, { x: 220.560, z: 627.218 }, { x: 225.075, z: 625.065 }, { x: 230.047, z: 624.439 }, { x: 235.061, z: 624.143 }, { x: 240.039, z: 623.555 }, { x: 244.990, z: 622.749 }, { x: 249.988, z: 622.891 }, { x: 254.549, z: 624.903 }, { x: 259.007, z: 627.185 }, { x: 263.936, z: 627.089 }, { x: 268.414, z: 624.820 }, { x: 273.177, z: 623.372 }, { x: 278.176, z: 623.793 }, { x: 282.979, z: 625.147 }, { x: 286.801, z: 628.335 }, { x: 289.696, z: 632.391 }, { x: 290.639, z: 637.281 }, { x: 290.514, z: 642.295 }, { x: 289.122, z: 647.060 }, { x: 285.570, z: 650.535 }, { x: 281.245, z: 653.057 }, { x: 276.334, z: 653.513 }, { x: 271.687, z: 651.650 }, { x: 266.979, z: 649.984 }, { x: 261.981, z: 650.037 }, { x: 257.145, z: 651.201 }, { x: 252.221, z: 652.035 }, { x: 247.201, z: 652.019 }, { x: 242.185, z: 652.090 }, { x: 237.409, z: 653.543 }, { x: 233.269, z: 656.351 }, { x: 229.419, z: 659.557 }, { x: 224.969, z: 661.856 }, { x: 220.288, z: 663.657 }, { x: 215.327, z: 664.396 }, { x: 210.335, z: 664.943 }, { x: 205.335, z: 665.429 }, { x: 200.351, z: 665.866 }, { x: 195.335, z: 666.127 }, { x: 190.317, z: 666.060 }, { x: 185.301, z: 665.872 }, { x: 180.309, z: 665.449 }, { x: 175.729, z: 663.434 }, { x: 171.004, z: 661.861 }, { x: 166.003, z: 661.602 }, { x: 160.991, z: 661.456 }, { x: 156.020, z: 662.094 }, { x: 151.139, z: 663.218 }, { x: 146.399, z: 664.820 }, { x: 141.775, z: 666.770 }, { x: 137.031, z: 668.401 }, { x: 132.080, z: 669.194 }, { x: 127.061, z: 669.343 }, { x: 122.075, z: 668.780 }, { x: 117.148, z: 667.818 }, { x: 112.261, z: 666.665 }, { x: 107.578, z: 664.877 }, { x: 103.929, z: 661.529 }, { x: 102.903, z: 656.676 }, { x: 103.582, z: 651.727 }, { x: 105.505, z: 648.163 }, { x: 109.934, z: 646.720 }, { x: 114.470, z: 647.056 }, { x: 118.991, z: 647.561 } ],
          bbox: {
            minX: 102.903 - bboxEpsilon,
            maxX: 290.639 + bboxEpsilon,
            minZ: 622.749 - bboxEpsilon,
            maxZ: 669.343 + bboxEpsilon,
          }
        }
      ],
    }
  },

  8: {
    par: 5,
    panelHoleNumber: 15,
    panelSpawnPosition: "Right",
    heightMap: { grid: HeightMap_Hole_8 },
    teeOffPt: { x: 111.644, y: 222.840, z: 423.480 },
    teeOffPlayerPts: [ { x: 122.464, y: 222.883, z: 420.538 }, { x: 115.137, y: 222.454, z: 413.194 } ],
    teeOffSpawnDirection: "TowardsTeeOff",
    cartPts: [ {x: 99.059, y: 222.939, z: 459.738}, {x: 107.067, y: 223.059, z: 452.575} ],
    spawnBag: true,
    flagPt: { x: -172.783, y: 215.433, z: 598.693 },
    spawnFlag: true,
    teeBoxClubs: [ClubType.I4, ClubType.I5, ClubType.I6],
    cameraAimPts: [ { x: -20.550, y: 219.239, z: 539.614 } ],
    surfaces: {
      [SurfaceType.TeeBox]: {
        hull: [ { x: 98.836, z: 450.359 }, { x: 102.666, z: 447.147 }, { x: 106.062, z: 443.452 }, { x: 109.884, z: 440.214 }, { x: 114.183, z: 437.898 }, { x: 118.739, z: 436.027 }, { x: 122.143, z: 432.347 }, { x: 125.217, z: 428.432 }, { x: 127.905, z: 424.413 }, { x: 128.719, z: 419.605 }, { x: 126.710, z: 415.324 }, { x: 123.215, z: 411.948 }, { x: 118.563, z: 410.384 }, { x: 113.576, z: 409.930 }, { x: 108.950, z: 411.272 }, { x: 105.175, z: 414.579 }, { x: 101.549, z: 418.048 }, { x: 97.816, z: 421.398 }, { x: 93.979, z: 424.628 }, { x: 90.048, z: 427.714 }, { x: 86.098, z: 430.798 }, { x: 82.312, z: 434.065 }, { x: 79.988, z: 438.440 }, { x: 80.238, z: 443.388 }, { x: 82.925, z: 447.532 }, { x: 86.914, z: 450.470 }, { x: 91.726, z: 451.869 }, { x: 96.618, z: 451.325 } ],
        bbox: {
        minX: 79.988 - bboxEpsilon,
        maxX: 128.719 + bboxEpsilon,
        minZ: 409.930 - bboxEpsilon,
        maxZ: 451.869 + bboxEpsilon,
        }
      },
      [SurfaceType.Green]: {
        hull: [ { x: -163.597, z: 579.698 }, { x: -159.247, z: 581.729 }, { x: -155.927, z: 585.732 }, { x: -155.656, z: 590.666 }, { x: -156.429, z: 595.339 }, { x: -158.704, z: 599.191 }, { x: -161.523, z: 602.678 }, { x: -164.562, z: 605.986 }, { x: -168.194, z: 608.595 }, { x: -172.180, z: 610.665 }, { x: -176.270, z: 612.520 }, { x: -180.474, z: 614.099 }, { x: -184.885, z: 614.419 }, { x: -189.117, z: 612.917 }, { x: -193.127, z: 610.937 }, { x: -197.102, z: 608.852 }, { x: -200.779, z: 606.279 }, { x: -204.081, z: 603.240 }, { x: -206.701, z: 599.628 }, { x: -206.823, z: 595.214 }, { x: -204.690, z: 591.356 }, { x: -200.122, z: 590.016 }, { x: -195.906, z: 588.644 }, { x: -192.117, z: 586.322 }, { x: -187.681, z: 585.640 }, { x: -183.302, z: 584.676 }, { x: -179.119, z: 583.082 }, { x: -175.079, z: 581.147 }, { x: -170.795, z: 579.855 }, { x: -166.426, z: 579.050 } ],
        bbox: {
          minX: -206.823 - bboxEpsilon,
          maxX: -155.656 + bboxEpsilon,
          minZ: 579.050 - bboxEpsilon,
          maxZ: 614.419 + bboxEpsilon,
        }
      },
      [SurfaceType.Fringe]: {
        hull: [ { x: -165.977, z: 610.588 }, { x: -171.081, z: 612.008 }, { x: -176.013, z: 613.943 }, { x: -180.804, z: 616.225 }, { x: -185.880, z: 617.527 }, { x: -190.316, z: 615.020 }, { x: -193.506, z: 610.872 }, { x: -198.150, z: 608.302 }, { x: -202.419, z: 605.183 }, { x: -205.989, z: 601.266 }, { x: -209.479, z: 597.279 }, { x: -212.183, z: 592.812 }, { x: -211.170, z: 587.877 }, { x: -206.302, z: 585.881 }, { x: -201.624, z: 583.390 }, { x: -196.404, z: 582.667 }, { x: -191.191, z: 583.354 }, { x: -186.175, z: 581.643 }, { x: -181.169, z: 579.895 }, { x: -176.103, z: 578.313 }, { x: -171.046, z: 576.746 }, { x: -165.792, z: 576.129 }, { x: -160.639, z: 577.227 }, { x: -155.701, z: 579.147 }, { x: -152.727, z: 583.193 }, { x: -154.551, z: 588.127 }, { x: -155.512, z: 593.345 }, { x: -156.658, z: 598.520 }, { x: -158.790, z: 603.375 }, { x: -161.731, z: 607.761 } ],
        bbox: {
          minX: -212.183 - bboxEpsilon,
          maxX: -152.727 + bboxEpsilon,
          minZ: 576.129 - bboxEpsilon,
          maxZ: 617.527 + bboxEpsilon,
        }
      },
      [SurfaceType.Sand]: [
        { hull: [ { x: -217.587, z: 603.214 }, { x: -219.607, z: 607.147 }, { x: -218.903, z: 611.544 }, { x: -215.853, z: 614.851 }, { x: -212.107, z: 617.404 }, { x: -207.978, z: 619.310 }, { x: -203.552, z: 619.875 }, { x: -199.303, z: 618.296 }, { x: -197.263, z: 614.459 }, { x: -199.511, z: 610.656 }, { x: -203.263, z: 608.105 }, { x: -207.046, z: 605.608 }, { x: -209.431, z: 601.768 }, { x: -213.768, z: 601.090 } ], bbox: { minX: -219.607 - bboxEpsilon, maxX: -197.263 + bboxEpsilon, minZ: 601.090 - bboxEpsilon, maxZ: 619.875 + bboxEpsilon }},
        { hull: [ { x: -144.869, z: 599.388 }, { x: -140.886, z: 597.299 }, { x: -138.918, z: 593.308 }, { x: -139.052, z: 588.785 }, { x: -140.483, z: 584.486 }, { x: -143.704, z: 581.491 }, { x: -148.113, z: 582.061 }, { x: -150.128, z: 586.041 }, { x: -151.480, z: 590.383 }, { x: -152.042, z: 594.867 }, { x: -150.449, z: 598.988 }, { x: -145.917, z: 599.737 } ], bbox: { minX: -152.042 - bboxEpsilon, maxX: -138.918 + bboxEpsilon, minZ: 581.491 - bboxEpsilon, maxZ: 599.737 + bboxEpsilon }},
        { hull: [ { x: -23.874, z: 530.556 }, { x: -19.044, z: 529.342 }, { x: -14.708, z: 528.582 }, { x: -10.388, z: 528.159 }, { x: -8.364, z: 524.276 }, { x: -10.506, z: 520.392 }, { x: -15.226, z: 519.555 }, { x: -20.208, z: 519.878 }, { x: -24.521, z: 520.877 }, { x: -28.511, z: 523.034 }, { x: -30.386, z: 527.026 }, { x: -27.340, z: 530.343 } ], bbox: { minX: -30.386 - bboxEpsilon, maxX: -8.364 + bboxEpsilon, minZ: 519.555 - bboxEpsilon, maxZ: 530.556 + bboxEpsilon }},
        { hull: [ { x: -2.380, z: 516.339 }, { x: 0.274, z: 512.651 }, { x: 2.815, z: 508.897 }, { x: 5.991, z: 505.781 }, { x: 10.385, z: 506.558 }, { x: 11.070, z: 511.038 }, { x: 9.210, z: 515.173 }, { x: 7.025, z: 519.151 }, { x: 3.638, z: 522.097 }, { x: -0.471, z: 523.922 }, { x: -3.930, z: 521.213 }, { x: -2.762, z: 517.140 } ], bbox: { minX: -3.930 - bboxEpsilon, maxX: 11.070 + bboxEpsilon, minZ: 505.781 - bboxEpsilon, maxZ: 523.922 + bboxEpsilon }},
      ],
      [SurfaceType.Fairway]: {
        hull: [ { x: 55.099, z: 495.162 }, { x: 54.177, z: 500.073 }, { x: 52.154, z: 504.621 }, { x: 49.208, z: 508.684 }, { x: 46.246, z: 512.731 }, { x: 43.080, z: 516.622 }, { x: 39.490, z: 520.130 }, { x: 35.671, z: 523.387 }, { x: 31.672, z: 526.417 }, { x: 27.627, z: 529.391 }, { x: 23.669, z: 532.474 }, { x: 19.590, z: 535.393 }, { x: 15.230, z: 537.886 }, { x: 10.754, z: 540.155 }, { x: 6.123, z: 542.084 }, { x: 1.322, z: 543.550 }, { x: -3.513, z: 544.906 }, { x: -8.273, z: 546.490 }, { x: -12.594, z: 549.034 }, { x: -17.022, z: 551.348 }, { x: -21.994, z: 551.896 }, { x: -27.014, z: 551.796 }, { x: -32.034, z: 551.961 }, { x: -37.053, z: 552.112 }, { x: -42.032, z: 552.667 }, { x: -46.933, z: 553.755 }, { x: -51.488, z: 555.780 }, { x: -55.695, z: 558.519 }, { x: -59.994, z: 561.097 }, { x: -64.778, z: 562.541 }, { x: -69.788, z: 562.529 }, { x: -74.781, z: 561.994 }, { x: -79.782, z: 562.157 }, { x: -84.507, z: 563.851 }, { x: -89.178, z: 565.693 }, { x: -93.807, z: 567.642 }, { x: -98.364, z: 569.751 }, { x: -102.854, z: 572.001 }, { x: -107.278, z: 574.378 }, { x: -111.659, z: 576.830 }, { x: -116.470, z: 577.691 }, { x: -120.193, z: 574.501 }, { x: -119.951, z: 569.643 }, { x: -116.333, z: 566.181 }, { x: -112.033, z: 563.636 }, { x: -107.334, z: 561.879 }, { x: -102.721, z: 559.894 }, { x: -98.454, z: 557.276 }, { x: -94.690, z: 553.955 }, { x: -91.258, z: 550.295 }, { x: -87.345, z: 547.173 }, { x: -82.913, z: 544.827 }, { x: -78.073, z: 543.610 }, { x: -73.068, z: 543.236 }, { x: -68.094, z: 542.566 }, { x: -63.165, z: 541.665 }, { x: -58.737, z: 539.329 }, { x: -54.483, z: 536.679 }, { x: -50.079, z: 534.277 }, { x: -45.600, z: 532.022 }, { x: -40.802, z: 530.630 }, { x: -35.909, z: 531.426 }, { x: -31.442, z: 533.721 }, { x: -26.562, z: 534.408 }, { x: -21.753, z: 532.976 }, { x: -16.788, z: 532.326 }, { x: -11.799, z: 531.830 }, { x: -7.046, z: 530.214 }, { x: -2.310, z: 528.549 }, { x: 2.314, z: 526.600 }, { x: 6.418, z: 523.724 }, { x: 9.650, z: 519.911 }, { x: 11.885, z: 515.423 }, { x: 13.841, z: 510.807 }, { x: 15.578, z: 506.109 }, { x: 16.386, z: 501.164 }, { x: 18.815, z: 496.818 }, { x: 21.963, z: 492.919 }, { x: 25.361, z: 489.238 }, { x: 28.968, z: 485.756 }, { x: 33.561, z: 483.823 }, { x: 38.557, z: 483.343 }, { x: 43.579, z: 483.294 }, { x: 48.502, z: 483.871 }, { x: 51.981, z: 486.514 }, { x: 54.756, z: 490.196 }, { x: 55.150, z: 494.484 } ],
        bbox: {
        minX: -120.193 - bboxEpsilon,
        maxX: 55.150 + bboxEpsilon,
        minZ: 483.294 - bboxEpsilon,
        maxZ: 577.691 + bboxEpsilon,
        }
      },
    }
  },

  9: {
    par: 4,
    panelHoleNumber: 6,
    panelSpawnPosition: "Right",
    heightMap: { grid: HeightMap_Hole_9 },
    teeOffPt: { x: 554.738, y: 230.758, z: 103.540 },
    teeOffPlayerPts: [ { x: 550.512, y: 230.369, z: 95.644 }, { x: 545.788, y: 230.613, z: 103.167 } ],
    teeOffSpawnDirection: "TowardsFlag",
    cartPts: [ {x: 578.515, y: 233.948, z: 83.000}, {x: 573.209, y: 233.714, z: 78.845} ],
    spawnBag: true,
    flagPt: { x: 798.704, y: 243.523, z: 263.061 },
    spawnFlag: true,
    teeBoxClubs: [ClubType.DR1, ClubType.DR3],
    cameraAimPts: [ { x: 703.079, y: 237.925, z: 197.830 } ],
    surfaces: {
      [SurfaceType.TeeBox]: { // Note: This matches what could be used as the green area if hole is inversed
        hull: [ { x: 535.956, z: 100.214 }, { x: 532.161, z: 102.711 }, { x: 529.226, z: 106.084 }, { x: 528.499, z: 110.498 }, { x: 530.297, z: 114.626 }, { x: 533.341, z: 117.978 }, { x: 537.376, z: 119.983 }, { x: 541.891, z: 119.856 }, { x: 546.264, z: 118.062 }, { x: 550.239, z: 115.054 }, { x: 553.845, z: 111.578 }, { x: 557.283, z: 107.924 }, { x: 559.850, z: 103.618 }, { x: 561.342, z: 98.841 }, { x: 561.493, z: 93.830 }, { x: 560.479, z: 88.925 }, { x: 557.979, z: 84.660 }, { x: 553.754, z: 82.023 }, { x: 549.018, z: 82.719 }, { x: 545.486, z: 86.210 }, { x: 542.479, z: 90.219 }, { x: 539.999, z: 94.586 }, { x: 537.470, z: 98.556 } ],
        bbox: {
          minX: 528.499 - bboxEpsilon,
          maxX: 561.493 + bboxEpsilon,
          minZ: 82.023 - bboxEpsilon,
          maxZ: 119.983 + bboxEpsilon,
        }
      },
      [SurfaceType.Green]: {
        hull: [ { x: 780.754, z: 264.233 }, { x: 776.508, z: 267.412 }, { x: 772.699, z: 271.098 }, { x: 769.345, z: 275.194 }, { x: 768.028, z: 280.287 }, { x: 768.644, z: 285.517 }, { x: 771.276, z: 290.078 }, { x: 775.895, z: 292.577 }, { x: 781.087, z: 293.357 }, { x: 786.288, z: 292.357 }, { x: 791.533, z: 291.770 }, { x: 796.806, z: 291.468 }, { x: 801.707, z: 289.530 }, { x: 805.172, z: 285.607 }, { x: 806.684, z: 280.556 }, { x: 807.407, z: 275.778 }, { x: 808.104, z: 270.832 }, { x: 809.191, z: 265.667 }, { x: 811.032, z: 260.693 }, { x: 811.750, z: 255.472 }, { x: 809.901, z: 250.574 }, { x: 805.894, z: 247.156 }, { x: 800.750, z: 246.166 }, { x: 795.956, z: 248.307 }, { x: 792.339, z: 252.087 }, { x: 790.186, z: 256.930 }, { x: 786.309, z: 260.490 }, { x: 781.929, z: 263.299 } ],
        bbox: {
          minX: 768.028 - bboxEpsilon,
          maxX: 811.750 + bboxEpsilon,
          minZ: 246.166 - bboxEpsilon,
          maxZ: 293.357 + bboxEpsilon,
        }
      },
      [SurfaceType.Fringe]: {
        hull: [ { x: 784.548, z: 258.731 }, { x: 788.101, z: 254.960 }, { x: 791.319, z: 250.898 }, { x: 793.583, z: 246.898 }, { x: 797.240, z: 244.605 }, { x: 801.770, z: 244.284 }, { x: 806.165, z: 245.207 }, { x: 810.064, z: 247.478 }, { x: 812.089, z: 251.456 }, { x: 812.929, z: 255.924 }, { x: 813.227, z: 260.438 }, { x: 812.538, z: 264.931 }, { x: 810.173, z: 268.712 }, { x: 806.943, z: 271.676 }, { x: 805.010, z: 276.386 }, { x: 802.703, z: 281.033 }, { x: 799.194, z: 284.852 }, { x: 795.093, z: 288.040 }, { x: 790.672, z: 290.777 }, { x: 786.121, z: 293.286 }, { x: 781.345, z: 295.320 }, { x: 776.209, z: 295.524 }, { x: 771.399, z: 293.695 }, { x: 767.181, z: 290.690 }, { x: 764.847, z: 286.129 }, { x: 764.313, z: 280.982 }, { x: 765.094, z: 276.655 }, { x: 767.416, z: 272.862 }, { x: 771.668, z: 271.396 }, { x: 775.068, z: 268.378 }, { x: 778.436, z: 265.336 }, { x: 781.592, z: 262.064 } ],
        bbox: {
          minX: 764.313 - bboxEpsilon,
          maxX: 813.227 + bboxEpsilon,
          minZ: 244.284 - bboxEpsilon,
          maxZ: 295.524 + bboxEpsilon,
        }
      },
      [SurfaceType.Sand]: [
        { hull: [ { x: 825.217, z: 258.040 }, { x: 827.131, z: 262.639 }, { x: 828.711, z: 267.588 }, { x: 830.027, z: 272.598 }, { x: 829.968, z: 277.782 }, { x: 827.937, z: 282.507 }, { x: 824.441, z: 286.276 }, { x: 820.137, z: 289.102 }, { x: 816.783, z: 292.960 }, { x: 812.088, z: 293.627 }, { x: 808.797, z: 290.404 }, { x: 809.372, z: 285.318 }, { x: 811.095, z: 280.466 }, { x: 813.012, z: 275.683 }, { x: 815.129, z: 270.950 }, { x: 816.271, z: 265.905 }, { x: 815.997, z: 261.465 }, { x: 817.362, z: 257.392 }, { x: 821.461, z: 255.928 } ], bbox: { minX: 808.797 - bboxEpsilon, maxX: 830.027 + bboxEpsilon, minZ: 255.928 - bboxEpsilon, maxZ: 293.627 + bboxEpsilon }},
        { hull: [ { x: 798.106, z: 308.917 }, { x: 794.115, z: 311.043 }, { x: 790.242, z: 313.331 }, { x: 786.317, z: 316.502 }, { x: 781.976, z: 317.953 }, { x: 777.919, z: 316.421 }, { x: 775.628, z: 312.557 }, { x: 772.266, z: 309.651 }, { x: 768.503, z: 307.193 }, { x: 766.843, z: 303.032 }, { x: 768.528, z: 299.035 }, { x: 772.848, z: 297.170 }, { x: 777.952, z: 297.488 }, { x: 783.065, z: 296.577 }, { x: 788.224, z: 295.995 }, { x: 792.752, z: 295.679 }, { x: 797.209, z: 295.901 }, { x: 800.692, z: 298.661 }, { x: 801.628, z: 302.937 }, { x: 799.779, z: 307.055 } ], bbox: { minX: 766.843 - bboxEpsilon, maxX: 801.628 + bboxEpsilon, minZ: 295.679 - bboxEpsilon, maxZ: 317.953 + bboxEpsilon }},
        { hull: [ { x: 786.226, z: 205.070 }, { x: 791.366, z: 205.724 }, { x: 796.112, z: 207.597 }, { x: 799.003, z: 211.811 }, { x: 798.374, z: 216.781 }, { x: 795.110, z: 220.627 }, { x: 790.107, z: 221.894 }, { x: 785.163, z: 220.456 }, { x: 780.595, z: 218.005 }, { x: 776.421, z: 214.945 }, { x: 774.005, z: 210.523 }, { x: 774.615, z: 206.069 }, { x: 779.460, z: 204.498 }, { x: 784.594, z: 204.873 } ], bbox: { minX: 774.005 - bboxEpsilon, maxX: 799.003 + bboxEpsilon, minZ: 204.498 - bboxEpsilon, maxZ: 221.894 + bboxEpsilon }},
        { hull: [ { x: 697.190, z: 157.598 }, { x: 693.755, z: 153.741 }, { x: 690.780, z: 149.514 }, { x: 687.970, z: 145.309 }, { x: 683.390, z: 145.270 }, { x: 679.998, z: 148.866 }, { x: 679.814, z: 153.356 }, { x: 677.928, z: 157.469 }, { x: 677.964, z: 161.863 }, { x: 681.961, z: 163.959 }, { x: 686.924, z: 163.177 }, { x: 691.794, z: 163.767 }, { x: 696.028, z: 166.753 }, { x: 700.898, z: 166.322 }, { x: 701.950, z: 162.057 }, { x: 698.437, z: 159.528 } ], bbox: { minX: 677.928 - bboxEpsilon, maxX: 701.950 + bboxEpsilon, minZ: 145.270 - bboxEpsilon, maxZ: 166.753 + bboxEpsilon }},
        { hull: [ { x: 555.425, z: 138.240 }, { x: 551.098, z: 136.013 }, { x: 546.611, z: 134.860 }, { x: 543.208, z: 131.855 }, { x: 542.422, z: 127.524 }, { x: 546.577, z: 125.396 }, { x: 551.206, z: 124.341 }, { x: 555.591, z: 123.249 }, { x: 560.055, z: 122.808 }, { x: 563.472, z: 125.513 }, { x: 564.203, z: 129.982 }, { x: 565.909, z: 134.153 }, { x: 569.019, z: 137.455 }, { x: 567.068, z: 141.614 }, { x: 562.887, z: 143.080 }, { x: 558.738, z: 141.402 } ], bbox: { minX: 542.422 - bboxEpsilon, maxX: 569.019 + bboxEpsilon, minZ: 122.808 - bboxEpsilon, maxZ: 143.080 + bboxEpsilon }},
        { hull: [ { x: 515.990, z: 93.656 }, { x: 514.563, z: 88.970 }, { x: 514.955, z: 83.997 }, { x: 517.560, z: 79.752 }, { x: 521.585, z: 76.781 }, { x: 525.980, z: 74.510 }, { x: 530.914, z: 73.663 }, { x: 535.924, z: 73.743 }, { x: 539.532, z: 76.306 }, { x: 539.288, z: 81.100 }, { x: 537.577, z: 85.734 }, { x: 534.984, z: 90.023 }, { x: 531.827, z: 93.910 }, { x: 527.572, z: 96.487 }, { x: 522.774, z: 97.787 }, { x: 518.500, z: 96.222 } ], bbox: { minX: 514.563 - bboxEpsilon, maxX: 539.532 + bboxEpsilon, minZ: 73.663 - bboxEpsilon, maxZ: 97.787 + bboxEpsilon }},
      ],
      [SurfaceType.Fairway]: {
        hull: [ { x: 564.121, z: 94.335 }, { x: 563.392, z: 99.270 }, { x: 560.964, z: 103.652 }, { x: 558.296, z: 107.908 }, { x: 555.299, z: 111.925 }, { x: 552.118, z: 115.777 }, { x: 556.564, z: 117.139 }, { x: 561.568, z: 117.278 }, { x: 566.448, z: 118.245 }, { x: 570.434, z: 121.258 }, { x: 574.074, z: 124.708 }, { x: 576.997, z: 128.767 }, { x: 579.314, z: 133.217 }, { x: 581.193, z: 137.847 }, { x: 582.352, z: 142.730 }, { x: 583.671, z: 147.574 }, { x: 585.570, z: 152.213 }, { x: 587.777, z: 156.723 }, { x: 590.281, z: 161.068 }, { x: 593.371, z: 165.023 }, { x: 596.788, z: 168.699 }, { x: 600.487, z: 172.089 }, { x: 604.422, z: 175.208 }, { x: 608.525, z: 178.103 }, { x: 612.855, z: 180.649 }, { x: 617.327, z: 182.932 }, { x: 621.997, z: 184.778 }, { x: 626.759, z: 186.379 }, { x: 631.604, z: 187.697 }, { x: 636.535, z: 188.654 }, { x: 641.481, z: 189.540 }, { x: 646.433, z: 190.377 }, { x: 651.308, z: 191.578 }, { x: 656.037, z: 193.251 }, { x: 660.525, z: 195.480 }, { x: 664.726, z: 198.203 }, { x: 668.462, z: 201.541 }, { x: 672.167, z: 204.926 }, { x: 676.367, z: 207.665 }, { x: 680.512, z: 210.488 }, { x: 684.466, z: 213.578 }, { x: 688.380, z: 216.715 }, { x: 692.479, z: 219.600 }, { x: 696.665, z: 222.358 }, { x: 700.888, z: 225.062 }, { x: 705.131, z: 227.738 }, { x: 709.419, z: 230.333 }, { x: 713.823, z: 232.732 }, { x: 718.342, z: 234.913 }, { x: 722.994, z: 236.794 }, { x: 727.805, z: 238.221 }, { x: 732.703, z: 239.288 }, { x: 737.629, z: 240.227 }, { x: 742.587, z: 240.938 }, { x: 747.601, z: 241.059 }, { x: 752.523, z: 240.294 }, { x: 756.936, z: 237.969 }, { x: 760.288, z: 234.263 }, { x: 762.998, z: 230.054 }, { x: 764.336, z: 225.215 }, { x: 764.275, z: 220.232 }, { x: 762.467, z: 215.590 }, { x: 759.825, z: 211.330 }, { x: 756.748, z: 207.362 }, { x: 753.670, z: 203.399 }, { x: 750.758, z: 199.335 }, { x: 747.538, z: 195.488 }, { x: 743.912, z: 192.018 }, { x: 740.027, z: 188.836 }, { x: 736.017, z: 185.813 }, { x: 731.894, z: 182.950 }, { x: 727.431, z: 180.654 }, { x: 722.868, z: 178.555 }, { x: 718.197, z: 176.711 }, { x: 713.452, z: 175.064 }, { x: 708.610, z: 173.725 }, { x: 703.753, z: 172.475 }, { x: 698.846, z: 171.421 }, { x: 693.908, z: 170.541 }, { x: 688.983, z: 169.666 }, { x: 684.079, z: 168.649 }, { x: 679.444, z: 166.787 }, { x: 675.748, z: 163.460 }, { x: 674.072, z: 158.764 }, { x: 674.155, z: 153.758 }, { x: 675.445, z: 148.914 }, { x: 676.864, z: 144.105 }, { x: 677.626, z: 139.142 }, { x: 677.763, z: 134.133 }, { x: 676.962, z: 129.189 }, { x: 674.673, z: 124.744 }, { x: 671.603, z: 120.784 }, { x: 668.037, z: 117.294 }, { x: 663.836, z: 114.571 }, { x: 659.485, z: 112.129 }, { x: 655.067, z: 109.761 }, { x: 650.736, z: 107.228 }, { x: 646.535, z: 104.494 }, { x: 642.283, z: 101.825 }, { x: 637.918, z: 99.349 }, { x: 633.337, z: 97.295 }, { x: 628.602, z: 95.632 }, { x: 623.754, z: 94.341 }, { x: 618.743, z: 94.158 }, { x: 613.736, z: 94.558 }, { x: 608.777, z: 95.239 }, { x: 603.842, z: 96.037 }, { x: 599.029, z: 97.335 }, { x: 594.463, z: 99.382 }, { x: 589.649, z: 100.745 }, { x: 584.664, z: 101.315 }, { x: 579.676, z: 100.849 }, { x: 574.902, z: 99.308 }, { x: 570.371, z: 97.194 }, { x: 566.430, z: 94.113 } ],
        bbox: {
          minX: 552.118 - bboxEpsilon,
          maxX: 764.336 + bboxEpsilon,
          minZ: 94.113 - bboxEpsilon,
          maxZ: 241.059 + bboxEpsilon,
        }
      },
    }
  },
};

let COURSE_TOTAL_PAR: number; // it is used - KEEP IN

//************************
// -/ GBL: BALL PHYSICS
//************************

const ballPhys = {
  g: 9.81, // gravity (m/s2)
  dt: GLOBAL_TICK_RATE, //previously 0.015 // tick time for simulation
  airDecay: 0.1, // fraction of speed lost per second in air
  liftCoefficient: 11, // magnus lift effect
  initialSpinPushFactor: 0, // initial horizontal direction change from side spin (hook/slice)
  spinForceFactor: 0.0025, // air horizontal direction change (hook/slice)
  maxSlopeAcceleration: 0.5, // cap acceleration from slope (m/s2)
  minRollSpeed: 0.07, // minimum roll speed before stopping
  liftBase: 0.00052, // gard cap for lift
  rockBounceFactor: 2, // higher = increases the effect of rock bounce
};

//************************
// -/ GBL: SWING
//************************

type PowerBoundsAndSteps = {
  min: number;
  max: number;
  numberOfSteps: number;
};

type PowerSettings = {
  initialPowerFactor: number;
  powerBoundsAndSteps: PowerBoundsAndSteps;
};

const POWER_STEPS = 0.05;
const MIN_POWER_FACTOR = 0.3;
const MAX_POWER_FACTOR = 1.0;

//************************
// -/ GBL: HIT MODIFIERS
//************************

type HitModifierState = {
  powerHit: boolean | number;
  superFocus: boolean | number;
  backSpin: boolean | number;
  //forwardSpin: boolean | number;
};

type HitModifierKey = keyof HitModifierState;

interface HitModifierConfig {
  type: HitModifierKey;
  detail: {
    title: string;
    description: string;
    flightTrail: mod.RuntimeSpawn_Common | null;
    effectFactor: number;
  };
}

const hitModifiers: Record<HitModifierKey, HitModifierConfig["detail"]> = {
  powerHit: {
    title: "Power Hit",
    description: "Increases ball speed and distance.",
    flightTrail: vfxPowerHitFlightTrail,
    effectFactor: 1.1,
  },
  superFocus: {
    title: "Super Focus",
    description: "Slows down power bar.",
    flightTrail: null,
    effectFactor: 0.5,
  },
  backSpin: {
    title: "Back Spin",
    description: "Increases backspin.",
    flightTrail: null,
    effectFactor: 1.1,
  },
  /*forwardSpin: {
    title: "Forward Spin",
    description: "Increases forward spin.",
    flightTrail: null,
    effectFactor: 1.1,
  },*/
};

const DEFAULT_HIT_MODIFIERS_INVENTORY: HitModifierState = {
  powerHit: 3,
  superFocus: 1,
  backSpin: 1,
  //forwardSpin: 0,
};

//************************
// -/ GBL: BALL
//************************

const FLAG_CUP_RADIUS = 0.25; //0.054 + 0.01; // 0.054 = 108mm diameter cup / 2

const BALL_REACH_SECOND_MIN = 30; // minimum time for player to reach ball
const BALL_REACH_SECOND_PER_YD = 0.25; // seconds per yard to reach ball (approx 15 yards = 3 seconds) //default was 0.17
const TEE_OFF_EXTRA_SECONDS = 10; // extra seconds added to reach ball time for tee off shot
const MAX_FAILED_INTERACT_ATTEMPTS = 3;

//************************
// -/ GBL: VEHICLES
//************************

type VehicleSpawnerState = {
  object?: mod.VehicleSpawner;
  id?: number;
  spawnPos?: V3;
  spawnYaw?: number;
  groupId?: number;
  vehicle?: mod.Vehicle;
  vehicleId?: number;
};

const AllVehicleSpawners: VehicleSpawnerState[] = [];

//************************
// -/ GBL: PLAYERS
//************************

enum ScoreUpdateType {
  MidHole,
  HoleComplete,
}

type PlayerRef = {
  object?: mod.Player;
  id?: number;
};

type PlayerUI = {
  firstLayerUI: {
    bottomBar?: UI.Container;
    currentlyPlayingLabel?: UI.Text;
  };
  firstSpawnUI: {
    root?: UI.Container;
  };
  ballHitUI: {
    root?: UI.Container;
    clubLabel?: UI.Text;
    clubPrevLabel?: UI.Text;
    clubPrevBtn?: UI.Button;
    clubNextBtn?: UI.Button;
    clubNextLabel?: UI.Text;
    hitConfirmButton?: UI.Button;
  };
  matchmakingUI: {
    state?: MatchmakingUIState;
    lastLayout?: MatchmakingUILayout;
    opened: boolean;
  };
  groupPlayersUI: {
    root?: UI.Container;
  };
  transitionUI: {
    root?: UI.Container;
  };
  surfaceUI: {
    root?: UI.Container;
    containerOutline?: UI.Container;
    surfaceKeyLabel?: UI.Text;
    surfacePowerPenaltyLabel?: UI.Text;
    surfaceAccuracyPenaltyLabel?: UI.Text;
    fairwayGrassContainers?: UI.Container[];
    roughGrassContainers?: UI.Container[];
    surfaceGround?: UI.Container;
  };
  swingUI: {
    root?: UI.Container;
    containerOutline?: UI.Container;
    directionBgLeft?: UI.Container;
    directionBgRight?: UI.Container;
    directionMiddleLine?: UI.Container;
    middleLine?: UI.Container;
    marker?: UI.Container;
    horizSpinStoppedMarker?: UI.Container;
    powerLineBg?: UI.Container;
    leftImage?: UI.Image;
    rightImage?: UI.Image;
    leftText?: UI.Text;
    rightText?: UI.Text;
  };
  powerUI: {
    bgRoot?: UI.Container;
    root?: UI.Container;
    oobText?: UI.Text;
    oobTextOutline?: UI.Container;
    fillContainer?: UI.Container;
    stepLineContainers?: { element: UI.Container; value: number }[];
    stepLabels?: { element: UI.Text; value: number }[];
  };
  notificationUI: {
    root?: UI.Container;
    timerProgressBar?: UI.Container;
    notifLabel?: UI.Text;
    cancelRequested: boolean;
    cancelToken?: number;
    token?: number;
    runningPromise?: Promise<void> | null;
    turnTimerActive: boolean;
  };
  gamemodeInfoUI: {
    root?: UI.Text;
  };
  serverFullText?: UI.Text | null;
};

type PlayerSound = {
  VO: mod.VO | null;
};

type GeneralState = {
  playerRef: PlayerRef;
  phase: "JOINING" | "IDLE" | "SWING_SETUP" | "SWING";
  coursesCompleted: number;
  currentClub: Club;
  inventoryModifiers: HitModifierState;
  activeModifiers: HitModifierState;
  isJumping: boolean;
  isProne: boolean;
  isReady: boolean;
  holePanelWorldIconName?: string | null;
  selectedLanguage: "en" | "cn";
  languageSuffix: "" | "_C";
};

type CourseState = {
  teeOffPoint?: mod.Vector | null;
  failedInteractAttempts: number;
  currentShot: number;
  onFirstShot: boolean;
  strokesPerHole: number[]; // index = holeIndex (0-based)
  holesCompleted: boolean[];
  wins: number;
};

type SwingState = {
  hitToken: number;
  phase:
    | "IDLE"
    | "MOVING_LEFT_1"
    | "MOVING_RIGHT"
    | "MOVING_LEFT_2"
    | "STOPPED_MID";
  pos: number;
  running: boolean;
  locked: boolean;
  leftLockedPos: number;
  rightLockedPos: number;
  lastSwingQuality: number;
  swingSpeed: number;
  predictionPosition: mod.Vector | null;
  predictionVisible: boolean;
  selectedPowerFactor?: number | null;
  powerBoundsAndSteps?: PowerBoundsAndSteps | null;
  putterVelocityFactor?: number | null;
  hitCamDefaultPos?: V3 | null;
};

type BallState = {
  object?: mod.SpatialObject | null;
  interactPoint?: mod.InteractPoint | null;
  trailFXId?: number | null;
  ballWorldIconName?: string | null;
  predictedWorldIconName?: string | null;
  predictedFx?: mod.VFX | null;
  carryWorldIconName?: string | null;
  token: number;
  phase:
    | "IDLE"
    | "SWING"
    | "FLIGHT"
    | "BOUNCE"
    | "ROLL"
    | "STOPPED"
    | "OUTBOUND";
  lastShotDistance: number;
  lastObjectPos?: V3 | null;
  lastTrailFxPos?: V3 | null;
  distanceToFlag?: number | null;
  currentSurface: SurfaceType;
  lastIconPos?: V3 | null;
  isOutOfBounds: boolean;
  isInHole: boolean;
};

type PlayerState = {
  ui: PlayerUI;
  sound: PlayerSound;
  general: GeneralState;
  course: CourseState;
  swing: SwingState;
  ball: BallState;
};

const players: { [playerId: number]: PlayerState } = {};

//************************
// -/ GBL: GROUPS
//************************

type GroupUI = {
  notificationUI: {
    root?: UI.Container;
    timerProgressBar?: UI.Container;
    notifLabel?: UI.Text;
    cancelRequested: boolean;
    cancelToken?: number;
    token?: number;
    runningPromise?: Promise<void> | null;
  };
  groupPlayersUI: {
    distanceToFlagLabels?: Record<number, UI.Text>;
  };
  groupScoreboardUI: {
    root?: UI.Container;
  };
};

type GroupPlayer = {
  pid: number;
  player: mod.Player;
};

type CourseMode = "NORMAL" | "FAST";

type CourseGroup = {
  groupId: number;
  groupUniqueId: number;
  team: mod.Team;
  players: GroupPlayer[];
  currentHole: number;
  courseMode: CourseMode;
  nextHole: number;
  playingBallFx?: mod.VFX | null;
  golfBagObject?: mod.SpatialObject | null;
  flagPoleObject?: mod.SpatialObject | null;
  holePanelObject?: mod.SpatialObject | null;
  flagWorldIconName?: string | null;
  flagFx?: mod.VFX | null;
  phase: "LOBBY" | "LOADING_HOLE" | "PLAYING_TEEOFF" | "PLAYING_COURSE";
  currentPlayer?: mod.Player | null;
  previousPlayer?: mod.Player | null;
  currentLeadingPlayers: mod.Player[] | null;
  previousLeadingPlayers: mod.Player[] | null;
  ui: GroupUI;
};

const WINS_NEEDED_TO_END_GAMEMODE = 1;

const LOBBY_TEAM_ID = 1;
const MAX_GROUPS = 1; // Team 1 as lobby. For MAX_GROUPS = 3, Teams 2-4 must be setup in Portal for the course groups
const MAX_PLAYERS_PER_GROUP = 4;

const AllGroups: Record<number, CourseGroup> = {};

//************************
// -/ GBL: WORLD ICONS
//************************

const GOLF_BALL_ICON_Y_OFFSET = 0.5;
const PIN_ICON_Y_OFFSET = 3;

//************************
// -/ GBL: UI
//************************

const ROOT_DEFAULT_BG_ALPHA = 0.95;

const NOTIFICATION_DEFAULT_LAYOUT = {
  width: 500,
  height: 100,
};

const MATCHMAKING_DEFAULT_LAYOUT = {
  width: 600,
  height: 0,
  padding: 10,
  ctnPadding: 10,
  groupsCtnY: 30,
  groupCtnHeight: 150,
  groupBtnWidth: 100,
  smallBtnHeight: 40,
  smallBtnTextSize: 20,
  largeBtnHeight: 50,
  largeBtnTextSize: 20,
};

const SWING_UI_DEFAULT_POS = {
  x: 0,
  y: 285,
};

type MatchmakingUILayout = typeof MATCHMAKING_DEFAULT_LAYOUT;

enum NotifyPosition {
  Top,
  Center,
  Bottom,
}

const BALL_INTERACT_POINT_Y_OFFSET = 0.02;

const SWING_WIDTH = 1000;
const SWING_HEIGHT = 40;
const MARKER_WIDTH = 8;
const SWING_LINE_WIDTH = 4;
const SWING_LEFT_LINE_X = SWING_WIDTH * 0.2;
const SWING_MID_LINE_X = SWING_WIDTH * 0.5;
const SWING_RIGHT_LINE_X = SWING_WIDTH - SWING_LINE_WIDTH;
const LEFT_BUFFER_WIDTH = 150;
const RIGHT_BUFFER_WIDTH = 400;

const SWING_SPEED_MAX_DEFAULT = 1200; // px/s
const SWING_SPEED_MAX_PUTTER = 300; // px/s
const SWING_SPEED_START = 20;
const SWING_SPEED_FACTOR_DEFAULT = 1;
const SWING_EXPONENTIAL_FACTOR_DEFAULT = 3;

//************************
// -/ UI NAMESPACE
//************************

// version: 2.0.1
export namespace UI {
  export const COLORS = {
    BLACK: mod.CreateVector(0, 0, 0),
    GREY_25: mod.CreateVector(0.25, 0.25, 0.25),
    GREY_50: mod.CreateVector(0.5, 0.5, 0.5),
    GREY_75: mod.CreateVector(0.75, 0.75, 0.75),
    WHITE: mod.CreateVector(1, 1, 1),
    RED: mod.CreateVector(1, 0, 0),
    GREEN: mod.CreateVector(0, 1, 0),
    BLUE: mod.CreateVector(0, 0, 1),
    YELLOW: mod.CreateVector(1, 1, 0),
    GOLD_YELLOW: mod.CreateVector(1, 0.8431, 0), // #FFD700
    GOLD_YELLOW_DARK: mod.CreateVector(0.6431, 0.5333, 0), // #A47F00
    PURPLE: mod.CreateVector(1, 0, 1),
    CYAN: mod.CreateVector(0, 1, 1),
    MAGENTA: mod.CreateVector(1, 0, 1),
    BF_GREY_1: mod.CreateVector(0.8353, 0.9216, 0.9765), // D5EBF9
    BF_GREY_2: mod.CreateVector(0.3294, 0.3686, 0.3882), // 545E63
    BF_GREY_3: mod.CreateVector(0.2118, 0.2235, 0.2353), // 36393C
    BF_GREY_4: mod.CreateVector(0.0314, 0.0431, 0.0431), // 080B0B,
    BF_BLUE_BRIGHT: mod.CreateVector(0.4392, 0.9216, 1.0), // 70EBFF
    BF_BLUE_DARK: mod.CreateVector(0.0745, 0.1843, 0.2471), // 132F3F
    BF_RED_BRIGHT: mod.CreateVector(1.0, 0.5137, 0.3804), // FF8361
    BF_RED_DARK: mod.CreateVector(0.251, 0.0941, 0.0667), // 401811
    BF_GREEN_BRIGHT: mod.CreateVector(0.6784, 0.9922, 0.5255), // ADFD86
    BF_GREEN_DARK: mod.CreateVector(0.2784, 0.4471, 0.2118), // 477236
    BF_YELLOW_BRIGHT: mod.CreateVector(1.0, 0.9882, 0.6118), // FFFC9C
    BF_YELLOW_DARK: mod.CreateVector(0.4431, 0.3765, 0.0), // 716000
  };

  type Params = {
    type?: Type;
    name?: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    anchor?: mod.UIAnchor;
    parent?: mod.UIWidget | Node;
    visible?: boolean;
    padding?: number;
    bgColor?: mod.Vector;
    bgAlpha?: number;
    bgFill?: mod.UIBgFill;
    depth?: mod.UIDepth;
  };

  export type ContainerParams = Params & {
    childrenParams?: (ContainerParams | TextParams | ButtonParams)[];
  };

  export type TextParams = Params & {
    message: mod.Message;
    textSize?: number;
    textColor?: mod.Vector;
    textAlpha?: number;
    textAnchor?: mod.UIAnchor;
  };

  export type LabelParams = {
    message: mod.Message;
    textSize?: number;
    textColor?: mod.Vector;
    textAlpha?: number;
    textAnchor?: mod.UIAnchor;
    padding?: number;
  };

  export type ButtonParams = Params & {
    buttonEnabled?: boolean;
    baseColor?: mod.Vector;
    baseAlpha?: number;
    disabledColor?: mod.Vector;
    disabledAlpha?: number;
    pressedColor?: mod.Vector;
    pressedAlpha?: number;
    hoverColor?: mod.Vector;
    hoverAlpha?: number;
    focusedColor?: mod.Vector;
    focusedAlpha?: number;
    disabledOnClick?: boolean;
    onClick?: (player: mod.Player) => Promise<void>;
    label?: LabelParams;
  };

  export type ImageParams = Params & {
    imageType?: mod.UIImageType;
    imageColor?: mod.Vector;
    imageAlpha?: number;
  };

  export enum Type {
    Root = "root",
    Container = "container",
    Text = "text",
    Button = "button",
    Image = "image",
    Unknown = "unknown",
  }

  export class Node {
    protected _uiWidget: mod.UIWidget;

    protected _type: Type;

    protected _name: string;

    public constructor(uiWidget: mod.UIWidget, type: Type, name: string) {
      this._uiWidget = uiWidget;
      this._type = type;
      this._name = name;
    }

    public get uiWidget(): mod.UIWidget {
      return this._uiWidget;
    }

    public get type(): Type {
      return this._type;
    }

    public get name(): string {
      return this._name;
    }
  }

  export type Size = {
    width: number;
    height: number;
  };

  export type Position = {
    x: number;
    y: number;
  };

  const CLICK_HANDLERS = new Map<
    string,
    (player: mod.Player) => Promise<void>
  >();
  const BUTTON_DISABLE_ON_CLICK = new Map<string, boolean>();
  const BUTTON_COOLDOWNS = new Set<string>();

  export const ROOT_NODE = new Node(mod.GetUIRoot(), Type.Root, "ui_root");

  let counter: number = 0;

  function makeName(parent: Node, receiver?: mod.Player | mod.Team): string {
    return `${parent.name}${
      receiver ? `_${mod.GetObjId(receiver)}` : ""
    }_${counter++}`;
  }

  function parseNode(node?: Node | mod.UIWidget): Node {
    if (!node) return ROOT_NODE;

    if (node instanceof Node) return node as Node;

    return new Node(node as mod.UIWidget, Type.Unknown, "ui_unknown");
  }

  export class Element extends Node {
    protected _parent: Node;

    public constructor(
      uiWidget: mod.UIWidget,
      type: Type,
      name: string,
      parent: Node,
    ) {
      super(uiWidget, type, name);
      this._parent = parent;
    }

    public get parent(): Node {
      return this._parent;
    }

    public get visible(): boolean {
      return mod.GetUIWidgetVisible(this._uiWidget);
    }

    public set visible(visible: boolean) {
      mod.SetUIWidgetVisible(this._uiWidget, visible);
    }

    public setVisible(visible: boolean): Node {
      this.visible = visible;
      return this;
    }

    public show(): Node {
      this.visible = true;
      return this;
    }

    public hide(): Node {
      this.visible = false;
      return this;
    }

    public toggle(): Node {
      this.visible = !this.visible;
      return this;
    }

    public delete(): void {
      mod.DeleteUIWidget(this._uiWidget);
    }

    public get position(): Position {
      const position = mod.GetUIWidgetPosition(this._uiWidget);
      return { x: mod.XComponentOf(position), y: mod.YComponentOf(position) };
    }

    public set position(params: Position) {
      mod.SetUIWidgetPosition(
        this._uiWidget,
        mod.CreateVector(params.x, params.y, 0),
      );
    }

    public setPosition(params: Position): Node {
      this.position = params;
      return this;
    }

    public get size(): Size {
      const size = mod.GetUIWidgetSize(this._uiWidget);
      return { width: mod.XComponentOf(size), height: mod.YComponentOf(size) };
    }

    public set size(params: Size) {
      mod.SetUIWidgetSize(
        this._uiWidget,
        mod.CreateVector(params.width, params.height, 0),
      );
    }

    public setSize(params: Size): Node {
      this.size = params;
      return this;
    }

    public get bgColor(): mod.Vector {
      return mod.GetUIWidgetBgColor(this._uiWidget);
    }

    public set bgColor(color: mod.Vector) {
      mod.SetUIWidgetBgColor(this._uiWidget, color);
    }

    public setBgColor(color: mod.Vector): Node {
      this.bgColor = color;
      return this;
    }

    public get bgAlpha(): number {
      return mod.GetUIWidgetBgAlpha(this._uiWidget);
    }

    public set bgAlpha(alpha: number) {
      mod.SetUIWidgetBgAlpha(this._uiWidget, alpha);
    }

    public setBgAlpha(alpha: number): Node {
      this.bgAlpha = alpha;
      return this;
    }

    public get bgFill(): mod.UIBgFill {
      return mod.GetUIWidgetBgFill(this._uiWidget);
    }

    public set bgFill(fill: mod.UIBgFill) {
      mod.SetUIWidgetBgFill(this._uiWidget, fill);
    }

    public setBgFill(fill: mod.UIBgFill): Node {
      this.bgFill = fill;
      return this;
    }

    public get depth(): mod.UIDepth {
      return mod.GetUIWidgetDepth(this._uiWidget);
    }

    public set depth(depth: mod.UIDepth) {
      mod.SetUIWidgetDepth(this._uiWidget, depth);
    }

    public setDepth(depth: mod.UIDepth): Node {
      this.depth = depth;
      return this;
    }

    public get anchor(): mod.UIAnchor {
      return mod.GetUIWidgetAnchor(this._uiWidget);
    }

    public set anchor(anchor: mod.UIAnchor) {
      mod.SetUIWidgetAnchor(this._uiWidget, anchor);
    }

    public setAnchor(anchor: mod.UIAnchor): Node {
      this.anchor = anchor;
      return this;
    }

    public get padding(): number {
      return mod.GetUIWidgetPadding(this._uiWidget);
    }

    public set padding(padding: number) {
      mod.SetUIWidgetPadding(this._uiWidget, padding);
    }

    public setPadding(padding: number): Node {
      this.padding = padding;
      return this;
    }
  }

  export class Container extends Element {
    private _children: (Container | Text | Button | Image)[];

    public get children(): (Container | Text | Button | Image)[] {
      return this._children;
    }

    public constructor(
      params: ContainerParams,
      receiver?: mod.Player | mod.Team,
    ) {
      const parent = parseNode(params.parent);
      const name = params.name ?? makeName(parent, receiver);

      const args: [
        string,
        mod.Vector,
        mod.Vector,
        mod.UIAnchor,
        mod.UIWidget,
        boolean,
        number,
        mod.Vector,
        number,
        mod.UIBgFill,
        mod.UIDepth,
      ] = [
        name,
        mod.CreateVector(params.x ?? 0, params.y ?? 0, 0),
        mod.CreateVector(params.width ?? 0, params.height ?? 0, 0),
        params.anchor ?? mod.UIAnchor.Center,
        parent.uiWidget,
        params.visible ?? true,
        params.padding ?? 0,
        params.bgColor ?? COLORS.WHITE,
        params.bgAlpha ?? 0,
        params.bgFill ?? mod.UIBgFill.None,
        params.depth ?? mod.UIDepth.AboveGameUI,
      ];

      if (receiver == undefined) {
        mod.AddUIContainer(...args);
      } else {
        mod.AddUIContainer(...args, receiver);
      }

      const uiWidget = mod.FindUIWidgetWithName(name) as mod.UIWidget;

      super(uiWidget, Type.Container, name, parent);

      this._children = [];

      for (const childParams of params.childrenParams ?? []) {
        childParams.parent = this;

        const child =
          childParams.type === Type.Container
            ? new Container(childParams)
            : childParams.type === Type.Text
              ? new Text(childParams as TextParams)
              : childParams.type === Type.Button
                ? new Button(childParams as ButtonParams)
                : childParams.type === Type.Image
                  ? new Image(childParams as ImageParams)
                  : undefined;

        if (!child) continue;

        this._children.push(child);
      }
    }
  }

  export class Text extends Element {
    public constructor(params: TextParams, receiver?: mod.Player | mod.Team) {
      const parent = parseNode(params.parent);
      const name = params.name ?? makeName(parent, receiver);

      const args: [
        string,
        mod.Vector,
        mod.Vector,
        mod.UIAnchor,
        mod.UIWidget,
        boolean,
        number,
        mod.Vector,
        number,
        mod.UIBgFill,
        mod.Message,
        number,
        mod.Vector,
        number,
        mod.UIAnchor,
        mod.UIDepth,
      ] = [
        name,
        mod.CreateVector(params.x ?? 0, params.y ?? 0, 0),
        mod.CreateVector(params.width ?? 0, params.height ?? 0, 0),
        params.anchor ?? mod.UIAnchor.Center,
        parent.uiWidget,
        params.visible ?? true,
        params.padding ?? 0,
        params.bgColor ?? COLORS.WHITE,
        params.bgAlpha ?? 0,
        params.bgFill ?? mod.UIBgFill.None,
        params.message,
        params.textSize ?? 36,
        params.textColor ?? COLORS.BLACK,
        params.textAlpha ?? 1,
        params.textAnchor ?? mod.UIAnchor.Center,
        params.depth ?? mod.UIDepth.AboveGameUI,
      ];

      if (receiver == undefined) {
        mod.AddUIText(...args);
      } else {
        mod.AddUIText(...args, receiver);
      }

      const uiWidget = mod.FindUIWidgetWithName(name) as mod.UIWidget;

      super(uiWidget, Type.Text, name, parent);
    }

    public set message(message: mod.Message) {
      mod.SetUITextLabel(this._uiWidget, message);
    }

    public setMessage(message: mod.Message): Text {
      this.message = message;
      return this;
    }

    public set textColor(color: mod.Vector) {
      mod.SetUITextColor(this._uiWidget, color);
    }

    public setTextColor(color: mod.Vector): Text {
      this.textColor = color;
      return this;
    }

    public set textAlpha(alpha: number) {
      mod.SetUITextAlpha(this._uiWidget, alpha);
    }

    public setTextAlpha(alpha: number): Text {
      this.textAlpha = alpha;
      return this;
    }

    public set textAnchor(anchor: number) {
      mod.SetUITextAnchor(this._uiWidget, anchor);
    }

    public setTextAnchor(anchor: number): Text {
      this.textAnchor = anchor;
      return this;
    }
  }

  export class Button extends Element {
    private _buttonName: string;

    private _buttonClickDisabled: boolean = false;

    private _buttonUiWidget: mod.UIWidget;

    private _label?: Text;

    public constructor(params: ButtonParams, receiver?: mod.Player | mod.Team) {
      const parent = parseNode(params.parent);

      const containerParams: ContainerParams = {
        x: params.x,
        y: params.y,
        width: params.width,
        height: params.height,
        anchor: params.anchor,
        parent: parent,
        visible: params.visible,
        padding: 0,
        bgColor: COLORS.BF_GREY_4,
        bgAlpha: 0,
        bgFill: mod.UIBgFill.None,
        depth: params.depth ?? mod.UIDepth.AboveGameUI,
      };

      const container = new Container(containerParams, receiver);
      const containerUiWidget = container.uiWidget;

      super(containerUiWidget, Type.Button, container.name, container.parent);

      const buttonName = params.name ?? `${container.name}_button`;

      mod.AddUIButton(
        buttonName,
        mod.CreateVector(0, 0, 0),
        mod.CreateVector(params.width ?? 0, params.height ?? 0, 0),
        params.anchor ?? mod.UIAnchor.Center,
        containerUiWidget,
        true,
        params.padding ?? 0,
        params.bgColor ?? COLORS.WHITE,
        params.bgAlpha ?? 1,
        params.bgFill ?? mod.UIBgFill.Solid,
        params.buttonEnabled ?? true,
        params.baseColor ?? COLORS.WHITE,
        params.baseAlpha ?? 0.1,
        params.disabledColor ?? COLORS.WHITE,
        params.disabledAlpha ?? 0.05,
        params.pressedColor ?? COLORS.WHITE,
        params.pressedAlpha ?? 0.1,
        params.hoverColor ?? COLORS.WHITE,
        params.hoverAlpha ?? 1,
        params.focusedColor ?? COLORS.WHITE,
        params.focusedAlpha ?? 1,
        params.depth ?? mod.UIDepth.AboveGameUI,
      );

      if (params.onClick) {
        CLICK_HANDLERS.set(buttonName, params.onClick);
        BUTTON_DISABLE_ON_CLICK.set(buttonName, params.disabledOnClick ?? true);
      }

      const buttonUiWidget = mod.FindUIWidgetWithName(
        buttonName,
      ) as mod.UIWidget;

      this._label = params.label
        ? new Text({
            ...params.label,
            name: `${container.name}_label`,
            parent: container,
            width: params.width,
            height: params.height,
            visible: true,
            depth: params.depth,
          })
        : undefined;

      this._buttonName = buttonName;
      this._buttonUiWidget = buttonUiWidget;
    }

    public get buttonName(): string {
      return this._buttonName;
    }

    public get buttonUiWidget(): mod.UIWidget {
      return this._buttonUiWidget;
    }

    public get buttonClickDisabled(): boolean {
      return this._buttonClickDisabled;
    }

    public set buttonClickDisabled(disabled: boolean) {
      this._buttonClickDisabled = disabled;
    }

    public get alphaBase(): number {
      return mod.GetUIButtonAlphaBase(this._buttonUiWidget);
    }

    public set alphaBase(alpha: number) {
      mod.SetUIButtonAlphaBase(this._buttonUiWidget, alpha);
    }

    public setAlphaBase(alpha: number): Button {
      this.alphaBase = alpha;
      return this;
    }

    public get alphaDisabled(): number {
      return mod.GetUIButtonAlphaDisabled(this._buttonUiWidget);
    }

    public set alphaDisabled(alpha: number) {
      mod.SetUIButtonAlphaDisabled(this._buttonUiWidget, alpha);
    }

    public setAlphaDisabled(alpha: number): Button {
      this.alphaDisabled = alpha;
      return this;
    }

    public get alphaFocused(): number {
      return mod.GetUIButtonAlphaFocused(this._buttonUiWidget);
    }

    public set alphaFocused(alpha: number) {
      mod.SetUIButtonAlphaFocused(this._buttonUiWidget, alpha);
    }

    public setAlphaFocused(alpha: number): Button {
      this.alphaFocused = alpha;
      return this;
    }

    public get alphaHover(): number {
      return mod.GetUIButtonAlphaHover(this._buttonUiWidget);
    }

    public set alphaHover(alpha: number) {
      mod.SetUIButtonAlphaHover(this._buttonUiWidget, alpha);
    }

    public setAlphaHover(alpha: number): Button {
      this.alphaHover = alpha;
      return this;
    }

    public get alphaPressed(): number {
      return mod.GetUIButtonAlphaPressed(this._buttonUiWidget);
    }

    public set alphaPressed(alpha: number) {
      mod.SetUIButtonAlphaPressed(this._buttonUiWidget, alpha);
    }

    public setAlphaPressed(alpha: number): Button {
      this.alphaPressed = alpha;
      return this;
    }

    public get colorBase(): mod.Vector {
      return mod.GetUIButtonColorBase(this._buttonUiWidget);
    }

    public set colorBase(color: mod.Vector) {
      mod.SetUIButtonColorBase(this._buttonUiWidget, color);
    }

    public setColorBase(color: mod.Vector): Button {
      this.colorBase = color;
      return this;
    }

    public get colorDisabled(): mod.Vector {
      return mod.GetUIButtonColorDisabled(this._buttonUiWidget);
    }

    public set colorDisabled(color: mod.Vector) {
      mod.SetUIButtonColorDisabled(this._buttonUiWidget, color);
    }

    public setColorDisabled(color: mod.Vector): Button {
      this.colorDisabled = color;
      return this;
    }

    public get colorFocused(): mod.Vector {
      return mod.GetUIButtonColorFocused(this._buttonUiWidget);
    }

    public set colorFocused(color: mod.Vector) {
      mod.SetUIButtonColorFocused(this._buttonUiWidget, color);
    }

    public setColorFocused(color: mod.Vector): Button {
      this.colorFocused = color;
      return this;
    }

    public get colorHover(): mod.Vector {
      return mod.GetUIButtonColorHover(this._buttonUiWidget);
    }

    public set colorHover(color: mod.Vector) {
      mod.SetUIButtonColorHover(this._buttonUiWidget, color);
    }

    public setColorHover(color: mod.Vector): Button {
      this.colorHover = color;
      return this;
    }

    public get colorPressed(): mod.Vector {
      return mod.GetUIButtonColorPressed(this._buttonUiWidget);
    }

    public set colorPressed(color: mod.Vector) {
      mod.SetUIButtonColorPressed(this._buttonUiWidget, color);
    }

    public setColorPressed(color: mod.Vector): Button {
      this.colorPressed = color;
      return this;
    }

    public get enabled(): boolean {
      return mod.GetUIButtonEnabled(this._buttonUiWidget);
    }

    public set enabled(enabled: boolean) {
      mod.SetUIButtonEnabled(this._buttonUiWidget, enabled);
    }

    public setEnabled(enabled: boolean): Button {
      this.enabled = enabled;
      return this;
    }

    public set labelMessage(message: mod.Message) {
      this._label?.setMessage(message);
    }

    public setLabelMessage(message: mod.Message): Button {
      this.labelMessage = message;
      return this;
    }

    public set labelColor(color: mod.Vector) {
      this._label?.setTextColor(color);
    }

    public setLabelTextColor(color: mod.Vector): Button {
      this.labelColor = color;
      return this;
    }

    public set labelAlpha(alpha: number) {
      this._label?.setTextAlpha(alpha);
    }

    public setLabelTextAlpha(alpha: number): Button {
      this.labelAlpha = alpha;
      return this;
    }

    public override set size(params: Size) {
      mod.SetUIWidgetSize(
        this._uiWidget,
        mod.CreateVector(params.width, params.height, 0),
      );
      mod.SetUIWidgetSize(
        this._buttonUiWidget,
        mod.CreateVector(params.width, params.height, 0),
      );
      this._label?.setSize({ width: params.width, height: params.height });
    }

    public override setSize(params: Size): Button {
      this.size = params;
      return this;
    }
  }

  export async function handleButtonClick(
    player: mod.Player,
    widget: mod.UIWidget,
    event: mod.UIButtonEvent,
  ): Promise<void> {
    // NOTE: mod.UIButtonEvent is currently broken or undefined, so we're not using it for now.
    // if (event != mod.UIButtonEvent.ButtonUp) return;

    const ps = GetValidPlayerState(player);
    if (
      ps &&
      ps.ui.ballHitUI.hitConfirmButton &&
      mod.Equals(widget, ps.ui.ballHitUI.hitConfirmButton.buttonUiWidget)
    ) {
      if (!mod.Equals(event, mod.UIButtonEvent.ButtonDown)) return;
    }

    const widgetName = mod.GetUIWidgetName(widget);
    const pid = mod.GetObjId(player);

    const clickHandler = CLICK_HANDLERS.get(widgetName);
    if (!clickHandler) return;

    const runHandler = () => {
      clickHandler(player).catch((error) => {
        LogError(
          handleButtonClick.name,
          `Error in click handler for widget ${widgetName}, with error: ${error}`,
          1,
        );
      });
    };

    const disableOnClick = BUTTON_DISABLE_ON_CLICK.get(widgetName) ?? true;
    if (!disableOnClick) {
      runHandler();
      return;
    }

    const key = `${pid}_${widgetName}`;
    if (BUTTON_COOLDOWNS.has(key)) return;

    BUTTON_COOLDOWNS.add(key);
    runHandler();

    await mod.Wait(0.2);
    BUTTON_COOLDOWNS.delete(key);
  }

  export class Image extends Element {
    public constructor(params: ImageParams, receiver?: mod.Player | mod.Team) {
      const parent = parseNode(params.parent);
      const name = params.name ?? makeName(parent, receiver);

      const args: [
        string,
        mod.Vector,
        mod.Vector,
        mod.UIAnchor,
        mod.UIWidget,
        boolean,
        number,
        mod.Vector,
        number,
        mod.UIBgFill,
        mod.UIImageType,
        mod.Vector,
        number,
        mod.UIDepth,
      ] = [
        name,
        mod.CreateVector(params.x ?? 0, params.y ?? 0, 0),
        mod.CreateVector(params.width ?? 0, params.height ?? 0, 0),
        params.anchor ?? mod.UIAnchor.Center,
        parent.uiWidget,
        params.visible ?? true,
        params.padding ?? 0,
        params.bgColor ?? COLORS.WHITE,
        params.bgAlpha ?? 0,
        params.bgFill ?? mod.UIBgFill.None,
        params.imageType ?? mod.UIImageType.QuestionMark,
        params.imageColor ?? COLORS.WHITE,
        params.imageAlpha ?? 1,
        params.depth ?? mod.UIDepth.AboveGameUI,
      ];
      if (receiver == undefined) {
        mod.AddUIImage(...args);
      } else {
        mod.AddUIImage(...args, receiver);
      }

      const uiWidget = mod.FindUIWidgetWithName(name) as mod.UIWidget;

      super(uiWidget, Type.Image, name, parent);
    }

    public set imageType(imageType: mod.UIImageType) {
      mod.SetUIImageType(this._uiWidget, imageType);
    }

    public setImageType(imageType: mod.UIImageType): Image {
      this.imageType = imageType;
      return this;
    }

    public set imageColor(color: mod.Vector) {
      mod.SetUIImageColor(this._uiWidget, color);
    }

    public setImageColor(color: mod.Vector): Image {
      this.imageColor = color;
      return this;
    }

    public set imageAlpha(alpha: number) {
      mod.SetUIImageAlpha(this._uiWidget, alpha);
    }

    public setImageAlpha(alpha: number): Image {
      this.imageAlpha = alpha;
      return this;
    }
  }
}

//************************
// -/ WORLD ICON MANAGER
//************************

/**
 * Saved state for a WorldIcon to enable respawning with same properties
 */
interface WorldIconState {
  id: string;
  position: mod.Vector;
  text?: mod.Message;
  textEnabled: boolean;
  icon?: mod.WorldIconImages;
  iconEnabled: boolean;
  color?: mod.Vector;
  teamOwner?: mod.Team; // Team object for team scoping
  playerOwner?: mod.Player; // Player object for player scoping
}

class WIM {
  private static instance: WIM;
  private icons: Map<string, mod.WorldIcon> = new Map();
  private iconStates: Map<string, WorldIconState> = new Map();

  private constructor() {
    LogEvent(2, WIM.name, "Initialized.");
  }

  /**
   * Get the singleton instance
   */
  static setup(): WIM {
    if (!WIM.instance) {
      WIM.instance = new WIM();
    }
    return WIM.instance;
  }

  /**
   * Create and register a WorldIcon
   * @param id Unique identifier for this icon
   * @param position World position
   * @param options Optional configuration
   */
  createIcon(
    id: string,
    position: mod.Vector,
    options?: {
      text?: mod.Message;
      textEnabled?: boolean;
      icon?: mod.WorldIconImages;
      iconEnabled?: boolean;
      color?: mod.Vector;
      teamOwner?: mod.Team; // Team object for team scoping
      playerOwner?: mod.Player; // Player object for player scoping
    },
  ): mod.WorldIcon {
    // Delete existing icon if it exists
    if (this.icons.has(id)) {
      this.deleteIcon(id);
    }

    // Create the icon using the correct API
    const icon = mod.SpawnObject(
      mod.RuntimeSpawn_Common.WorldIcon,
      position,
      ZERO_VEC,
    ) as mod.WorldIcon;

    // Apply owner (team/player scope) if specified
    if (options?.teamOwner !== undefined) {
      mod.SetWorldIconOwner(icon, options.teamOwner);
    } else if (options?.playerOwner !== undefined) {
      mod.SetWorldIconOwner(icon, options.playerOwner);
    }

    // Apply text properties
    if (options?.text !== undefined) {
      mod.SetWorldIconText(icon, options.text);
    }
    const textEnabled = options?.textEnabled ?? false;
    mod.EnableWorldIconText(icon, textEnabled);

    // Apply icon properties
    if (options?.icon !== undefined) {
      mod.SetWorldIconImage(icon, options.icon);
    }
    const iconEnabled = options?.iconEnabled ?? false;
    mod.EnableWorldIconImage(icon, iconEnabled);

    // Apply color
    if (options?.color !== undefined) {
      mod.SetWorldIconColor(icon, options.color);
    }

    // Save state
    const state: WorldIconState = {
      id: id,
      position: position,
      text: options?.text,
      textEnabled: textEnabled,
      icon: options?.icon,
      iconEnabled: iconEnabled,
      color: options?.color,
      teamOwner: options?.teamOwner,
      playerOwner: options?.playerOwner,
    };

    this.icons.set(id, icon);
    this.iconStates.set(id, state);

    LogEvent(2, WIM.name, `Created icon (id: ${id}).`);

    return icon;
  }

  /**
   * Get a managed icon by ID
   */
  getIcon(id: string): mod.WorldIcon | undefined {
    return this.icons.get(id);
  }

  /**
   * Update icon position and save state
   */
  setPosition(id: string, position: mod.Vector): void {
    const icon = this.icons.get(id);
    const state = this.iconStates.get(id);

    if (icon && state) {
      mod.SetWorldIconPosition(icon, position);
      state.position = position;
    }
  }

  /**
   * Update icon text and save state
   */
  setText(id: string, text: mod.Message): void {
    const icon = this.icons.get(id);
    const state = this.iconStates.get(id);

    if (icon && state) {
      mod.SetWorldIconText(icon, text);
      state.text = text;
    }
  }

  /**
   * Update icon image and save state
   */
  setIcon(id: string, iconImage: mod.WorldIconImages): void {
    const icon = this.icons.get(id);
    const state = this.iconStates.get(id);

    if (icon && state) {
      mod.SetWorldIconImage(icon, iconImage);
      state.icon = iconImage;
    }
  }

  /**
   * Update icon color and save state
   */
  setColor(id: string, color: mod.Vector): void {
    const icon = this.icons.get(id);
    const state = this.iconStates.get(id);

    if (icon && state) {
      mod.SetWorldIconColor(icon, color);
      state.color = color;
    }
  }

  /**
   * Update icon text visibility and save state
   */
  setTextEnabled(id: string, enabled: boolean): void {
    const icon = this.icons.get(id);
    const state = this.iconStates.get(id);

    if (icon && state) {
      mod.EnableWorldIconText(icon, enabled);
      state.textEnabled = enabled;
    }
  }

  /**
   * Update icon image visibility and save state
   */
  setIconEnabled(id: string, enabled: boolean): void {
    const icon = this.icons.get(id);
    const state = this.iconStates.get(id);

    if (icon && state) {
      mod.EnableWorldIconImage(icon, enabled);
      state.iconEnabled = enabled;
    }
  }

  /**
   * Update both icon and text visibility together
   */
  setEnabled(id: string, iconEnabled: boolean, textEnabled: boolean): void {
    const icon = this.icons.get(id);
    const state = this.iconStates.get(id);

    if (icon && state) {
      mod.EnableWorldIconImage(icon, iconEnabled);
      mod.EnableWorldIconText(icon, textEnabled);
      state.iconEnabled = iconEnabled;
      state.textEnabled = textEnabled;
    }
  }

  /**
   * Update icon team owner and save state
   */
  setTeamOwner(id: string, team: mod.Team): void {
    const icon = this.icons.get(id);
    const state = this.iconStates.get(id);

    if (icon && state) {
      mod.SetWorldIconOwner(icon, team);
      state.teamOwner = team;
      state.playerOwner = undefined; // Clear player owner
    }
  }

  /**
   * Update icon player owner and save state
   */
  setPlayerOwner(id: string, player: mod.Player): void {
    const icon = this.icons.get(id);
    const state = this.iconStates.get(id);

    if (icon && state) {
      mod.SetWorldIconOwner(icon, player);
      state.playerOwner = player;
      state.teamOwner = undefined; // Clear team owner
    }
  }

  /**
   * Delete a specific icon
   */
  deleteIcon(id: string): void {
    const icon = this.icons.get(id);
    if (icon) {
      mod.UnspawnObject(icon);
      this.icons.delete(id);
      this.iconStates.delete(id);

      LogEvent(2, WIM.name, `Deleted icon (id: ${id}).`);
    }
  }

  /**
   * Refresh a specific icon (disable and re-enable with saved state)
   * Called automatically on player join
   * Uses enable/disable approach similar to VFX system instead of unspawn/respawn
   */
  private refreshIcon(id: string): void {
    const state = this.iconStates.get(id);
    const icon = this.icons.get(id);

    if (!state || !icon) {
      LogError(
        WIM.name,
        `Unable to refresh icon '${id}' - state=${!!state}, icon=${!!icon}.`,
        2,
      );
      return;
    }

    // Step 1: Disable both icon and text
    mod.EnableWorldIconImage(icon, false);
    mod.EnableWorldIconText(icon, false);

    // Step 2: Reapply owner (team/player scope) if set
    if (state.teamOwner !== undefined) {
      mod.SetWorldIconOwner(icon, state.teamOwner);
    } else if (state.playerOwner !== undefined) {
      mod.SetWorldIconOwner(icon, state.playerOwner);
    }

    // Step 3: Reapply position
    mod.SetWorldIconPosition(icon, state.position);

    // Step 4: Reapply text properties
    if (state.text !== undefined) {
      mod.SetWorldIconText(icon, state.text);
    }

    // Step 5: Reapply icon properties
    if (state.icon !== undefined) {
      mod.SetWorldIconImage(icon, state.icon);
    }

    // Step 6: Reapply color
    if (state.color !== undefined) {
      mod.SetWorldIconColor(icon, state.color);
    }

    // Step 7: Re-enable with saved state
    mod.EnableWorldIconText(icon, state.textEnabled);
    mod.EnableWorldIconImage(icon, state.iconEnabled);

    LogEvent(2, WIM.name, `Refreshed icon '${id}' (disable/enable approach).`);
  }

  /**
   * Refresh all managed icons
   * Called when a player joins to fix visibility bugs
   */
  refreshAllIcons(): void {
    LogEvent(2, WIM.name, `Refreshing all icons (${this.iconStates.size}).`);
    for (const id of this.iconStates.keys()) {
      this.refreshIcon(id);
    }
  }

  /**
   * Delete all managed icons
   */
  deleteAllIcons(): void {
    for (const icon of this.icons.values()) {
      mod.UnspawnObject(icon);
    }
    this.icons.clear();
    this.iconStates.clear();

    LogEvent(2, WIM.name, `Deleted all icons.`);
  }

  /**
   * Get count of managed icons
   */
  getIconCount(): number {
    return this.icons.size;
  }

  /**
   * Check if an icon exists
   */
  hasIcon(id: string): boolean {
    return this.icons.has(id);
  }
}

//************************
// -/ GENERAL HELPERS
//************************

function LogError(caller: string, message: string, errorNumber: number) {
  let callerTrace = "at <unknown>";

  const stack = new Error().stack;
  if (stack) {
    const lines = stack.split("\n");

    callerTrace = lines[2]?.trim() ?? lines[3]?.trim() ?? callerTrace;
  }

  const tagS =
    "\n************************* ERROR START *************************\n";
  const tagE =
    "\n************************** ERROR END **************************";

  console.log(
    tagS + `ERROR <${caller}> ${message} | Called ${callerTrace}` + tagE,
  );

  for (let i = 0; i < 10; i++) {
    mod.DisplayHighlightedWorldLogMessage(
      mod.Message("ERROR_OCCURED", errorNumber),
    );
    mod.Wait(0.5);
  }
}

function LogEvent(
  debugLevel: number,
  caller: string,
  message: string,
  originators?: {
    main: LogOType;
    player?: mod.Player;
    pid?: number;
    group?: CourseGroup;
    gid?: number;
  },
  priorityEvent: boolean = false,
) {
  if (DEBUG_MODE_LEVEL < debugLevel) return;

  const o = originators ?? ({} as NonNullable<typeof originators>);
  const pid =
    o.pid ??
    (o.player && mod.IsPlayerValid(o.player)
      ? mod.GetObjId(o.player)
      : undefined);
  const gid = o.gid ?? o.group?.groupId;

  const p = pid !== undefined ? `Player ${pid}` : "";
  const g = gid !== undefined ? `Group ${gid}` : "";

  const priorityTag = "**************************************************";

  const tag = (o.main === LogOType.Group ? [g, p] : [p, g])
    .filter(Boolean)
    .join(": ");

  console.log(
    (priorityEvent ? `\n` + priorityTag + `\n` : "") +
      `EVENT - ${tag ? tag + ": " : ""}<${caller}> ${message}` +
      (priorityEvent ? priorityTag : "") +
      (priorityEvent ? `\n` + priorityTag : ""),
  );
}

function GetCourseTotalHoles(): number {
  return Object.keys(CourseData).length;
}

function GetParsPerHole(): number[] {
  const pars: number[] = [];

  for (let h = 1; h <= GetCourseTotalHoles(); h++) {
    const hole = GetHoleData(h);
    if (!hole) continue;
    pars.push(hole.par);
  }

  return pars;
}

function GetTotalCoursePar(): number {
  let totalPar = 0;
  for (const holeData of Object.values(CourseData)) {
    totalPar += holeData.par;
  }
  LogEvent(
    1,
    GetTotalCoursePar.name,
    `Total course par set to ${totalPar} for ${GetCourseTotalHoles()} holes.`,
  );
  return totalPar;
}
function GetHoleData(holeId: number): HoleData {
  const holeData = CourseData[holeId];

  if (holeData == null) {
    LogError(GetHoleData.name, `Hole data not found for hole ID ${holeId}`, 3);
  }

  return holeData;
}

function GetTeamIdFromPlayer(player: mod.Player): number {
  return mod.GetObjId(mod.GetTeam(player));
}

async function PlaySFX(
  sfx: mod.RuntimeSpawn_Common,
  pos: mod.Vector,
  receiver: mod.Player | mod.Team | undefined = undefined,
  params?: {
    is3D?: boolean;
    isContinuousLoop?: boolean;
    duration?: number;
    amplitude?: number;
    range?: number;
    delay?: number;
  },
): Promise<mod.SFX> {
  const {
    is3D = false,
    isContinuousLoop = false,
    duration = 5,
    amplitude = 1,
    range = 100,
    delay = 0,
  } = params ?? {};

  const spawnedSFX: mod.SFX = mod.SpawnObject(sfx, pos, ZERO_VEC);
  await mod.Wait(0.1 + delay);

  if (is3D) {
    if (receiver !== undefined) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      mod.PlaySound(spawnedSFX, amplitude, pos, range, receiver);
    } else {
      mod.PlaySound(spawnedSFX, amplitude, pos, range);
    }
  } else {
    if (receiver !== undefined) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      mod.PlaySound(spawnedSFX, amplitude, receiver);
    } else {
      mod.PlaySound(spawnedSFX, amplitude);
    }
  }

  if (DEBUG_MODE_LEVEL >= 2) {
    const consoleVary = isContinuousLoop
      ? ` in loop.`
      : `for ${duration} seconds.`;
    LogEvent(
      2,
      PlaySFX.name,
      `Playing SFX (id: ${mod.GetObjId(spawnedSFX)})` +
        consoleVary +
        ` is3D: ${is3D}, amplitude: ${amplitude}, range: ${range}, receiver type: ${receiver}.`,
    );
  }

  if (!isContinuousLoop) {
    await mod.Wait(duration);
    LogEvent(
      2,
      PlaySFX.name,
      `Unspawning SFX (id: ${mod.GetObjId(spawnedSFX)}).`,
    );
    mod.UnspawnObject(spawnedSFX);
  }

  return spawnedSFX;
}

async function PlayVO(
  voEvent: mod.VoiceOverEvents2D,
  receiver?: { player?: mod.Player; group?: CourseGroup },
) {
  let vo: mod.VO | null;
  const players: mod.Player[] = [];

  if (receiver?.player != null) {
    players.push(receiver.player);
  } else if (receiver?.group != null) {
    for (const p of receiver.group.players) {
      players.push(p.player);
    }
  }

  for (const p of players) {
    const ps = GetValidPlayerState(p);
    if (ps && ps.sound.VO) {
      vo = ps.sound.VO;
      mod.PlayVO(vo, voEvent, mod.VoiceOverFlags.Alpha, p);
      LogEvent(
        2,
        PlayVO.name,
        `Playing VO event ${voEvent} for Player ${mod.GetObjId(p)}.`,
      );
    }
  }
}

async function PlayVFX(
  vfx: mod.RuntimeSpawn_Common,
  pos: mod.Vector,
  enabled: boolean = true,
  isContinuous: boolean = false,
  duration: number = 10,
  rotation?: mod.Vector,
): Promise<mod.VFX> {
  const spawnedVFX: mod.VFX = mod.SpawnObject(vfx, pos, rotation ?? ZERO_VEC);
  await mod.Wait(0.1);

  mod.EnableVFX(spawnedVFX, enabled);

  if (!isContinuous) {
    // Fire-and-forget
    (async () => {
      await mod.Wait(duration);
      mod.EnableVFX(spawnedVFX, false);
      await mod.Wait(2);
      mod.UnspawnObject(spawnedVFX);
    })();
  }

  return spawnedVFX;
}

function v3(x: number, y: number, z: number): V3 {
  return { x: x, y: y, z: z };
}

function v3Add(a: V3, b: V3): V3 {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

function v3Sub(a: V3, b: V3): V3 {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

function v3Scale(a: V3, s: number): V3 {
  return { x: a.x * s, y: a.y * s, z: a.z * s };
}

function v3Length(a: V3): number {
  return Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
}

function v3Normalize(a: V3): V3 {
  const len = v3Length(a);
  if (len <= 0) {
    return v3(0, 0, 0);
  }
  return v3(a.x / len, a.y / len, a.z / len);
}

function vectorToV3(v: mod.Vector): V3 {
  return {
    x: mod.XComponentOf(v),
    y: mod.YComponentOf(v),
    z: mod.ZComponentOf(v),
  };
}

function v3ToVector(v: V3): mod.Vector {
  return mod.CreateVector(v.x, v.y, v.z);
}

function PointInPolygon(poly: XZ[], pos: XZ): boolean {
  let inside = false;
  const n = poly.length;

  for (let i = 0, j = n - 1; i < n; j = i++) {
    const xi = poly[i].x,
      zi = poly[i].z;
    const xj = poly[j].x,
      zj = poly[j].z;

    const intersect =
      zi > pos.z !== zj > pos.z &&
      pos.x < ((xj - xi) * (pos.z - zi)) / (zj - zi + 1e-9) + xi;

    if (intersect) inside = !inside;
  }

  return inside;
}

function PointInGrid(
  grid: {
    minX: number;
    minZ: number;
    step: number;
    h: (number | null)[][];
  },
  pos: XZ,
): boolean {
  const ix = Math.floor((pos.x - grid.minX) / grid.step);
  const iz = Math.floor((pos.z - grid.minZ) / grid.step);

  if (ix < 0 || iz < 0 || ix >= grid.h.length || iz >= grid.h[0].length) {
    return false;
  }

  return grid.h[ix][iz] !== null;
}

function DetectSurfaceType(holeNumber: number, pos: XZ): SurfaceType {
  function GetSurfacesByPriority(): SurfaceType[] {
    const allSurfaces = Object.keys(Surfaces)
      .map((k) => Number(k) as SurfaceType)
      .sort((a, b) => Surfaces[a].priority - Surfaces[b].priority);

    return allSurfaces.filter((s) => s !== SurfaceType.Rough);
  }

  const holeData = GetHoleData(holeNumber);
  if (!holeData) return SurfaceType.Rough;

  const priority = GetSurfacesByPriority();

  for (const surfaceType of priority) {
    const surf = holeData.surfaces[surfaceType];
    if (!surf) continue;

    // -----------------------------
    // Sand: array of surfaces
    // -----------------------------
    if (surfaceType === SurfaceType.Sand && Array.isArray(surf)) {
      for (const bunker of surf) {
        if (
          bunker.hull &&
          bunker.bbox &&
          pos.x >= bunker.bbox.minX &&
          pos.x <= bunker.bbox.maxX &&
          pos.z >= bunker.bbox.minZ &&
          pos.z <= bunker.bbox.maxZ &&
          PointInPolygon(bunker.hull, pos)
        ) {
          return SurfaceType.Sand;
        }
      }
      continue;
    }

    if (surfaceType === SurfaceType.Fairway && Array.isArray(surf)) {
      for (const fairway of surf) {
        if (
          fairway.hull &&
          fairway.bbox &&
          pos.x >= fairway.bbox.minX &&
          pos.x <= fairway.bbox.maxX &&
          pos.z >= fairway.bbox.minZ &&
          pos.z <= fairway.bbox.maxZ &&
          PointInPolygon(fairway.hull, pos)
        ) {
          return SurfaceType.Fairway;
        }
      }
      continue;
    }

    // -----------------------------
    // Single surface
    // -----------------------------
    if (!Array.isArray(surf) && surf.hull && surf.bbox) {
      if (
        pos.x < surf.bbox.minX ||
        pos.x > surf.bbox.maxX ||
        pos.z < surf.bbox.minZ ||
        pos.z > surf.bbox.maxZ
      ) {
        continue;
      }

      if (PointInPolygon(surf.hull, pos)) return surfaceType;
      continue;
    }

    // -----------------------------
    // Grid surfaces (if any)
    // -----------------------------
    if (!Array.isArray(surf) && surf.grid && PointInGrid(surf.grid, pos)) {
      return surfaceType;
    }
  }

  return SurfaceType.Rough;
}

function SampleTerrainHeight_Plane(
  grid: HeightGrid,
  x: number,
  z: number,
): number | null {
  const { minX, minZ, step, h } = grid;

  const fx = (x - minX) / step;
  const fz = (z - minZ) / step;

  const ix = Math.floor(fx);
  const iz = Math.floor(fz);

  const tx = fx - ix;
  const tz = fz - iz;

  // Ensure we have a 4x4 neighborhood
  const xmin = ix - 1;
  const zmin = iz - 1;

  const xmax = ix + 2;
  const zmax = iz + 2;

  if (xmin < 0 || zmin < 0 || xmax >= h.length || zmax >= h[0].length) {
    return null;
  }

  // Bicubic using Catmull-Rom basis
  function catmullRom(
    p0: number,
    p1: number,
    p2: number,
    p3: number,
    t: number,
  ): number {
    const a0 = -0.5 * p0 + 1.5 * p1 - 1.5 * p2 + 0.5 * p3;
    const a1 = p0 - 2.5 * p1 + 2 * p2 - 0.5 * p3;
    const a2 = -0.5 * p0 + 0.5 * p2;
    const a3 = p1;
    return ((a0 * t + a1) * t + a2) * t + a3;
  }

  // Interpolate 4 rows
  const row = new Array(4);
  for (let dz = 0; dz < 4; dz++) {
    const zIndex = zmin + dz;
    const p0 = h[xmin][zIndex];
    const p1 = h[xmin + 1][zIndex];
    const p2 = h[xmin + 2][zIndex];
    const p3 = h[xmin + 3][zIndex];
    if (p0 == null || p1 == null || p2 == null || p3 == null) return null;

    row[dz] = catmullRom(p0, p1, p2, p3, tx);
  }

  // Interpolate vertically through the 4 row results
  return catmullRom(row[0], row[1], row[2], row[3], tz);
}

function SampleTerrainSlope_Plane(
  grid: HeightGrid,
  x: number,
  z: number,
): TerrainSample | null {
  const eps = 0.2; // very small, preserves smoothness

  const h0 = SampleTerrainHeight_Plane(grid, x, z);
  if (h0 == null) return null;

  const hL = SampleTerrainHeight_Plane(grid, x - eps, z);
  const hR = SampleTerrainHeight_Plane(grid, x + eps, z);
  const hB = SampleTerrainHeight_Plane(grid, x, z - eps);
  const hF = SampleTerrainHeight_Plane(grid, x, z + eps);

  if (hL == null || hR == null || hB == null || hF == null) return null;

  const slopeX = (hR - hL) / (2 * eps);
  const slopeZ = (hF - hB) / (2 * eps);

  return { slopeX, slopeZ, h: h0 };
}

function TerrainNormal(slopeX: number, slopeZ: number): V3 {
  return v3Normalize(v3(-slopeX, 1, -slopeZ));
}

function ReflectVelocity(v: V3, n: V3): V3 {
  const dot = v.x * n.x + v.y * n.y + v.z * n.z;
  return v3(v.x - 2 * dot * n.x, v.y - 2 * dot * n.y, v.z - 2 * dot * n.z);
}

function ComputeDownhillFromSlope(slopeX: number, slopeZ: number): V3 {
  return v3Normalize(v3(-slopeX, 0, -slopeZ));
}

function DistanceBetween(
  vA: mod.Vector,
  vB: mod.Vector,
  distanceType: DistanceType,
  unit: DistanceUnit,
  NumberOfDecimals: number,
): { whole: number; fraction: number; wholeWithDecimals: number } {
  const dx = mod.XComponentOf(vA) - mod.XComponentOf(vB);
  const dy = mod.YComponentOf(vA) - mod.YComponentOf(vB);
  const dz = mod.ZComponentOf(vA) - mod.ZComponentOf(vB);

  let dist: number;

  if (distanceType === DistanceType.XYZ) {
    dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
  } else {
    dist = Math.sqrt(dx * dx + dz * dz);
  }

  if (unit === DistanceUnit.Yards) {
    dist *= 1.09361; // meters to yards
  }

  const factor = 10 ** NumberOfDecimals;

  const scaled = Math.round(dist * factor);

  return {
    whole: Math.floor(scaled / factor),
    fraction: scaled % factor,
    wholeWithDecimals: dist,
  };
}

function PointBetweenTwoPoints(pt1: V3, pt2: V3): V3 {
  const result: V3 = {
    x: (pt1.x + pt2.x) * 0.5,
    y: (pt1.y + pt2.y) * 0.5,
    z: (pt1.z + pt2.z) * 0.5,
  };

  return result;
}

function GetTerrainHeight(holeNumber: number, pos: V3): number | null {
  const heightMap = CourseData[holeNumber].heightMap;
  if (!heightMap.grid) return null;

  // Based on smooth continuous plane-fit height everywhere
  return SampleTerrainHeight_Plane(heightMap.grid, pos.x, pos.z);
}

function GetNearestTerrainHeight(holeNumber: number, pos: V3): number | null {
  const heightMap = CourseData[holeNumber].heightMap;
  if (!heightMap.grid) return null;

  const grid = heightMap.grid;
  const { minX, minZ, step, h } = grid;
  const maxX = h.length - 1;
  const maxZ = h[0].length - 1;

  const fx = (pos.x - minX) / step;
  const fz = (pos.z - minZ) / step;

  const ix = Math.round(fx);
  const iz = Math.round(fz);

  const cx = Math.max(0, Math.min(maxX, ix));
  const cz = Math.max(0, Math.min(maxZ, iz));

  const center = h[cx][cz];
  if (center != null) return center;

  let bestHeight: number | null = null;
  let bestDistSq = Number.POSITIVE_INFINITY;

  // Fallback: closest valid sample in grid space
  for (let x = 0; x <= maxX; x++) {
    for (let z = 0; z <= maxZ; z++) {
      const sample = h[x][z];
      if (sample == null) continue;

      const dx = x - fx;
      const dz = z - fz;
      const distSq = dx * dx + dz * dz;

      if (distSq < bestDistSq) {
        bestDistSq = distSq;
        bestHeight = sample;
      }
    }
  }

  return bestHeight;
}

function RotationFromVelocity(vel: V3): mod.Vector {
  const forward = v3Normalize(v3(-vel.x, -vel.y, -vel.z));
  // negative so it points "up" opposite ball direction

  const yaw = (Math.atan2(forward.x, forward.z) * 180) / Math.PI;
  const pitch =
    (Math.atan2(
      forward.y,
      Math.sqrt(forward.x * forward.x + forward.z * forward.z),
    ) *
      180) /
    Math.PI;

  return mod.CreateVector(pitch, yaw, 0);
}

function YawTowards(from: mod.Vector, to: mod.Vector): number {
  const dx = mod.XComponentOf(to) - mod.XComponentOf(from);
  const dz = mod.ZComponentOf(to) - mod.ZComponentOf(from);

  return Math.atan2(dx, dz); // radians
}

//************************
// -/ PLAYER
//************************

function CreatePlayerState(player: mod.Player) {
  const pid = mod.GetObjId(player);
  SetPlayerDefaultStates(player);
  LogEvent(1, CreatePlayerState.name, `Created player state.`, {
    pid,
    main: LogOType.Player,
  });
}

function DeletePlayerState(pid: number) {
  delete players[pid];
  LogEvent(1, DeletePlayerState.name, `Deleted player state.`, {
    pid,
    main: LogOType.Player,
  });
}

function SetPlayerDefaultStates(player: mod.Player) {
  const pid = mod.GetObjId(player);

  let ui: PlayerUI;
  let sound: PlayerSound;
  let playerRef: PlayerRef;
  let coursesCompleted: number;
  let hitToken: number;
  let wins: number;

  const inventoryModifiers = { ...DEFAULT_HIT_MODIFIERS_INVENTORY };

  let selectedLanguage: "en" | "cn" = "en";
  let languageSuffix: "" | "_C" = "";

  if (players[pid]) {
    const ps = GetValidPlayerState(player);
    if (ps == null) return {} as PlayerState;

    ui = ps.ui;
    sound = ps.sound;
    playerRef = ps.general.playerRef;
    coursesCompleted = ps.general.coursesCompleted;
    hitToken = ps.swing.hitToken;
    wins = ps.course.wins;

    selectedLanguage = ps.general.selectedLanguage;
    languageSuffix = ps.general.languageSuffix;

    LogEvent(
      1,
      SetPlayerDefaultStates.name,
      `Player state updated to Lobby configuration.`,
      {
        pid,
        main: LogOType.Player,
      },
    );
  } else {
    ui = {
      firstLayerUI: {},
      firstSpawnUI: {},
      ballHitUI: {},
      matchmakingUI: {
        opened: false,
      },
      groupPlayersUI: {},
      transitionUI: {},
      surfaceUI: {},
      swingUI: {},
      powerUI: {},
      notificationUI: {
        cancelRequested: false,
        turnTimerActive: false,
      },
      gamemodeInfoUI: {},
    };
    sound = {
      VO: null,
    };
    playerRef = { object: player, id: mod.GetObjId(player) };
    coursesCompleted = 0;
    wins = 0;
    hitToken = 0;
  }

  players[pid] = {
    ui: ui,

    sound: sound,

    general: {
      playerRef: playerRef,
      coursesCompleted: coursesCompleted,
      phase: "IDLE",
      currentClub: ClubList[0],
      inventoryModifiers: inventoryModifiers,
      activeModifiers: {
        powerHit: false,
        superFocus: false,
        backSpin: false,
        //forwardSpin: false,
      },
      isJumping: false,
      isProne: false,
      isReady: false,
      selectedLanguage: selectedLanguage,
      languageSuffix: languageSuffix,
    },

    course: {
      currentShot: 0,
      onFirstShot: true,
      failedInteractAttempts: 0,
      strokesPerHole: [],
      holesCompleted: [],
      wins: wins,
    },

    swing: {
      hitToken: hitToken,
      phase: "IDLE",
      pos: SWING_MID_LINE_X,
      running: false,
      locked: false,
      leftLockedPos: 0,
      rightLockedPos: 0,
      lastSwingQuality: 0,
      swingSpeed: 1,
      predictionPosition: ZERO_VEC,
      predictionVisible: false,
    },

    ball: {
      token: 0,
      phase: "IDLE",
      isInHole: false,
      isOutOfBounds: false,
      currentSurface: SurfaceType.TeeBox,
      lastShotDistance: 0,
    },
  };
}

function GetValidPlayerState(player: mod.Player): PlayerState | null {
  if (!mod.IsPlayerValid(player)) {
    LogError(GetValidPlayerState.name, "Invalid player object provided", 4);
    return null;
  }

  const pid = mod.GetObjId(player);

  return players[pid] ?? null;
}

function SetPlayerGeneralPhase(pid: number, phase: GeneralState["phase"]) {
  players[pid].general.phase = phase;
  LogEvent(1, SetPlayerGeneralPhase.name, `General phase set to ${phase}.`, {
    pid,
    main: LogOType.Player,
  });
}

function GetPlayerGeneralPhase(pid: number): GeneralState["phase"] {
  return players[pid].general.phase;
}

function SpawnPlayerVoiceOverObject(player: mod.Player) {
  const ps = GetValidPlayerState(player);
  if (!ps) return;

  if (ps.sound.VO) {
    UnspawnPlayerVoiceoverObject(mod.GetObjId(player));
  }

  ps.sound.VO = mod.SpawnObject(rtc.SFX_VOModule_OneShot2D, ZERO_VEC, ZERO_VEC);
}

function UnspawnPlayerVoiceoverObject(pid: number) {
  const ps = players[pid];
  if (ps.sound.VO) {
    mod.UnspawnObject(ps.sound.VO);
    ps.sound.VO = null;
  }
}

function UpdatePlayerHoleStrokes(
  pid: number,
  holeNumber: number,
  updateType: ScoreUpdateType,
): void {
  const ps = players[pid];
  if (!ps) return;

  const holeIndex = holeNumber - 1;

  if (ps.course.holesCompleted[holeIndex] === true) {
    LogError(
      UpdatePlayerHoleStrokes.name,
      `Unable to update score for Player ${pid}. Hole ${holeNumber} already completed.`,
      5,
    );
    return;
  }

  const strokes = ps.course.currentShot;
  ps.course.strokesPerHole[holeIndex] = strokes;
  ps.course.holesCompleted[holeIndex] =
    updateType === ScoreUpdateType.HoleComplete;
  LogEvent(
    1,
    UpdatePlayerHoleStrokes.name,
    `Hole ${holeNumber} strokes updated to ${strokes}.`,
    {
      pid,
      main: LogOType.Player,
    },
  );
}

function GetPlayerStrokesForHole(pid: number, holeNumber: number): number {
  const holeIndex = holeNumber - 1;
  let strokes = players[pid].course.strokesPerHole[holeIndex];
  if (strokes == null) {
    LogError(
      GetPlayerStrokesForHole.name,
      `No strokes recorded for Hole ${holeNumber} for Player ${pid}.`,
      6,
    );
    return 0;
  }
  return strokes;
}

function GetPlayerTotalCourseStrokes(
  pid: number,
  scoreType: ScoreUpdateType,
): number {
  const course = players[pid].course;
  let total = 0;

  for (let i = 0; i < course.strokesPerHole.length; i++) {
    if (scoreType === ScoreUpdateType.HoleComplete && !course.holesCompleted[i])
      continue;
    total += course.strokesPerHole[i];
  }

  return total;
}

function GetPlayerCourseRelativeScore(pid: number): number {
  const course = players[pid].course;
  let totalPar = 0;
  let totalStrokes = 0;
  for (let i = 0; i < course.strokesPerHole.length; i++) {
    if (!course.holesCompleted[i]) continue;
    const holeData = GetHoleData(i + 1);
    if (!holeData) continue;
    totalPar += holeData.par;
    totalStrokes += course.strokesPerHole[i];
  }
  return totalStrokes - totalPar;
}

function AddPlayerWin(player: mod.Player) {
  const ps = GetValidPlayerState(player);
  if (!ps) return;

  ps.course.wins += 1;

  LogEvent(1, AddPlayerWin.name, `One win added for Player.`, {
    player,
    main: LogOType.Player,
  });
}

function GetPlayerWins(player: mod.Player): number {
  const ps = GetValidPlayerState(player);
  if (!ps) return 0;

  return ps.course.wins;
}

function SetPlayerCurrentShot(pid: number, shot: number) {
  players[pid].course.currentShot = shot;
  LogEvent(1, SetPlayerCurrentShot.name, `Current shot set to ${shot}.`, {
    pid,
    main: LogOType.Player,
  });
}

function GetPlayerCurrentShot(pid: number): number {
  return players[pid].course.currentShot;
}

function SetPlayerIsReady(pid: number, isReady: boolean) {
  players[pid].general.isReady = isReady;
  LogEvent(1, SetPlayerIsReady.name, `Ready set to ${isReady}.`, {
    pid,
    main: LogOType.Player,
  });
}

function GetPlayerIsReady(pid: number): boolean {
  return players[pid].general.isReady;
}

function GetPlayerIsAlive(player: mod.Player): boolean {
  const r = mod.GetSoldierState(player, mod.SoldierStateBool.IsAlive);

  LogEvent(2, GetPlayerIsAlive.name, `Player is alive: ${r}.`, {
    player,
    main: LogOType.Player,
  });

  return r;
}

function GetPlayerPos(player: mod.Player): mod.Vector {
  return mod.GetSoldierState(player, mod.SoldierStateVector.GetPosition);
}

function GetVehiclePos(vehicle: mod.Vehicle): mod.Vector {
  return mod.GetVehicleState(vehicle, mod.VehicleStateVector.VehiclePosition);
}

function GetPlayerIsDeployed(player: mod.Player): boolean {
  return (
    GetPlayerIsAlive(player) && !mod.Equals(GetPlayerPos(player), ZERO_VEC)
  );
}

function GetPlayerFacingDir(player: mod.Player): mod.Vector {
  return mod.GetSoldierState(player, mod.SoldierStateVector.GetFacingDirection);
}

function SetPlayerCurrentClub(pid: number, club: Club) {
  players[pid].general.currentClub = club;
  LogEvent(1, SetPlayerCurrentClub.name, `Current club set to ${club.key}.`, {
    pid,
    main: LogOType.Player,
  });
}

function GetPlayerCurrentClub(player: mod.Player): Club {
  const ps = GetValidPlayerState(player);
  if (!ps) return ClubList[0];
  return ps.general.currentClub;
}

function GetPlayerAuthorizedClubs(player: mod.Player): Club[] {
  const ps = GetValidPlayerState(player);
  if (!ps) return [];

  const playerGroup = GetGroupFromPlayer(player);
  if (!playerGroup) return [];

  const holeData = GetHoleData(playerGroup.currentHole);
  if (!holeData) return [];

  const currentBallSurface = GetPlayerBallSurfaceType(player);
  let availableClubs: Club[];

  switch (currentBallSurface) {
    case SurfaceType.TeeBox:
      availableClubs = ClubList.filter((club) =>
        holeData.teeBoxClubs.includes(club.type),
      ).map((club) => club);
      break;
    case SurfaceType.Green:
      availableClubs = ClubList.filter((club) => club.type === ClubType.PT).map(
        (club) => club,
      );
      break;
    case SurfaceType.Fringe:
      availableClubs = ClubList.filter(
        (club) => club.type === ClubType.SW || club.type === ClubType.PW,
      ).map((club) => club);
      break;
    default:
      availableClubs = ClubList.filter(
        (club) =>
          club.type !== ClubType.DR1 &&
          club.type !== ClubType.DR3 &&
          club.type !== ClubType.PT,
      ).map((club) => club);
      break;
  }

  return availableClubs;
}

function SetPlayerBallSurfaceType(
  player: mod.Player,
  surfaceType: SurfaceType,
) {
  const ps = GetValidPlayerState(player);
  if (!ps) return;
  ps.ball.currentSurface = surfaceType;
  LogEvent(
    1,
    SetPlayerBallSurfaceType.name,
    `Ball surface type set to ${Surfaces[surfaceType].key}.`,
    { player, main: LogOType.Player },
  );
}

function GetPlayerBallSurfaceType(player: mod.Player): SurfaceType {
  const ps = GetValidPlayerState(player);
  if (!ps) return SurfaceType.TeeBox;

  return ps.ball.currentSurface;
}

function ApplySurfaceAccuracyPenalty(
  player: mod.Player,
  horizSpin: number,
): number {
  const ps = GetValidPlayerState(player);
  if (!ps) return horizSpin;

  const surface = GetPlayerBallSurfaceType(player);
  const accuracyPenalty = Surfaces[surface].accuracyPenalty;

  let modifiedHorizSpin = horizSpin;

  if (accuracyPenalty > 0) {
    const rand = mod.RandomReal(-accuracyPenalty, accuracyPenalty);
    modifiedHorizSpin = horizSpin * (1 + rand);
    LogEvent(
      1,
      ApplySurfaceAccuracyPenalty.name,
      `Accuracy penalty applied (${accuracyPenalty}), Original horizSpin: ${horizSpin}, Modified horizSpin: ${modifiedHorizSpin}.`,
      { player, main: LogOType.Player },
    );
  }

  return modifiedHorizSpin;
}

function SetPlayerPowerFactor(pid: number, powerFactor: number) {
  players[pid].swing.selectedPowerFactor = powerFactor;
  LogEvent(
    1,
    SetPlayerPowerFactor.name,
    `Power factor set to ${powerFactor}.`,
    {
      pid,
      main: LogOType.Player,
    },
  );
}

function GetPlayerPowerFactor(pid: number): number {
  return players[pid].swing.selectedPowerFactor ?? 1;
}

function AddPlayerHitModifier(
  pid: number,
  modifier: HitModifierKey,
  numberToAdd: number,
) {
  const inv = players[pid].general.inventoryModifiers[modifier];

  if (typeof inv === "number") {
    players[pid].general.inventoryModifiers[modifier] = inv + numberToAdd;
  }
}

function DeleteAllUIForPid(pid: number) {
  DeleteFirstLayerUI(pid);
  DeleteGamemodeInfoUI(pid);
  DeleteFirstSpawnUI(pid);
  DeleteBallHitUI(pid);
  DeleteSurfaceUI(pid);
  DeleteMatchmakingUI({ id: pid });
  DeleteGroupPlayersUI(pid);
  DeleteTeleportTransitionScreen(pid);
  DeleteSwingUI(pid);
  DeletePowerUI(pid);
  DeleteNotificationUI({ type: "player", id: pid });

  LogEvent(1, DeleteAllUIForPid.name, `Deleted all UI for player.`, {
    pid,
    main: LogOType.Player,
  });
}

//////////////////////////////////////////////////

/*FOR DEBUG PURPOSES WHEN CREATING A NEW HOLE
async function LogPlayerSurfaceEverySecond(
  player: mod.Player,
  holeNumber: number,
): Promise<void> {
  while (mod.IsPlayerValid(player)) {
    await mod.Wait(1.0);

    const pos = GetPlayerPos(player);

    const surface = DetectSurfaceType(holeNumber, {
      x: mod.XComponentOf(pos),
      z: mod.ZComponentOf(pos),
    });

    LogEvent(
      1,
      LogPlayerSurfaceEverySecond.name,
      `Player standing on surface: ${surface}`,
      { player, main: LogOType.Player },
    );
  }
}*/

async function AssignPlayerToLobby(
  player: mod.Player,
  initialAssign: boolean = false,
  redeploy: boolean = true,
) {
  const pid = mod.GetObjId(player);

  const ps = GetValidPlayerState(player);
  if (!ps) return;

  ps.ball.token++;

  if (initialAssign) {
    InitFirstSpawnUI(player);
  }

  {
    // Affected by change in language
    if (!ps.ui.firstLayerUI.bottomBar) InitFirstLayerUI(player);

    if (!ps.ui.gamemodeInfoUI.root) InitGamemodeInfoUI(player);

    if (!ps.ui.swingUI.root) InitSwingUI(player);

    if (!ps.ui.transitionUI.root) InitTeleportTransitionScreen(player);
  }

  if (!ps.ui.surfaceUI.root) InitSurfaceUI(player);

  const playerCurrentTeamId = GetTeamIdFromPlayer(player);

  if (playerCurrentTeamId !== LOBBY_TEAM_ID) {
    LogEvent(
      1,
      AssignPlayerToLobby.name,
      `Player assigned to Lobby and Team ${LOBBY_TEAM_ID}. Redeploying: ${redeploy}.`,
      { player, main: LogOType.Player },
    );

    mod.SetTeam(player, mod.GetTeam(LOBBY_TEAM_ID));
    if (redeploy) mod.UndeployPlayer(player);
    await mod.Wait(0.1);
  } else {
    LogEvent(
      1,
      AssignPlayerToLobby.name,
      `Player assigned to Lobby. Player already in Team ${LOBBY_TEAM_ID}.`,
      { player, main: LogOType.Player },
    );
  }

  UnspawnPlayerBall(pid);
  DeletePredictedWorldIcon(pid);
  DeletePredictedFx(pid);
  DeleteCarryWorldIcon(pid);
  UnspawnHolePanelWIForPlayer(pid);

  SetPostSwingState(player);

  SetPlayerDefaultStates(player);

  UpdateGameScoreboardForPlayer(player);

  InitClubHouseWorldIcons();

  SetPlayerLobbyRestrictions(player);

  mod.DisplayHighlightedWorldLogMessage(mod.Message("JOINED_LOBBY", player));
}

async function SetPlayerLobbyRestrictions(player: mod.Player) {
  while (!GetPlayerIsAlive(player)) {
    await mod.Wait(1);
    if (!mod.IsPlayerValid(player)) return;
  }

  mod.EnableAllInputRestrictions(player, false);

  LogEvent(1, SetPlayerLobbyRestrictions.name, `Input restrictions set.`, {
    player,
    main: LogOType.Player,
  });
}

function SetPlayerIdleCourseRestrictions(player: mod.Player) {
  if (!GetPlayerIsAlive(player)) return;

  mod.EnableAllInputRestrictions(player, false);
  //mod.EnableInputRestriction(player, mod.RestrictedInputs.Crouch, true);
  //mod.EnableInputRestriction(player, mod.RestrictedInputs.Prone, true);

  LogEvent(1, SetPlayerIdleCourseRestrictions.name, `Input restrictions set.`, {
    player,
    main: LogOType.Player,
  });
}

function SetPlayerSwingRestrictions(player: mod.Player) {
  if (!GetPlayerIsAlive(player)) return;

  mod.EnableAllInputRestrictions(player, true);
  mod.EnableInputRestriction(player, mod.RestrictedInputs.CameraPitch, false);
  mod.EnableInputRestriction(player, mod.RestrictedInputs.CameraYaw, false);
  mod.EnableInputRestriction(player, mod.RestrictedInputs.FireWeapon, false);
  mod.EnableInputRestriction(player, mod.RestrictedInputs.Zoom, false);
  mod.EnableInputRestriction(player, mod.RestrictedInputs.Crouch, false);

  LogEvent(1, SetPlayerSwingRestrictions.name, `Input restrictions set.`, {
    player,
    main: LogOType.Player,
  });
}

//************************
// -/ EVENT HANDLERS
//************************

export function OnGameModeStarted() {
  LogEvent(1, OnGameModeStarted.name, `Game mode starting...`);

  COURSE_TOTAL_PAR = GetTotalCoursePar();

  mod.SetGameModeTimeLimit(9999);

  mod.SetSpawnMode(mod.SpawnModes.AutoSpawn);

  mod.LoadMusic(mod.MusicPackages.Gauntlet);
  mod.SetMusicParam(mod.MusicParams.Gauntlet_Amplitude, 0.8);

  mod.SetScoreboardType(mod.ScoreboardType.CustomFFA);

  mod.SetScoreboardColumnNames(
    mod.Message("SCOREBOARD_GROUP"),
    mod.Message("SCOREBOARD_ON_PIN"),
    mod.Message("SCOREBOARD_STROKES"),
    mod.Message("SCOREBOARD_PAR_KEY"),
    mod.Message("SCOREBOARD_WINS"),
  );
  mod.SetScoreboardSorting(1, true);

  if (GROUP_MODE === "Static") {
    for (let i = 0; i < MAX_GROUPS; i++) {
      CreateGroup();
    }
  }

  playerRoundMusic = mod.MusicEvents.Gauntlet_Qualified_Outro;
  startCourseMusic = mod.MusicEvents.Gauntlet_MissionBriefing_Final;
  endCourseMusic = mod.MusicEvents.Gauntlet_WonOperation_Loop;

  //Hole 1
  PlaySFX(
    rtc.SFX_Levels_Cairo_MP_Abbasid_Spots_Birds_Palace_SimpleLoop3D,
    mod.GetObjectPosition(mod.GetSpatialObject(bushSoundOrigin_id)),
    undefined,
    { is3D: true, isContinuousLoop: true },
  );
}

function InitClubHouseWorldIcons() {
  const positions = [
    mod.GetObjectPosition(mod.GetSpatialObject(matchmaking_Panel_1_id)),
  ];

  for (let i = 0; i < positions.length; i++) {
    const pos = v3(
      mod.XComponentOf(positions[i]),
      mod.YComponentOf(positions[i]) + 2.3,
      mod.ZComponentOf(positions[i]),
    );
    WIM.setup().createIcon(
      "matchmaking_wi_clubhouse_" + (i + 1),
      v3ToVector(pos),
      {
        text: mod.Message("CLUBHOUSE_PANEL"),
        textEnabled: false,
        color: UI.COLORS.GOLD_YELLOW_DARK,
        icon: mod.WorldIconImages.Alert,
        iconEnabled: true,
        teamOwner: mod.GetTeam(LOBBY_TEAM_ID),
      },
    );
  }
}

export function OnPlayerJoinGame(player: mod.Player) {
  const pid = mod.GetObjId(player);

  LogEvent(1, OnPlayerJoinGame.name, `Joining game.`, {
    pid,
    main: LogOType.Player,
  });

  CreatePlayerState(player);
  SetPlayerGeneralPhase(pid, "JOINING");

  mod.SetRedeployTime(player, 5);

  WIM.setup().refreshAllIcons();
}

export function OnPlayerSwitchTeam(player: mod.Player, newTeam: mod.Team) {
  const pid = mod.GetObjId(player);

  /*mod.DisplayHighlightedWorldLogMessage(
    mod.Message("SWITCHED_TEAM", player, mod.GetObjId(newTeam)),
  );*/

  LogEvent(
    1,
    OnPlayerSwitchTeam.name,
    `Switched to team ${mod.GetObjId(newTeam)}.`,
    { pid, main: LogOType.Player },
  );
}

/*export function OngoingPlayer(player: mod.Player) {
}*/

export function OnPlayerLeaveGame(pid: number) {
  LogEvent(1, OnPlayerLeaveGame.name, `Leaving game...`, {
    pid,
    main: LogOType.Player,
  });

  // Unspawn golf ball if any
  UnspawnPlayerBall(pid);

  // Cleanup world icons / vfx
  DeleteCarryWorldIcon(pid);
  DeletePredictedWorldIcon(pid);
  DeletePredictedFx(pid);

  // Leave group if any
  const group = GetGroupFromPlayer(pid);
  if (group) {
    RemovePlayerFromGroup(pid);
  }

  // Delete player UIs
  DeleteAllUIForPid(pid);

  // Delete player voiceover object
  UnspawnPlayerVoiceoverObject(pid);

  // Remove saved player state
  DeletePlayerState(pid);

  LogEvent(1, OnPlayerLeaveGame.name, `Left game.`, {
    pid,
    main: LogOType.Player,
  });
}

export function OnVehicleSpawned(vehicle: mod.Vehicle) {
  console.log(
    `Vehicle spawned with id ${mod.GetObjId(vehicle)}. Setting yaw...`,
  );
  SetVehicleYaw(vehicle);
}

async function SetVehicleYaw(vehicle: mod.Vehicle) {
  const vId = mod.GetObjId(vehicle);

  let thisVs = AllVehicleSpawners.filter((vs) => vs.vehicleId === vId);

  const maxWaitTime = 2;
  let elapsedTime = 0;

  while (thisVs.length < 1) {
    thisVs = AllVehicleSpawners.filter((vs) => vs.vehicleId === vId);
    await mod.Wait(0.2);
    elapsedTime += 0.2;
    if (elapsedTime >= maxWaitTime) break;
  }

  const pos = GetVehiclePos(vehicle);
  const spawnYaw = thisVs[0]?.spawnYaw ?? 0;

  mod.Teleport(vehicle, pos, spawnYaw);
}

export function OnVehicleDestroyed(vehicle: mod.Vehicle) {
  const vId = mod.GetObjId(vehicle);
  console.log(`Vehicle destroyed with id ${vId}.`);

  const idx = AllVehicleSpawners.findIndex((vs) => vs.vehicleId === vId);
  if (idx === -1) return; // not one of our carts

  const spawner = AllVehicleSpawners[idx];

  // Teleport after destroy to remove vehicle debris instantly
  const pos = mod.GetObjectPosition(vehicle);
  const p = vectorToV3(pos);
  const newPos = v3(p.x, p.y + 10, p.z);
  mod.Teleport(vehicle, v3ToVector(newPos), 0);

  // Clean up spawner
  if (spawner.object && mod.GetObjId(spawner.object) === spawner.id) {
    mod.UnspawnObject(spawner.object as mod.Object);
    console.log(`Unspawned vehicle spawner with id ${spawner.id}.`);
  }

  // Remove from tracking
  AllVehicleSpawners.splice(idx, 1);
}

export async function OnPlayerDeployed(player: mod.Player) {
  if (
    !mod.IsPlayerValid(player) ||
    mod.GetSoldierState(player, mod.SoldierStateBool.IsAISoldier)
  )
    return;

  const pid = mod.GetObjId(player);
  const psui = players[pid].ui;

  if (!players[pid].sound.VO) SpawnPlayerVoiceOverObject(player);

  mod.SetCameraTypeForPlayer(player, mod.Cameras.FirstPerson);

  if (mod.HasEquipment(player, mod.Weapons.Sidearm_ES_57))
    mod.RemoveEquipment(player, mod.Weapons.Sidearm_ES_57);

  if (GetPlayerGeneralPhase(pid) === "JOINING") {
    SetPlayerGeneralPhase(pid, "IDLE");
    SetPlayerLobbyRestrictions(player);
    await AssignPlayerToLobby(player, true);

    if (
      GetGroupFromPlayer(player) == null &&
      mod.GetObjId(mod.GetTeam(player)) !== LOBBY_TEAM_ID
    ) {
      mod.SetRedeployTime(player, 9999);
      mod.DealDamage(player, 9999);

      if (psui.firstSpawnUI.root) DeleteFirstSpawnUI(pid);

      TransitionScreenInAndOut(player, true, 3);

      const ps = GetValidPlayerState(player);
      if (!ps) return;

      if (!psui.serverFullText) {
        psui.serverFullText = new UI.Text(
          {
            name: `server_full_${pid}`,
            x: 0,
            y: 0,
            width: 200,
            height: 40,
            anchor: mod.UIAnchor.Center,
            textAnchor: mod.UIAnchor.Center,
            message: mod.Message("SERVER_FULL" + ps.general.languageSuffix),
            textSize: 18,
            textColor: UI.COLORS.WHITE,
            textAlpha: 0.8,
          },
          player,
        );
      }
    }
  }
}

export function OnPlayerDied(
  player: mod.Player,
  otherPlayer: mod.Player,
  deadType: mod.DeathType,
  weaponUnlock: mod.WeaponUnlock,
) {
  const pid = mod.GetObjId(player);

  const ps = GetValidPlayerState(player);
  if (ps) ps.ball.token++;

  LogEvent(1, OnPlayerDied.name, `Player died.`, {
    pid,
    main: LogOType.Player,
  });

  const playerGroup = GetGroupFromPlayer(player);

  if (playerGroup && playerGroup.currentPlayer === player)
    ForceHideGroupNotification(playerGroup);
  ForceHidePlayerNotification(pid);

  RemovePlayerFromGroup(pid);
}

export function OnPlayerEnterAreaTrigger(
  player: mod.Player,
  areaTrigger: mod.AreaTrigger,
) {
  const atId = mod.GetObjId(areaTrigger);

  LogEvent(
    1,
    OnPlayerEnterAreaTrigger.name,
    `Player entered area trigger ${atId}.`,
    {
      player,
      main: LogOType.Player,
    },
  );
}

export function OnPlayerExitAreaTrigger(
  player: mod.Player,
  areaTrigger: mod.AreaTrigger,
) {
  if (!mod.IsPlayerValid(player)) return;

  const atId = mod.GetObjId(areaTrigger);
  const ps = GetValidPlayerState(player);
  if (!ps) return;

  LogEvent(
    1,
    OnPlayerExitAreaTrigger.name,
    `Player exited area trigger ${atId}.`,
    {
      player,
      main: LogOType.Player,
    },
  );

  // Player out of Lobby area
  if (atId === 201) {
    const playerGroup = GetGroupFromPlayer(player);

    if ((playerGroup && playerGroup.phase === "LOBBY") || !playerGroup) {
      PlayVO(mod.VoiceOverEvents2D.GlobalOutOfBounds, { player });
      mod.UndeployPlayer(player);
    }
  }
}

export async function OnPlayerInteract(
  player: mod.Player,
  ip: mod.InteractPoint,
) {
  if (!mod.IsPlayerValid(player)) return;

  const pid = mod.GetObjId(player);
  const ipid = mod.GetObjId(ip);

  if (ipid === intPt_LobbyMusic_id) {
    if (!lobbySFX && !lobbySFX2) {
      const playback1 = PlaySFX(
        sfxLobbyMusic,
        mod.GetObjectPosition(mod.GetSpatialObject(wallSpeaker1_id)),
        undefined,
        {
          is3D: true,
          isContinuousLoop: true,
          amplitude: 0.2,
          range: 50,
        },
      );
      const playback2 = PlaySFX(
        sfxLobbyMusic,
        mod.GetObjectPosition(mod.GetSpatialObject(wallSpeaker2_id)),
        undefined,
        {
          is3D: true,
          isContinuousLoop: true,
          amplitude: 0.4,
          range: 100,
        },
      );
      [lobbySFX, lobbySFX2] = await Promise.all([playback1, playback2]);
    } else {
      if (lobbySFX != null) {
        mod.UnspawnObject(lobbySFX);
        lobbySFX = null;
      }
      if (lobbySFX2 != null) {
        mod.UnspawnObject(lobbySFX2);
        lobbySFX2 = null;
      }
    }
  } else if (
    ipid === intPt_MatchmakingUI_1_id ||
    ipid === intPt_MatchmakingUI_2_id
  ) {
    PlaySFX(sfxOpenMenu, ZERO_VEC, player, {
      amplitude: 0.5,
    });
    SetupMatchmakingUI(player);
  } else if (
    // PLAYER INTERACT WITH OWN BALL

    players[pid].ball.interactPoint &&
    ipid === mod.GetObjId(players[pid].ball.interactPoint)
  ) {
    LogEvent(
      1,
      OnPlayerInteract.name,
      `Interacted with their golf ball (interactPointId: ${ipid}).`,
      { pid, main: LogOType.Player },
    );

    PlaySFX(sfxOpenMenu, ZERO_VEC, player, {
      amplitude: 0.5,
    });

    const ballSurface = GetPlayerBallSurfaceType(player);

    SetPlayerSwingRestrictions(player);

    await ForceHidePlayerNotification(pid);

    const ps = GetValidPlayerState(player);
    if (!ps) return;

    const playerGroup = GetGroupFromPlayer(player);
    if (!playerGroup) return;

    SetPlayerGeneralPhase(pid, "SWING_SETUP");

    if (ballSurface === SurfaceType.Green) {
      TeleportPlayerBehindBall(
        player,
        GetHoleData(playerGroup.currentHole).flagPt,
      );
      SetupGreenView(player);
    } else {
      //mod.SetCameraTypeForPlayer(player, mod.Cameras.ThirdPerson);

      await SetPlayerHitCam(player);

      // Teleport player to reset pitch
      /*const pos = GetPlayerPos(player);
      const facingDir = mod.GetSoldierState(player, mod.SoldierStateVector.GetFacingDirection);
      const yaw = Math.atan2(mod.XComponentOf(facingDir), mod.ZComponentOf(facingDir));
      mod.Teleport(player, pos, yaw);*/
    }

    HideAllGroupPlayerBallIcons(playerGroup);

    SpawnFlagPole(playerGroup);

    SetFlagFxVisibility(playerGroup, ps.ball.lastObjectPos);

    PredictedPosLoop(player);
    DeleteBallInteractPoint(pid);
    HidePlayingBallFx(playerGroup);

    InitBallHitUI(player);

    ShowSurfaceUI(player);
    DeleteBallWorldIcon(pid);
    DeleteCarryWorldIcon(pid);

    InitBallHitTimer(player);
  }
}

function GetPositionBehindTarget(
  originPos: V3,
  targetPos: V3,
  distance: number,
): V3 {
  // Direction from ball -> target
  const dx = targetPos.x - originPos.x;
  const dz = targetPos.z - originPos.z;
  const len = Math.sqrt(dx * dx + dz * dz);
  if (len <= 0.0001) return ZERO_V3;

  // Normalized direction toward target
  const nx = dx / len;
  const nz = dz / len;

  return {
    x: originPos.x - nx * distance,
    y: originPos.y,
    z: originPos.z - nz * distance,
  };
}

function TeleportPlayerBehindBall(player: mod.Player, targetPos: V3) {
  const unitsBehindBall = 1.0;

  const ps = GetValidPlayerState(player);
  if (!ps || !ps.ball.lastObjectPos) return ZERO_V3;

  const group = GetGroupFromPlayer(player);
  if (!group) return ZERO_V3;

  const holeData = GetHoleData(group.currentHole);
  if (!holeData) return ZERO_V3;

  const ballPos = ps.ball.lastObjectPos;

  const teleportPos = GetPositionBehindTarget(
    ballPos,
    targetPos,
    unitsBehindBall,
  );
  const teleportYaw = YawTowards(v3ToVector(ballPos), v3ToVector(targetPos));

  // Teleport
  mod.Teleport(
    player,
    v3ToVector(v3(teleportPos.x, teleportPos.y + 0.5, teleportPos.z)),
    teleportYaw,
  );

  return teleportPos;
}

async function InitBallHitTimer(player: mod.Player) {
  const ps = GetValidPlayerState(player);
  if (!ps) return;

  const pid = mod.GetObjId(player);
  const playerGroup = GetGroupFromPlayer(player);
  if (!playerGroup) return;

  const groupInitialUniqueId = playerGroup.groupUniqueId;

  const currentToken = ps.swing.hitToken;

  const timer = 60; // seconds
  let elapsed = 0;
  let timerWarningPlayed = false;
  const timerWarningThreshold = 5; // seconds remaining when warning VO and sfx should play

  while (
    mod.IsPlayerValid(player) &&
    GetPlayerGeneralPhase(pid) === "SWING_SETUP"
  ) {
    if (timer - elapsed <= timerWarningThreshold && !timerWarningPlayed) {
      PlayVO(mod.VoiceOverEvents2D.TimeLow, {
        player,
      });
      PlaySFX(sfxClockTickLoop, ZERO_VEC, player, {
        duration: timer - elapsed,
        amplitude: 0.5,
      });
      timerWarningPlayed = true;
    }

    await mod.Wait(1.0);
    elapsed += 1.0;

    if (elapsed >= timer) {
      break;
    }
  }

  if (ps.swing.hitToken === currentToken) {
    const playerGroup = GetGroupFromPlayer(player);
    if (!playerGroup) return;

    if (playerGroup.groupUniqueId !== groupInitialUniqueId) {
      return;
    }

    OnPlayerFailedtoInteractWithBall(player);
  }
}

async function SetupGreenView(player: mod.Player) {
  const pid = mod.GetObjId(player);

  const ps = GetValidPlayerState(player);
  if (!ps) {
    return;
  }

  const ballPos = ps.ball.lastObjectPos;
  if (!ballPos) {
    return;
  }

  const group = GetGroupFromPlayer(player);
  if (!group) {
    return;
  }

  const holeNumber = group.currentHole;
  const hole = GetHoleData(holeNumber);
  if (!hole) {
    return;
  }

  const flagPos = hole.flagPt;

  const GRID_STEP = 1;
  const SIDE_CELLS = 2;
  const EXTRA_FORWARD_STEPS = 2;
  const MOVE_DURATION = 4;

  const SLOPE_SPEED_FACTOR = 2;
  const MAX_SPEED = 8;

  const forward = v3Normalize({
    x: flagPos.x - ballPos.x,
    y: 0,
    z: flagPos.z - ballPos.z,
  });

  const right = {
    x: -forward.z,
    y: 0,
    z: forward.x,
  };

  const dist = DistanceBetween(
    v3ToVector(ballPos),
    v3ToVector(flagPos),
    DistanceType.XZ,
    DistanceUnit.Meters,
    2,
  );

  const forwardSteps =
    Math.floor(dist.wholeWithDecimals / GRID_STEP) + EXTRA_FORWARD_STEPS;

  type GreenGridPoint = {
    origin: V3;
    current: V3;
    object: string; //mod.VFX;
    iconIndex: number;
  };

  const gridPoints: GreenGridPoint[] = [];

  for (let f = 0; f <= forwardSteps; f++) {
    const fOffset = v3Scale(forward, f * GRID_STEP);

    for (let s = -SIDE_CELLS; s <= SIDE_CELLS; s++) {
      const sOffset = v3Scale(right, s * GRID_STEP);

      const x = ballPos.x + fOffset.x + sOffset.x;
      const z = ballPos.z + fOffset.z + sOffset.z;

      const y = GetTerrainHeight(holeNumber, { x, y: 0, z });
      if (y == null) {
        continue;
      }

      const pos = { x, y: y - 0.5, z };

      let obj: string;
      try {
        obj = "GreenView_GrassParticle_" + pid + "_" + f + s;
        await WIM.setup().createIcon(obj, v3ToVector(pos), {
          iconEnabled: false,
          textEnabled: true,
          text: mod.Message("o"),
          color: UI.COLORS.WHITE,
          teamOwner: group.team,
        });
      } catch (e) {
        LogError(SetupGreenView.name, `Spawn exception (${e})`, 1001);
        continue;
      }

      if (!obj) {
        LogError(SetupGreenView.name, `Spawn returned null (${obj})`, 1002);
        continue;
      }

      gridPoints.push({
        origin: pos,
        current: { ...pos },
        object: obj,
        iconIndex: 0,
      });
    }
  }

  if (gridPoints.length === 0) {
    return;
  }

  function ComputeSlopeVector(pos: V3): V3 {
    const eps = 0.5;

    const hL = GetTerrainHeight(holeNumber, { x: pos.x - eps, y: 0, z: pos.z });
    const hR = GetTerrainHeight(holeNumber, { x: pos.x + eps, y: 0, z: pos.z });
    const hF = GetTerrainHeight(holeNumber, { x: pos.x, y: 0, z: pos.z + eps });
    const hB = GetTerrainHeight(holeNumber, { x: pos.x, y: 0, z: pos.z - eps });

    if (hL == null || hR == null || hF == null || hB == null) {
      return vectorToV3(ZERO_VEC);
    }

    return {
      x: hL - hR,
      y: 0,
      z: hB - hF,
    };
  }

  function ComputeVelocity(pos: V3): V3 {
    const slope = ComputeSlopeVector(pos);
    const mag = Math.sqrt(slope.x * slope.x + slope.z * slope.z);

    if (mag < 0.01) return vectorToV3(ZERO_VEC);

    const dir = v3Normalize({ x: slope.x, y: 0, z: slope.z });
    const speed = Math.min(mag * SLOPE_SPEED_FACTOR, MAX_SPEED);

    return v3Scale(dir, speed);
  }

  const STEP_DT = GLOBAL_TICK_RATE;
  let elapsed = 0;

  (async () => {
    while (GetPlayerGeneralPhase(mod.GetObjId(player)) === "SWING_SETUP") {
      for (const p of gridPoints) {
        const vel = ComputeVelocity(p.current);
        if (vel.x === 0 && vel.z === 0) continue;

        const nextX = p.current.x + vel.x * STEP_DT;
        const nextZ = p.current.z + vel.z * STEP_DT;

        const nextY = GetTerrainHeight(holeNumber, {
          x: nextX,
          y: 0,
          z: nextZ,
        });

        if (nextY == null) continue;

        p.current = {
          x: nextX,
          y: nextY,
          z: nextZ,
        };

        WIM.setup().setPosition(p.object, v3ToVector(p.current));
      }

      elapsed += STEP_DT;

      if (elapsed >= MOVE_DURATION) {
        for (const p of gridPoints) {
          p.current = { ...p.origin };
          WIM.setup().setPosition(p.object, v3ToVector(p.origin));
        }

        elapsed = 0;
      }

      await mod.Wait(STEP_DT);
    }

    for (const p of gridPoints) {
      //mod.UnspawnObject(p.object);
      WIM.setup().deleteIcon(p.object);
    }
  })();
}

export function OnPlayerEnterVehicleSeat(
  player: mod.Player,
  vehicle: mod.Vehicle,
  seat: mod.Object,
) {
  if (!mod.IsPlayerValid(player)) return;

  LogEvent(
    1,
    OnPlayerEnterVehicleSeat.name,
    `Entered seat of vehicle ${mod.GetObjId(vehicle)}.`,
    { player, main: LogOType.Player },
  );

  VehicleSwingCheck(player, vehicle);
}

async function VehicleSwingCheck(player: mod.Player, vehicle: mod.Vehicle) {
  const pid = mod.GetObjId(player);

  let logSwingCheck = true;
  const loopTime = 1.0;
  const thisDt = 0.05;
  const iterations = loopTime / thisDt;

  for (let i = 0; i < iterations; i++) {
    await mod.Wait(thisDt);

    if (
      mod.GetSoldierState(player, mod.SoldierStateBool.IsInVehicle) === false
    ) {
      LogEvent(
        1,
        VehicleSwingCheck.name,
        `Exited vehicle before swing setup.`,
        { pid, main: LogOType.Player },
      );
      return;
    }

    if (GetPlayerGeneralPhase(pid) === "SWING_SETUP") {
      mod.ForcePlayerExitVehicle(player, vehicle);
      LogEvent(1, VehicleSwingCheck.name, `Forced to exit vehicle for swing.`, {
        pid,
        main: LogOType.Player,
      });
      return;
    } else {
      if (logSwingCheck) {
        LogEvent(
          1,
          VehicleSwingCheck.name,
          `Still in vehicle, awaiting swing setup for ${loopTime} seconds...`,
          { pid, main: LogOType.Player },
        );
        logSwingCheck = false;
      }
    }
  }
  LogEvent(
    1,
    VehicleSwingCheck.name,
    `Player did not initiate swing after ${loopTime} seconds. Exiting vehicle check loop.`,
    { pid, main: LogOType.Player },
  );
}

export async function OnPlayerUIButtonEvent(
  player: mod.Player,
  eventUIWidget: mod.UIWidget,
  eventUIButtonEvent: mod.UIButtonEvent,
) {
  // Only act on button down
  if (!mod.Equals(eventUIButtonEvent, mod.UIButtonEvent.ButtonDown)) {
    return;
  }

  await UI.handleButtonClick(player, eventUIWidget, eventUIButtonEvent);
}

//************************
// -/ CAMERA
//************************

function Clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function Lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function LerpV3(a: V3, b: V3, t: number): V3 {
  return v3(Lerp(a.x, b.x, t), Lerp(a.y, b.y, t), Lerp(a.z, b.z, t));
}

function DistanceXZ(a: V3, b: V3): number {
  return DistanceBetween(
    v3ToVector(a),
    v3ToVector(b),
    DistanceType.XZ,
    DistanceUnit.Meters,
    3,
  ).wholeWithDecimals;
}

function BuildCameraRoute(holeData: HoleData): V3[] {
  const route: V3[] = [holeData.teeOffPt];

  if (holeData.cameraAimPts && holeData.cameraAimPts.length > 0) {
    for (const pt of holeData.cameraAimPts) {
      route.push(pt);
    }
  }

  route.push(holeData.flagPt);
  return route;
}

function GetClosestPointOnSegmentXZ(
  p: V3,
  a: V3,
  b: V3,
): { point: V3; t: number; dist: number } {
  const ab = v3Sub(b, a);
  const ap = v3Sub(p, a);

  const abLenSq = ab.x * ab.x + ab.z * ab.z;
  let t = 0;

  if (abLenSq > 0.0001) {
    t = Clamp((ap.x * ab.x + ap.z * ab.z) / abLenSq, 0, 1);
  }

  const point = LerpV3(a, b, t);
  const dist = DistanceXZ(p, point);

  return { point, t, dist };
}

function GetPointAtDistanceAlongRoute(route: V3[], distance: number): V3 {
  if (route.length <= 1) return route[0];

  let remaining = distance;

  for (let i = 0; i < route.length - 1; i++) {
    const a = route[i];
    const b = route[i + 1];
    const segLen = DistanceXZ(a, b);

    if (segLen <= 0.0001) continue;

    if (remaining <= segLen) {
      return LerpV3(a, b, remaining / segLen);
    }

    remaining -= segLen;
  }

  return route[route.length - 1];
}

function GetCameraRouteAimTarget(ballPos: V3, holeData: HoleData): V3 {
  if (!holeData.cameraAimPts || holeData.cameraAimPts.length <= 0) {
    return holeData.flagPt;
  }

  const route = BuildCameraRoute(holeData);

  let bestSegIndex = 0;
  let bestSegT = 0;
  let bestSegLength = 0;

  let bestDist = Number.POSITIVE_INFINITY;
  let distAlongRouteBeforeSeg = 0;
  let bestDistAlongRoute = 0;

  for (let i = 0; i < route.length - 1; i++) {
    const a = route[i];
    const b = route[i + 1];
    const segLen = DistanceXZ(a, b);

    if (segLen <= 0.0001) continue;

    const proj = GetClosestPointOnSegmentXZ(ballPos, a, b);

    if (proj.dist < bestDist) {
      bestDist = proj.dist;
      bestSegIndex = i;
      bestSegT = proj.t;
      bestSegLength = segLen;
      bestDistAlongRoute = distAlongRouteBeforeSeg + segLen * proj.t;
    }

    distAlongRouteBeforeSeg += segLen;
  }

  let lookAhead = 45;

  const distToFlag = DistanceXZ(ballPos, holeData.flagPt);
  if (distToFlag < 200) lookAhead = 30;
  if (distToFlag < 150) lookAhead = 18;
  if (distToFlag < 100) lookAhead = 8;

  const distToNextPtAlongSegment = bestSegLength * (1 - bestSegT);
  const cornerBonus =
    distToNextPtAlongSegment < 40
      ? 30
      : distToNextPtAlongSegment < 70
        ? 20
        : distToNextPtAlongSegment < 100
          ? 10
          : 0;

  lookAhead += cornerBonus;

  const totalRouteLength = route.reduce((sum, _, i) => {
    if (i >= route.length - 1) return sum;
    return sum + DistanceXZ(route[i], route[i + 1]);
  }, 0);

  const targetDist = Clamp(bestDistAlongRoute + lookAhead, 0, totalRouteLength);
  const routeTarget = GetPointAtDistanceAlongRoute(route, targetDist);

  const flagWeight =
    distToFlag < 200 ? Clamp((190 - distToFlag) / 110, 0, 1) : 0;

  // Optional: still force full flag focus very near the green.
  const nearGreenWeight =
    distToFlag < 80 ? Clamp((80 - distToFlag) / 80, 0, 1) : 0;

  const finalFlagWeight = Math.max(flagWeight, nearGreenWeight);

  return LerpV3(routeTarget, holeData.flagPt, finalFlagWeight);
}

function BuildHoleIntroRoute(holeData: HoleData): V3[] {
  const route: V3[] = [holeData.teeOffPt];

  if (holeData.cameraAimPts && holeData.cameraAimPts.length > 0) {
    for (const pt of holeData.cameraAimPts) {
      route.push(pt);
    }
  }

  route.push(holeData.flagPt);

  if (route.length >= 2) {
    const first = route[0];
    const second = route[1];

    const unitsBehind = 50;

    const dirXZ = v3Normalize(v3(second.x - first.x, 0, second.z - first.z));

    const startBehind = v3(
      first.x - dirXZ.x * unitsBehind,
      first.y,
      first.z - dirXZ.z * unitsBehind,
    );

    route.unshift(startBehind);
  }

  return route;
}

async function PlayHoleIntroCameraRoute(group: CourseGroup): Promise<void> {
  function DistanceXZ(a: V3, b: V3): number {
    return DistanceBetween(
      v3ToVector(a),
      v3ToVector(b),
      DistanceType.XZ,
      DistanceUnit.Meters,
      2,
    ).wholeWithDecimals;
  }

  function GetFinalIntroLookTarget(route: V3[]): V3 {
    const n = route.length;
    if (n < 2) return route[n - 1];

    const prev = route[n - 2];
    const flag = route[n - 1];
    const dir = v3Normalize(v3Sub(flag, prev));

    return v3Add(flag, v3Scale(dir, 8));
  }

  function GetQuadraticBezierPoint(p0: V3, p1: V3, p2: V3, t: number): V3 {
    const u = 1 - t;
    const tt = t * t;
    const uu = u * u;

    return v3(
      uu * p0.x + 2 * u * t * p1.x + tt * p2.x,
      uu * p0.y + 2 * u * t * p1.y + tt * p2.y,
      uu * p0.z + 2 * u * t * p1.z + tt * p2.z,
    );
  }

  function GetPointTowards(from: V3, to: V3, distance: number): V3 {
    const dir = v3Normalize(v3Sub(to, from));
    return v3Add(from, v3Scale(dir, distance));
  }

  function BuildSmoothedIntroPath(route: V3[]): V3[] {
    if (route.length <= 2) return route;

    const FLAG_STOP_BACK = 10;
    const FINAL_EXTRA_T = 0.5;

    const smoothPath: V3[] = [];
    const cornerRadius = 80;
    const samplesPerCorner = 60;

    smoothPath.push(route[0]);

    for (let i = 1; i < route.length - 1; i++) {
      const prev = route[i - 1];
      const curr = route[i];
      const next = route[i + 1];

      const distPrev = DistanceXZ(prev, curr);
      const distNext = DistanceXZ(curr, next);

      const trimIn = Math.min(cornerRadius, distPrev * 0.35);
      const trimOut = Math.min(cornerRadius, distNext * 0.35);

      const curveStart = GetPointTowards(curr, prev, trimIn);
      const curveEnd = GetPointTowards(curr, next, trimOut);

      const last = smoothPath[smoothPath.length - 1];
      if (DistanceXZ(last, curveStart) > 0.05) {
        smoothPath.push(curveStart);
      }

      for (let s = 1; s <= samplesPerCorner; s++) {
        const t = s / (samplesPerCorner + 1);
        smoothPath.push(GetQuadraticBezierPoint(curveStart, curr, curveEnd, t));
      }

      smoothPath.push(curveEnd);
    }

    const flagPt = route[route.length - 1];
    const prevToFlagPt = route[route.length - 2];
    const lastSmoothedPt = smoothPath[smoothPath.length - 1];

    const distPrevToFlag = DistanceXZ(prevToFlagPt, flagPt);
    const stopBack = Math.min(
      FLAG_STOP_BACK,
      Math.max(distPrevToFlag - 0.01, 0),
    );

    const finalApproachPt = GetPointTowards(flagPt, prevToFlagPt, stopBack);

    const preFinalApproachPt = v3(
      prevToFlagPt.x + (finalApproachPt.x - prevToFlagPt.x) * FINAL_EXTRA_T,
      prevToFlagPt.y + (finalApproachPt.y - prevToFlagPt.y) * FINAL_EXTRA_T,
      prevToFlagPt.z + (finalApproachPt.z - prevToFlagPt.z) * FINAL_EXTRA_T,
    );

    if (DistanceXZ(lastSmoothedPt, preFinalApproachPt) > 0.05) {
      smoothPath.push(preFinalApproachPt);
    }

    if (DistanceXZ(preFinalApproachPt, finalApproachPt) > 0.05) {
      smoothPath.push(finalApproachPt);
    }

    return smoothPath;
  }

  function Lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }

  function NormalizeAngleRad(angle: number): number {
    while (angle > Math.PI) angle -= Math.PI * 2;
    while (angle < -Math.PI) angle += Math.PI * 2;
    return angle;
  }

  function LerpAngleRad(a: number, b: number, t: number): number {
    const delta = NormalizeAngleRad(b - a);
    return a + delta * t;
  }

  function YawTowards(from: V3, to: V3): number {
    return Math.atan2(to.x - from.x, to.z - from.z);
  }

  function GetPitchTowards(from: V3, to: V3): number {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const dz = to.z - from.z;
    const horizontal = Math.sqrt(dx * dx + dz * dz);

    return -Math.atan2(dy, Math.max(horizontal, 0.0001));
  }

  const holeData = GetHoleData(group.currentHole);
  if (!holeData) return;

  const rawRoute = BuildHoleIntroRoute(holeData);
  if (rawRoute.length <= 1) return;

  const path = BuildSmoothedIntroPath(rawRoute);
  if (path.length <= 1) return;

  const defaultCamHeight = 6;
  const finalCamHeight = defaultCamHeight / 2;
  const rotationSmoothing = 0.15;
  const camParamsRefreshTicks = 10;

  const segmentLengths: number[] = [];
  const cumulativeDistances: number[] = [0];

  let totalLength = 0;

  for (let i = 1; i < path.length; i++) {
    const len = DistanceXZ(path[i - 1], path[i]);
    segmentLengths.push(len);
    totalLength += len;
    cumulativeDistances.push(totalLength);
  }

  if (totalLength <= 0) return;

  const first = path[0];
  const firstLook = path[Math.min(1, path.length - 1)];

  const firstPos = v3(first.x, first.y + defaultCamHeight, first.z);
  const firstYaw = YawTowards(
    firstPos,
    v3(firstLook.x, firstPos.y, firstLook.z),
  );
  const firstPitch = 0.01;

  MoveCameraToPos(firstPos, {
    trackedPos: v3(firstLook.x, firstPos.y, firstLook.z),
    trackYaw: true,
    trackPitch: false,
    fixedPitchValue: firstPitch,
  });

  await mod.Wait(0.15);

  let previousYaw = firstYaw;
  let previousPitch = firstPitch;

  let traveled = 0;
  let segmentIndex = 0;
  let cachedSpeed = 30;
  let cachedLookAheadDistance = 45;
  let tickCounter = 0;

  while (traveled < totalLength) {
    if (tickCounter % camParamsRefreshTicks === 0) {
      cachedSpeed = 30;
      cachedLookAheadDistance = 45;
    }
    tickCounter++;

    while (
      segmentIndex < segmentLengths.length - 1 &&
      traveled > cumulativeDistances[segmentIndex + 1]
    ) {
      segmentIndex++;
    }

    const isLastSegment = segmentIndex === segmentLengths.length - 1;
    const currentSpeed = isLastSegment ? cachedSpeed * 0.5 : cachedSpeed;

    traveled = Math.min(
      traveled + Math.max(currentSpeed, 0.001) * ballPhys.dt,
      totalLength,
    );

    while (
      segmentIndex < segmentLengths.length - 1 &&
      traveled > cumulativeDistances[segmentIndex + 1]
    ) {
      segmentIndex++;
    }

    const segStart = path[segmentIndex];
    const segEnd = path[segmentIndex + 1];
    const segLen = segmentLengths[segmentIndex];
    const segStartDist = cumulativeDistances[segmentIndex];

    const localT = segLen <= 0 ? 1 : (traveled - segStartDist) / segLen;

    const posX = Lerp(segStart.x, segEnd.x, localT);
    const posYBase = Lerp(segStart.y, segEnd.y, localT);
    const posZ = Lerp(segStart.z, segEnd.z, localT);

    const endBlend = totalLength <= 0 ? 1 : traveled / totalLength;
    const camHeight = Lerp(defaultCamHeight, finalCamHeight, endBlend);

    const currentPos = v3(posX, posYBase + camHeight, posZ);

    const lookDistance = Math.min(
      traveled + cachedLookAheadDistance,
      totalLength,
    );

    let lookSegmentIndex = segmentIndex;
    while (
      lookSegmentIndex < segmentLengths.length - 1 &&
      lookDistance > cumulativeDistances[lookSegmentIndex + 1]
    ) {
      lookSegmentIndex++;
    }

    const finalSegmentBlend =
      totalLength <= 0
        ? 1
        : Math.max(0, Math.min(1, (traveled - (totalLength - 25)) / 25));

    let lookTarget: V3;

    if (lookDistance >= totalLength) {
      const endPathTarget = path[path.length - 1];
      const finalLookTarget = GetFinalIntroLookTarget(rawRoute);

      lookTarget = v3(
        Lerp(endPathTarget.x, finalLookTarget.x, finalSegmentBlend),
        Lerp(endPathTarget.y, finalLookTarget.y, finalSegmentBlend),
        Lerp(endPathTarget.z, finalLookTarget.z, finalSegmentBlend),
      );
    } else {
      const lookStart = path[lookSegmentIndex];
      const lookEnd = path[lookSegmentIndex + 1];
      const lookSegLen = segmentLengths[lookSegmentIndex];
      const lookSegStartDist = cumulativeDistances[lookSegmentIndex];

      const lookT =
        lookSegLen <= 0 ? 1 : (lookDistance - lookSegStartDist) / lookSegLen;

      lookTarget = v3(
        Lerp(lookStart.x, lookEnd.x, lookT),
        Lerp(lookStart.y, lookEnd.y, lookT),
        Lerp(lookStart.z, lookEnd.z, lookT),
      );
    }

    const flatLookTarget = v3(lookTarget.x, currentPos.y, lookTarget.z);

    const flatYaw = YawTowards(currentPos, flatLookTarget);
    const fullYaw = YawTowards(currentPos, lookTarget);
    const targetYaw = LerpAngleRad(flatYaw, fullYaw, finalSegmentBlend);

    const flatPitch = 0;
    const fullPitch = GetPitchTowards(currentPos, lookTarget);
    const targetPitch = LerpAngleRad(flatPitch, fullPitch, finalSegmentBlend);

    const yaw = LerpAngleRad(previousYaw, targetYaw, rotationSmoothing);
    const pitch = LerpAngleRad(previousPitch, targetPitch, rotationSmoothing);

    previousYaw = yaw;
    previousPitch = pitch;

    MoveCameraToPos(
      currentPos,
      {
        trackedPos: v3(lookTarget.x, currentPos.y, lookTarget.z),
        trackYaw: true,
        trackPitch: false,
        fixedPitchValue: pitch,
      },
      0,
    );

    await mod.Wait(ballPhys.dt);
  }
}

async function SetPlayerHitCam(player: mod.Player) {
  const ps = GetValidPlayerState(player);
  if (!ps) return;

  const playerGroup = GetGroupFromPlayer(player);
  if (!playerGroup) return;

  const holeData = GetHoleData(playerGroup.currentHole);
  if (!holeData) return;

  if (!ps.ball.lastObjectPos) return;

  await TransitionScreenInAndOut(player, true, 0.3, 1);

  const teeOffOffset =
    holeData.teeOffSpawnDirection === "TowardsTeeOff" ? 6 : 4.5;
  const normalOffset = 3.5;

  let yOffset =
    playerGroup.phase === "PLAYING_TEEOFF" ? teeOffOffset : normalOffset;

  const distToFlag = DistanceBetween(
    v3ToVector(ps.ball.lastObjectPos),
    v3ToVector(holeData.flagPt),
    DistanceType.XZ,
    DistanceUnit.Yards,
    2,
  ).wholeWithDecimals;

  if (distToFlag < 50 || ps.ball.currentSurface === SurfaceType.Fringe) {
    yOffset = 2.5;
  }

  const aimTarget = GetCameraRouteAimTarget(ps.ball.lastObjectPos, holeData);

  const teleportPos = TeleportPlayerBehindBall(player, aimTarget);

  const startCamPos = GetPositionBehindTarget(teleportPos, aimTarget, 2);
  const startCamYPos = GetTerrainHeight(playerGroup.currentHole, teleportPos);
  const finalStartCamPos = v3(
    startCamPos.x,
    startCamYPos ? startCamYPos + 0.25 : startCamPos.y + 1,
    startCamPos.z,
  );

  const endCamPos = GetPositionBehindTarget(teleportPos, aimTarget, 2);
  const finalEndCamPos = v3(endCamPos.x, endCamPos.y + yOffset, endCamPos.z);

  MoveCameraToPos(finalStartCamPos, {
    trackedPos: aimTarget,
    trackYaw: true,
    trackPitch: true,
  });

  mod.SetCameraTypeForPlayer(player, mod.Cameras.Fixed, 2001);

  await TransitionScreenInAndOut(player, false, 0.3);

  MoveCameraToPos(
    finalEndCamPos,
    { trackedPos: aimTarget, trackYaw: true, trackPitch: true },
    1.5,
  );

  await mod.Wait(1.5);
}

async function RecallHitCam(player: mod.Player) {
  const ps = GetValidPlayerState(player);
  if (!ps || !ps.swing.hitCamDefaultPos || !ps.swing.predictionPosition) return;

  const delay = 1.0;

  MoveCameraToPos(
    ps.swing.hitCamDefaultPos,
    {
      trackedPos: vectorToV3(ps.swing.predictionPosition),
      trackYaw: true,
      trackPitch: true,
    },
    delay,
  );
  await mod.Wait(delay);
}

type CameraOrientation = {
  fixedYawValue?: number;
  fixedPitchValue?: number;
  trackedPos?: V3;
  trackYaw?: boolean;
  trackPitch?: boolean;
};

function MoveCameraToPos(
  pos: V3,
  orientation: CameraOrientation,
  duration?: number,
  ballVel?: V3,
  keepYPosIntact?: boolean,
) {
  function NormalizeAngleRad(angle: number): number {
    let a = angle;
    const twoPi = Math.PI * 2;

    while (a > Math.PI) a -= twoPi;
    while (a < -Math.PI) a += twoPi;

    return a;
  }

  const cam = mod.GetFixedCamera(2001);

  // ORIENTATION

  //const ANGLE_EPSILON = 0.001;

  let finalPos = pos;
  let finalYaw: number;
  let finalPitch: number;

  // Positioning adjustment if following ball
  if (ballVel) {
    let backDir = v3(ballVel.x, 0, ballVel.z);

    if (v3Length(backDir) <= 0.0001) {
      backDir = v3(0, 0, 1);
    } else {
      backDir = v3Normalize(backDir);
    }

    const unitsBehind = 5;

    finalPos = v3Sub(pos, v3Scale(backDir, unitsBehind));
  }

  if (keepYPosIntact) {
    const initialPos = vectorToV3(
      mod.GetTransformPosition(mod.GetObjectTransform(cam)),
    );
    const camY = initialPos.y;
    finalPos = v3(finalPos.x, camY, finalPos.z);
  }

  const initialRot = vectorToV3(
    mod.GetTransformRotation(mod.GetObjectTransform(cam)),
  );

  const normalizedInitialYaw = NormalizeAngleRad(initialRot.y);
  const normalizedInitialPitch = NormalizeAngleRad(initialRot.x);

  // Yaw
  if (orientation.trackedPos && orientation.trackYaw) {
    const yaw = YawTowards(
      v3ToVector(finalPos),
      v3ToVector(orientation.trackedPos),
    );
    finalYaw = NormalizeAngleRad(yaw);
  } else if (orientation.fixedYawValue != null) {
    finalYaw = NormalizeAngleRad(orientation.fixedYawValue);
  } else {
    finalYaw = normalizedInitialYaw;
  }

  // Pitch
  if (orientation.trackedPos && orientation.trackPitch) {
    const dx = orientation.trackedPos.x - finalPos.x;
    const dy = orientation.trackedPos.y - finalPos.y;
    const dz = orientation.trackedPos.z - finalPos.z;

    const horizontalDist = Math.max(Math.sqrt(dx * dx + dz * dz), 0.0001);
    const pitch = -Math.atan2(dy, horizontalDist);
    finalPitch = NormalizeAngleRad(pitch);
  } else if (orientation.fixedPitchValue != null) {
    finalPitch = NormalizeAngleRad(orientation.fixedPitchValue);
  } else {
    finalPitch = normalizedInitialPitch;
  }

  const finalRot = v3(finalPitch, finalYaw, 0);

  // FINAL TRANSFORM

  const transform = mod.CreateTransform(
    v3ToVector(finalPos),
    v3ToVector(finalRot),
  );

  if (duration != null && duration > 0) {
    mod.SetObjectTransformOverTime(cam, transform, duration, false, false);
  } else {
    mod.SetObjectTransform(cam, transform);
  }
}

//************************
// -/ UI HELPERS
//************************

async function TransitionScreenInAndOut(
  player: mod.Player,
  fadeIn: boolean,
  fadeDuration: number = 0.5, // total fade time in seconds
  finalAlpha: number = 1,
  waitForDeploy: boolean = true,
) {
  if (!mod.IsPlayerValid(player)) return;

  const pid = mod.GetObjId(player);
  const container = players[pid]?.ui?.transitionUI?.root;

  if (!container) return;

  const steps = 20;
  const stepTime = fadeDuration / steps;

  if (fadeIn) {
    container.setVisible(true);
    container.setBgAlpha(0.1);

    // FADE IN
    for (let a = 0.1; a <= finalAlpha; a += 0.1) {
      container.setBgAlpha(a);
      await mod.Wait(stepTime);
    }

    container.setBgAlpha(finalAlpha);
  } else {
    // FADE OUT

    if (waitForDeploy) await WaitUntilPlayerDeployed(player);

    for (let a = finalAlpha; a >= 0; a -= 0.1) {
      container.setBgAlpha(a);
      await mod.Wait(stepTime);
    }

    container.setBgAlpha(0);
    container.setVisible(false);
  }
}

async function WaitUntilPlayerDeployed(player: mod.Player): Promise<void> {
  // Safety guard
  if (!mod.IsPlayerValid(player)) return;

  // Wait until the soldier exists AND is alive
  while (true) {
    if (mod.IsPlayerValid(player) && GetPlayerIsAlive(player)) {
      return;
    }

    await mod.Wait(0.1);
  }
}

//************************
// -/ UI INITZIALIZATION
//************************

function InitFirstSpawnUI(player: mod.Player) {
  const ps = GetValidPlayerState(player);
  if (!ps) return;

  const pid = mod.GetObjId(player);

  mod.EnableUIInputMode(true, player);

  const firstSpawnCtn = {
    width: 1000,
    height: 800,
    padding: 20,
    titleHeight: 40,
  };

  const firstSpawnContainer = new UI.Container(
    {
      name: `fs_ui_container_${pid}`,
      x: 0,
      y: firstSpawnCtn.padding,
      width: firstSpawnCtn.width,
      height: firstSpawnCtn.height,
      anchor: mod.UIAnchor.Center,
      bgAlpha: ROOT_DEFAULT_BG_ALPHA,
      bgColor: UICOLORS.GOLF_GREEN_DARK,
      bgFill: mod.UIBgFill.Solid,
      depth: mod.UIDepth.AboveGameUI,
    },
    player,
  );
  ps.ui.firstSpawnUI.root = firstSpawnContainer;

  const firstSpawnOutline = new UI.Container(
    {
      name: `fs_ui_outline_${pid}`,
      parent: firstSpawnContainer,
      x: 0,
      y: 0,
      width: firstSpawnCtn.width,
      height: firstSpawnCtn.height,
      anchor: mod.UIAnchor.TopLeft,
      bgAlpha: 0.6,
      bgColor: UI.COLORS.WHITE,
      bgFill: mod.UIBgFill.OutlineThin,
      depth: mod.UIDepth.AboveGameUI,
    },
    player,
  );

  // firstSpawnTitle
  new UI.Text(
    {
      name: `fs_ui_title_${pid}`,
      parent: firstSpawnContainer,
      x: 0,
      y: firstSpawnCtn.padding,
      width: firstSpawnCtn.width,
      height: firstSpawnCtn.titleHeight,
      anchor: mod.UIAnchor.TopCenter,
      textAnchor: mod.UIAnchor.Center,
      message: mod.Message("FIRST_SPAWN_TITLE" + ps.general.languageSuffix),
      textSize: 32,
      textColor: UI.COLORS.WHITE,
      textAlpha: 1,
    },
    player,
  );

  const firstSpawnSections = [
    {
      title: "welcome",
      titleMsg: mod.Message(`FIRST_SPAWN_S1_TITLE` + ps.general.languageSuffix),
      contentMsg: mod.Message(
        "FIRST_SPAWN_S1_CONTENT" + ps.general.languageSuffix,
      ),
      height: 60,
    },
    {
      title: "how_to_play",
      titleMsg: mod.Message(`FIRST_SPAWN_S2_TITLE` + ps.general.languageSuffix),
      contentMsg: mod.Message(
        "FIRST_SPAWN_S2_CONTENT" + ps.general.languageSuffix,
      ),
      height: 90,
    },
    {
      title: "club_select_power_adjust",
      titleMsg: mod.Message(`FIRST_SPAWN_S3_TITLE` + ps.general.languageSuffix),
      contentMsg: mod.Message(
        "FIRST_SPAWN_S3_CONTENT" + ps.general.languageSuffix,
      ),
      height: 90,
    },
    {
      title: "swing",
      titleMsg: mod.Message(`FIRST_SPAWN_S4_TITLE` + ps.general.languageSuffix),
      contentMsg: mod.Message(
        "FIRST_SPAWN_S4_CONTENT" + ps.general.languageSuffix,
      ),
      height: 160,
    },
    {
      title: "hit_modifiers",
      titleMsg: mod.Message(`FIRST_SPAWN_S5_TITLE` + ps.general.languageSuffix),
      contentMsg: mod.Message(
        "FIRST_SPAWN_S5_CONTENT" + ps.general.languageSuffix,
      ),
      height: 90,
    },
  ];

  const allSectionsHeight =
    firstSpawnSections.reduce((sum, section) => sum + section.height, 0) +
    firstSpawnCtn.padding * (firstSpawnSections.length - 1);

  const allSectionsCtn = {
    width: firstSpawnCtn.width - firstSpawnCtn.padding * 2,
    height: allSectionsHeight,
    titleHeight: 30,
    padding: 10,
  };

  const allSectionsContainer = new UI.Container(
    {
      name: `fs_ui_sections_container_${pid}`,
      parent: firstSpawnContainer,
      x: firstSpawnCtn.padding,
      y: firstSpawnCtn.padding * 2 + firstSpawnCtn.titleHeight,
      width: allSectionsCtn.width,
      height: allSectionsCtn.height,
      anchor: mod.UIAnchor.TopCenter,
      bgFill: mod.UIBgFill.None,
      depth: mod.UIDepth.AboveGameUI,
    },
    player,
  );

  for (let i = 0; i < firstSpawnSections.length; i++) {
    const section = firstSpawnSections[i];
    const sectionY =
      i === 0
        ? 0
        : firstSpawnSections
            .slice(0, i)
            .reduce((sum, sec) => sum + sec.height + firstSpawnCtn.padding, 0);

    const sectionContainer = new UI.Container(
      {
        name: `fs_ui_section_${i + 1}_container_${pid}`,
        parent: allSectionsContainer,
        x: 0,
        y: sectionY,
        width: allSectionsCtn.width,
        height: section.height,
        anchor: mod.UIAnchor.TopCenter,
        bgFill: mod.UIBgFill.None,
        depth: mod.UIDepth.AboveGameUI,
      },
      player,
    );

    // sectionTitle
    new UI.Text(
      {
        name: `fs_ui_section_${i + 1}_title_${pid}`,
        parent: sectionContainer,
        x: 0,
        y: 0,
        width: allSectionsCtn.width - allSectionsCtn.padding * 2,
        height: allSectionsCtn.titleHeight,
        anchor: mod.UIAnchor.TopLeft,
        textAnchor: mod.UIAnchor.CenterLeft,
        message: section.titleMsg,
        textSize: 22,
        textColor: UI.COLORS.WHITE,
        textAlpha: 1,
      },
      player,
    );

    // sectionTitleLine
    new UI.Container(
      {
        name: `fs_ui_section_${i + 1}_title_line_${pid}`,
        parent: sectionContainer,
        x: 0,
        y: allSectionsCtn.titleHeight + allSectionsCtn.padding / 4,
        width: allSectionsCtn.width - allSectionsCtn.padding * 2,
        height: 1,
        anchor: mod.UIAnchor.TopLeft,
        bgAlpha: 0.2,
        bgColor: UI.COLORS.WHITE,
        bgFill: mod.UIBgFill.Solid,
        depth: mod.UIDepth.AboveGameUI,
      },
      player,
    );

    // sectionContent
    new UI.Text(
      {
        name: `fs_ui_section_${i + 1}_content_${pid}`,
        parent: sectionContainer,
        x: 0,
        y: allSectionsCtn.titleHeight + allSectionsCtn.padding,
        width: allSectionsCtn.width - allSectionsCtn.padding * 2,
        height:
          section.height - allSectionsCtn.titleHeight - allSectionsCtn.padding,
        anchor: mod.UIAnchor.TopLeft,
        textAnchor: mod.UIAnchor.TopLeft,
        message: section.contentMsg,
        textSize: 18,
        textColor: UI.COLORS.WHITE,
        textAlpha: 0.5,
      },
      player,
    );

    let swingBarUI: UI.Container | null;

    if (section.title === "swing") {
      swingBarUI = InitSwingUI(player, true);

      if (swingBarUI) {
        mod.SetUIWidgetParent(swingBarUI.uiWidget, sectionContainer.uiWidget);
        swingBarUI.setAnchor(mod.UIAnchor.BottomCenter);
        swingBarUI.setPosition({ x: 0, y: 10 });
      }
    }
  }

  // likeLine
  new UI.Container(
    {
      name: `fs_ui_like_line_${pid}`,
      parent: firstSpawnContainer,
      x: firstSpawnCtn.padding * 2,
      y:
        allSectionsContainer.position.y +
        allSectionsCtn.height +
        firstSpawnCtn.padding,
      width: allSectionsCtn.width - allSectionsCtn.padding * 4,
      height: 1,
      anchor: mod.UIAnchor.TopLeft,
      bgAlpha: 0.2,
      bgColor: UI.COLORS.WHITE,
      bgFill: mod.UIBgFill.Solid,
      depth: mod.UIDepth.AboveGameUI,
    },
    player,
  );

  const likeLabel = new UI.Text(
    {
      name: `fs_ui_like_label_${pid}`,
      parent: firstSpawnContainer,
      x: firstSpawnCtn.padding * 2,
      y:
        allSectionsContainer.position.y +
        allSectionsCtn.height +
        firstSpawnCtn.padding * 2,
      width: allSectionsCtn.width - allSectionsCtn.padding * 4,
      height: 30,
      anchor: mod.UIAnchor.TopLeft,
      message: mod.Message("LIKE_EXPERIENCE" + ps.general.languageSuffix),
      textSize: 18,
      textColor: UI.COLORS.WHITE,
      textAlpha: 0.6,
    },
    player,
  );

  const enMessage =
    ps.general.selectedLanguage === "en"
      ? mod.Message("CLOSE")
      : mod.Message("ENGLISH");
  const cnMessage =
    ps.general.selectedLanguage === "cn"
      ? mod.Message("CLOSE_C")
      : mod.Message("CHINESE_C");

  const buttonCloseEnglish = new UI.Button(
    {
      name: `fs_ui_button_close_english_${pid}`,
      parent: firstSpawnContainer,
      x: -180,
      y: likeLabel.position.y + 30 + firstSpawnCtn.padding,
      width: 170,
      height: 40,
      anchor: mod.UIAnchor.TopCenter,
      bgFill: mod.UIBgFill.OutlineThin,
      bgAlpha: 0.8,
      bgColor: UI.COLORS.WHITE,
      label: {
        message: enMessage,
        textSize: 20,
        textAlpha: 1,
        textColor: UI.COLORS.WHITE,
      },
      onClick: async (btnPlayer: mod.Player) => {
        PlaySFX(sfxCloseMenu, ZERO_VEC, btnPlayer, {
          amplitude: 0.5,
        });

        const clickPs = GetValidPlayerState(btnPlayer);
        if (!clickPs) return;

        if (clickPs.general.selectedLanguage === "en") {
          DeleteFirstSpawnUI(mod.GetObjId(btnPlayer));
          mod.EnableUIInputMode(false, btnPlayer);
        } else {
          clickPs.general.selectedLanguage = "en";
          clickPs.general.languageSuffix = "";
          DeleteFirstSpawnUI(mod.GetObjId(btnPlayer));

          await mod.Wait(0.1);

          InitFirstSpawnUI(btnPlayer);

          {
            // Refresh for language
            InitFirstLayerUI(btnPlayer);

            InitGamemodeInfoUI(btnPlayer);

            InitSwingUI(btnPlayer);

            InitTeleportTransitionScreen(btnPlayer);
          }
        }
      },
    },
    player,
  );

  const buttonCloseChinese = new UI.Button(
    {
      name: `fs_ui_button_close_chinese_${pid}`,
      parent: firstSpawnContainer,
      x: 180,
      y: likeLabel.position.y + 30 + firstSpawnCtn.padding,
      width: 170,
      height: 40,
      anchor: mod.UIAnchor.TopCenter,
      bgFill: mod.UIBgFill.OutlineThin,
      bgAlpha: 0.8,
      bgColor: UI.COLORS.WHITE,
      label: {
        message: cnMessage,
        textSize: 20,
        textAlpha: 1,
        textColor: UI.COLORS.WHITE,
      },
      onClick: async (btnPlayer: mod.Player) => {
        PlaySFX(sfxCloseMenu, ZERO_VEC, btnPlayer, {
          amplitude: 0.5,
        });

        const clickPs = GetValidPlayerState(btnPlayer);
        if (!clickPs) return;

        if (clickPs.general.selectedLanguage === "cn") {
          DeleteFirstSpawnUI(mod.GetObjId(btnPlayer));
          mod.EnableUIInputMode(false, btnPlayer);
        } else {
          clickPs.general.selectedLanguage = "cn";
          clickPs.general.languageSuffix = "_C";
          DeleteFirstSpawnUI(mod.GetObjId(btnPlayer));

          await mod.Wait(0.1);

          InitFirstSpawnUI(btnPlayer);

          {
            // Refresh for language
            InitFirstLayerUI(btnPlayer);

            InitGamemodeInfoUI(btnPlayer);

            InitSwingUI(btnPlayer);

            InitTeleportTransitionScreen(btnPlayer);
          }
        }
      },
    },
    player,
  );

  const finalCtnHeight =
    buttonCloseEnglish.position.y + 40 + firstSpawnCtn.padding;

  firstSpawnContainer.setSize({
    width: firstSpawnCtn.width,
    height: finalCtnHeight,
  });

  firstSpawnOutline.setSize({
    width: firstSpawnCtn.width,
    height: finalCtnHeight,
  });
}

function DeleteFirstSpawnUI(pid: number) {
  const ps = players[pid];
  if (!ps) return;
  if (ps.ui.firstSpawnUI.root) {
    ps.ui.firstSpawnUI.root.delete();
    ps.ui.firstSpawnUI = {};
    LogEvent(1, DeleteFirstSpawnUI.name, `Deleted UI.`, {
      pid,
      main: LogOType.Player,
    });
  } else {
    LogEvent(1, DeleteFirstSpawnUI.name, `No UI to delete.`, {
      pid,
      main: LogOType.Player,
    });
  }
}

function InitFirstLayerUI(player: mod.Player) {
  const ps = GetValidPlayerState(player);
  if (!ps) return;

  const pid = mod.GetObjId(player);

  if (ps.ui.firstLayerUI.bottomBar) {
    DeleteFirstLayerUI(pid);
  }

  const bottomBlackBar = new UI.Container(
    {
      name: `bottomBlackBar_container_${pid}`,
      x: 0,
      y: 0,
      width: 4000,
      height: 200,
      bgFill: mod.UIBgFill.Blur,
      bgAlpha: 1,
      anchor: mod.UIAnchor.BottomCenter,
      depth: mod.UIDepth.AboveGameUI,
    },
    player,
  );
  ps.ui.firstLayerUI.bottomBar = bottomBlackBar;

  const currentlyPlayingLabel = new UI.Text(
    {
      name: `currentlyPlaying_label_${pid}`,
      parent: bottomBlackBar,
      message: mod.Message(""),
      x: 0,
      y: 0,
      width: 600,
      height: 200,
      textSize: 40,
      textColor: UI.COLORS.WHITE,
      textAnchor: mod.UIAnchor.Center,
      anchor: mod.UIAnchor.BottomCenter,
      depth: mod.UIDepth.AboveGameUI,
      bgFill: mod.UIBgFill.None,
      visible: false,
    },
    player,
  );
  ps.ui.firstLayerUI.currentlyPlayingLabel = currentlyPlayingLabel;
}

function DeleteFirstLayerUI(pid: number) {
  const ps = players[pid];
  if (!ps) return;
  if (ps.ui.firstLayerUI.bottomBar) {
    ps.ui.firstLayerUI.bottomBar.delete();
    ps.ui.firstLayerUI = {};

    LogEvent(1, DeleteFirstLayerUI.name, `Deleted UI.`, {
      pid,
      main: LogOType.Player,
    });
  } else {
    LogEvent(1, DeleteFirstLayerUI.name, `No UI to delete.`, {
      pid,
      main: LogOType.Player,
    });
  }
}

function InitTeleportTransitionScreen(player: mod.Player) {
  const ps = GetValidPlayerState(player);
  if (!ps) return;

  const pid = mod.GetObjId(player);

  if (ps.ui.transitionUI.root) {
    DeleteTeleportTransitionScreen(pid);
  }

  const transitionScreenUI = new UI.Container(
    {
      name: `teleport_transition_screen_ui_container_${pid}`,
      x: 0,
      y: 0,
      width: 4000,
      height: 4000,
      anchor: mod.UIAnchor.Center,
      bgAlpha: 0,
      bgColor: UI.COLORS.BLACK,
      bgFill: mod.UIBgFill.Solid,
      depth: mod.UIDepth.AboveGameUI,
      visible: false,
    },
    player,
  );

  ps.ui.transitionUI.root = transitionScreenUI;
}

function DeleteTeleportTransitionScreen(pid: number) {
  const ps = players[pid];
  if (!ps) return;
  if (ps.ui.transitionUI.root) {
    ps.ui.transitionUI.root.delete();
    ps.ui.transitionUI = {};
    LogEvent(1, DeleteTeleportTransitionScreen.name, `Deleted UI.`, {
      pid,
      main: LogOType.Player,
    });
  } else {
    LogEvent(1, DeleteTeleportTransitionScreen.name, `No UI to delete.`, {
      pid,
      main: LogOType.Player,
    });
  }
}

async function InitTurnTimer(
  player: mod.Player,
  duration: number,
): Promise<void> {
  const ps = GetValidPlayerState(player);
  if (!ps) return;

  const pid = mod.GetObjId(player);
  const notif = ps.ui.notificationUI;

  const playerGroup = GetGroupFromPlayer(player);
  if (!playerGroup) return;

  const groupInitialUniqueId = playerGroup.groupUniqueId;

  // Do NOT restart if already active
  if (notif.turnTimerActive === true) return;

  notif.turnTimerActive = true;

  void ShowNotification(
    { type: "player", id: pid },
    {
      main: mod.Message("YOUR_TURN" + ps.general.languageSuffix),
      comment: null,
    },
    NotifyPosition.Bottom,
    duration,
    {
      displayProgressBar: true,
      displayTimerAsComment: {
        enabled: true,
        messageKey: "SECONDS_TO_BALL_REMAIN" + ps.general.languageSuffix,
      },
      SFXWarningEnabled: true,
    },
  );

  const turnToken = notif.token;

  function endTurnTimer() {
    notif.turnTimerActive = false;
    notif.cancelToken = turnToken;
  }

  const durationSec = Math.ceil(Math.max(0, duration));
  const totalSteps = Math.ceil(durationSec / 0.05);

  for (let step = 0; step < totalSteps; step++) {
    if (!mod.IsPlayerValid(player)) {
      endTurnTimer();
      return;
    }

    if (GetPlayerGeneralPhase(pid) === "SWING_SETUP") {
      endTurnTimer();
      return;
    }

    await mod.Wait(0.05);
  }

  endTurnTimer();

  if (GetPlayerGeneralPhase(pid) === "IDLE") {
    const playerGroup = GetGroupFromPlayer(player);
    if (!playerGroup) return;

    if (playerGroup.groupUniqueId !== groupInitialUniqueId) {
      return;
    }

    OnPlayerFailedtoInteractWithBall(player);
  }
}

async function ShowNotification(
  receiverTarget: { type: "group" | "player"; id: number },
  message: { main: mod.Message; comment: mod.Message | null },
  position: NotifyPosition,
  duration: number = 2,
  params?: {
    displayProgressBar?: boolean;
    displayTimerAsComment?: { enabled: boolean; messageKey?: string };
    SFXWarningEnabled?: boolean;
    displayCrown?: boolean;
  },
): Promise<void> {
  const opt = {
    displayProgressBar: params?.displayProgressBar ?? false,
    displayTimerAsComment: {
      enabled: params?.displayTimerAsComment?.enabled ?? false,
      messageKey:
        params?.displayTimerAsComment?.messageKey ?? "SECONDS_REMAINING",
    },
    SFXWarningEnabled: params?.SFXWarningEnabled ?? false,
    displayCrown: params?.displayCrown ?? false,
  };

  // Resolve receiver + ui safely
  let receiver: mod.Player | mod.Team;
  let ui: PlayerUI | GroupUI;

  if (receiverTarget.type === "group") {
    const g = AllGroups[receiverTarget.id];
    if (!g) return;
    receiver = g.team;
    ui = g.ui;
  } else {
    const ps = players[receiverTarget.id];
    const p = ps?.general?.playerRef?.object;
    if (!ps || !p) return;
    if (!mod.IsPlayerValid(p)) return;
    receiver = p;
    ui = ps.ui;
  }

  // Start of ShowNotification (after resolving ui)
  const token = (ui.notificationUI.token ?? 0) + 1;
  ui.notificationUI.token = token;

  ui.notificationUI.cancelRequested = false;
  ui.notificationUI.cancelToken = undefined;

  const Run = async (): Promise<void> => {
    // Cancel check
    const IsCancelled = () =>
      ui.notificationUI.token !== token ||
      ui.notificationUI.cancelToken === token ||
      ui.notificationUI.cancelRequested === true;

    // Recreate UI each time
    if (ui.notificationUI.root) {
      DeleteNotificationUI({
        type: receiverTarget.type,
        id: receiverTarget.id,
      });
    }
    InitNotificationUI(receiverTarget);

    const root = ui.notificationUI.root;
    const label = ui.notificationUI.notifLabel;
    if (!root || !label) return;

    const rootWidth = NOTIFICATION_DEFAULT_LAYOUT.width;
    const rootHeight = NOTIFICATION_DEFAULT_LAYOUT.height;

    const runSuffix = `_t${token}`;

    const durationSec = Math.max(0, Math.ceil(duration));

    // Configure basic layout
    root.setBgColor(UICOLORS.GOLF_GREEN_DARK);
    label.setMessage(message.main);
    label.setSize({ width: rootWidth, height: rootHeight });
    label.setPosition({ x: 0, y: 0 });

    if (position === NotifyPosition.Center) {
      root.setAnchor(mod.UIAnchor.Center);
      root.setPosition({ x: 0, y: 0 });
    } else if (position === NotifyPosition.Top) {
      root.setAnchor(mod.UIAnchor.TopCenter);
      root.setPosition({ x: 0, y: 125 });
    } else {
      root.setAnchor(mod.UIAnchor.BottomCenter);
      root.setPosition({ x: 0, y: 60 });
    }

    // Fast path: no timer/progress
    if (
      !opt.displayProgressBar &&
      !opt.displayTimerAsComment.enabled &&
      !message.comment
    ) {
      root.show();
      await mod.Wait(durationSec);
      if (!IsCancelled()) root.hide();
      return;
    }

    const progressBar = ui.notificationUI.timerProgressBar;
    if (!progressBar) return;

    const warningThreshold = durationSec > 10 ? 5 : 3;

    let secondaryLabel: UI.Text | null = null;
    let crownIconName: string | null = null;

    try {
      if (opt.displayProgressBar) {
        progressBar.setBgColor(UI.COLORS.BLACK);
        progressBar.setSize({ width: rootWidth, height: rootHeight });
        progressBar.show();
      }

      if (opt.displayTimerAsComment.enabled || message.comment) {
        label.setSize({ width: rootWidth, height: rootHeight / 2 });
        label.setPosition({ x: 0, y: 10 });

        let secondaryMsg = mod.Message("");

        if (opt.displayTimerAsComment.enabled) {
          secondaryMsg = mod.Message(
            opt.displayTimerAsComment.messageKey,
            durationSec,
          );
        } else if (message.comment) {
          secondaryMsg = message.comment;
        }

        secondaryLabel = new UI.Text(
          {
            name: `notification_ui_secondary_label_${receiverTarget.type}_${receiverTarget.id}_${runSuffix}`,
            parent: root,
            x: 0,
            y: rootHeight / 2 - 5,
            width: rootWidth,
            height: rootHeight / 2,
            anchor: mod.UIAnchor.TopCenter,
            textAnchor: mod.UIAnchor.Center,
            message: secondaryMsg,
            textSize: 20,
            textColor: UI.COLORS.WHITE,
            textAlpha: 0.6,
            depth: mod.UIDepth.AboveGameUI,
          },
          receiver,
        );
      }

      if (opt.displayCrown) {
        new UI.Image(
          {
            name: `notification_ui_crown_icon_${receiverTarget.type}_${receiverTarget.id}_${runSuffix}`,
            parent: root,
            x: 0,
            y: -25,
            width: 50,
            height: 50,
            anchor: mod.UIAnchor.TopCenter,
            bgFill: mod.UIBgFill.None,
            imageType: mod.UIImageType.CrownSolid,
            imageColor: UI.COLORS.GOLD_YELLOW,
            imageAlpha: 1,
            depth: mod.UIDepth.AboveGameUI,
          },
          receiver,
        );
      }

      root.show();

      let timerWarningPlayed = false;

      for (let remaining = durationSec; remaining > 0; remaining--) {
        for (let i = 0; i < 20; i++) {
          if (IsCancelled()) return;

          const denom = durationSec <= 0 ? 1 : durationSec;
          const progress = (durationSec - remaining + i / 20) / denom;

          if (opt.displayProgressBar) {
            const rawWidth = rootWidth * (1 - progress);
            const width = Math.round(rawWidth);
            progressBar.setSize({ width, height: rootHeight });
          }

          await mod.Wait(0.05);
          if (IsCancelled()) return;
        }

        if (IsCancelled()) return;

        if (opt.displayTimerAsComment.enabled && secondaryLabel) {
          secondaryLabel.setMessage(
            mod.Message(opt.displayTimerAsComment.messageKey, remaining - 1),
          );
        }

        if (opt.SFXWarningEnabled && remaining === warningThreshold + 2) {
          if (!timerWarningPlayed) {
            PlayVO(mod.VoiceOverEvents2D.TimeLow, {
              player: receiver as mod.Player,
            });
            PlaySFX(sfxClockTickLoop, ZERO_VEC, receiver, {
              duration: remaining,
              amplitude: 0.5,
            });
            timerWarningPlayed = true;
          }
        }

        if (
          opt.SFXWarningEnabled &&
          remaining <= warningThreshold + 1 &&
          remaining > 1
        ) {
          PlaySFX(sfxClockTickOneShot, ZERO_VEC, receiver, { amplitude: 0.5 });
          root.setBgColor(UI.COLORS.BF_RED_DARK);
        }
      }
    } finally {
      // Only clean up if THIS run is still the active one
      if (ui.notificationUI.token === token) {
        if (opt.displayProgressBar) {
          progressBar.setSize({ width: 0, height: rootHeight });
          progressBar.hide();
        }

        root.hide();

        if (secondaryLabel) secondaryLabel.delete();

        if (crownIconName) {
          const w = mod.FindUIWidgetWithName(crownIconName);
          if (w) mod.DeleteUIWidget(w);
        }
      }
    }
  };

  const runPromise = Run();
  ui.notificationUI.runningPromise = runPromise;
  try {
    await runPromise;
  } finally {
    // Only clear if this run is still the one stored
    if (ui.notificationUI.runningPromise === runPromise) {
      ui.notificationUI.runningPromise = null;
    }
  }
}

async function ForceHidePlayerNotification(pid: number) {
  const ps = players[pid];
  if (!ps) return;

  ps.ui.notificationUI.cancelToken = ps.ui.notificationUI.token ?? 0;
  ps.ui.notificationUI.cancelRequested = true;

  ps.ui.notificationUI.root?.hide();

  const p = ps.ui.notificationUI.runningPromise;
  ps.ui.notificationUI.runningPromise = null;
  if (p) await p;

  DeleteNotificationUI({ type: "player", id: pid });
}

async function ForceHideGroupNotification(group: CourseGroup) {
  const gs = AllGroups[group.groupId];
  if (!gs) return;

  const receiverId = group.groupId;

  gs.ui.notificationUI.cancelToken = gs.ui.notificationUI.token ?? 0;
  gs.ui.notificationUI.cancelRequested = true;

  gs.ui.notificationUI.root?.hide();

  const p = gs.ui.notificationUI.runningPromise;
  gs.ui.notificationUI.runningPromise = null;
  if (p) await p;

  DeleteNotificationUI({ type: "group", id: receiverId });
}

function InitNotificationUI(receiverTarget: {
  type: "group" | "player";
  id: number;
}) {
  const receiverId = receiverTarget.id;

  let receiver: mod.Player | mod.Team;
  let ui: PlayerUI | GroupUI;

  if (receiverTarget.type === "group") {
    const g = AllGroups[receiverId];
    if (!g) return;
    receiver = g.team;
    ui = g.ui;
  } else {
    const ps = players[receiverId];
    if (!ps || !ps.general?.playerRef?.object) return;
    receiver = ps.general.playerRef.object!;
    if (!mod.IsPlayerValid(receiver)) return;
    ui = ps.ui;
  }

  const notifCtn = NOTIFICATION_DEFAULT_LAYOUT;

  const notifUIContainer = new UI.Container(
    {
      name: `notification_ui_container_${receiverTarget.type}_${receiverId}`,
      x: 0,
      y: 135,
      width: notifCtn.width,
      height: notifCtn.height,
      anchor: mod.UIAnchor.TopCenter,
      bgAlpha: 0.98,
      bgColor: UICOLORS.GOLF_GREEN_DARK,
      bgFill: mod.UIBgFill.Solid,
      depth: mod.UIDepth.AboveGameUI,
    },
    receiver,
  );
  notifUIContainer.hide();
  ui.notificationUI.root = notifUIContainer;

  const timerProgressBar = new UI.Container(
    {
      name: `notification_ui_timer_progressbar_${receiverTarget.type}_${receiverId}`,
      parent: notifUIContainer,
      x: 1,
      y: 0,
      width: notifCtn.width - 2,
      height: notifCtn.height,
      anchor: mod.UIAnchor.TopLeft,
      bgFill: mod.UIBgFill.Solid,
      bgColor: UI.COLORS.BLACK,
      bgAlpha: 0.3,
      depth: mod.UIDepth.AboveGameUI,
    },
    receiver,
  );
  timerProgressBar.hide();
  ui.notificationUI.timerProgressBar = timerProgressBar;

  // notifUIOutline
  new UI.Container(
    {
      name: `notification_ui_outline_${receiverTarget.type}_${receiverId}`,
      parent: notifUIContainer,
      x: 0,
      y: 0,
      width: notifCtn.width,
      height: notifCtn.height,
      anchor: mod.UIAnchor.TopLeft,
      bgAlpha: 0.6,
      bgColor: UI.COLORS.WHITE,
      bgFill: mod.UIBgFill.OutlineThin,
      depth: mod.UIDepth.AboveGameUI,
    },
    receiver,
  );

  const notifUIText = new UI.Text(
    {
      name: `notification_ui_text_${receiverTarget.type}_${receiverId}`,
      parent: notifUIContainer,
      x: 0,
      y: 0,
      width: notifCtn.width,
      height: notifCtn.height,
      anchor: mod.UIAnchor.TopCenter,
      message: mod.Message("{}", 0),
      textSize: 24,
      textColor: UI.COLORS.WHITE,
      textAlpha: 0.8,
      depth: mod.UIDepth.AboveGameUI,
    },
    receiver,
  );
  ui.notificationUI.notifLabel = notifUIText;
}

function DeleteNotificationUI(receiver: {
  type: "group" | "player";
  id: number;
}) {
  const id = receiver.id;

  let r: mod.Player | mod.Team;
  let state: PlayerUI | GroupUI;

  if (receiver.type === "group") {
    const group = AllGroups[id];
    if (!group) return;

    state = group.ui;
  } else {
    const ps = players[id];
    if (!ps || !ps.general?.playerRef?.object) return;

    r = ps.general.playerRef.object!;
    if (!mod.IsPlayerValid(r)) return;

    state = ps.ui;
  }

  if (state.notificationUI?.root) {
    state.notificationUI.root.delete();

    state.notificationUI.root = undefined;
    state.notificationUI.timerProgressBar = undefined;
    state.notificationUI.notifLabel = undefined;
    state.notificationUI.runningPromise = null;

    LogEvent(
      1,
      DeleteNotificationUI.name,
      `Deleted UI.`,
      receiver.type === "player"
        ? { pid: id, main: LogOType.Player }
        : { gid: id, main: LogOType.Group },
    );
  } else {
    LogEvent(
      1,
      DeleteNotificationUI.name,
      `No UI to delete.`,
      receiver.type === "player"
        ? { pid: id, main: LogOType.Player }
        : { gid: id, main: LogOType.Group },
    );
  }
}

function InitSwingUI(
  player: mod.Player,
  demoUI: boolean = false,
): UI.Container | null {
  const ps = GetValidPlayerState(player);
  if (!ps) return null;

  const pid = mod.GetObjId(player);
  const ui = ps.ui;

  if (ui.swingUI.root) {
    DeleteSwingUI(pid);
  }

  let demoPrefix = "";
  let scaleFactor = 1; // DO NOT CHANGE

  let leftImage: UI.Image | null = null;
  let leftText: UI.Text | null = null;
  let rightImage: UI.Image | null = null;
  let rightText: UI.Text | null = null;

  if (demoUI) {
    demoPrefix = "demo_";
    scaleFactor = 0.5;
  }

  let swingUIBlur: UI.Container | null = null;

  if (!demoUI) {
    swingUIBlur = new UI.Container(
      {
        name: `${demoPrefix}swing_ui_blur_${pid}`,
        x: 0,
        y: -10,
        width: SWING_WIDTH + 80,
        height: SWING_HEIGHT + 50,
        bgFill: mod.UIBgFill.Blur,
        bgAlpha: 1,
        anchor: mod.UIAnchor.Center,
        depth: mod.UIDepth.AboveGameUI,
      },
      player,
    );
  }

  const swingUIContainer = new UI.Container(
    {
      name: `${demoPrefix}swing_ui_container_${pid}`,
      x: SWING_UI_DEFAULT_POS.x,
      y: SWING_UI_DEFAULT_POS.y,
      width: SWING_WIDTH * scaleFactor,
      height: SWING_HEIGHT * scaleFactor,
      anchor: mod.UIAnchor.BottomCenter,
      bgAlpha: ROOT_DEFAULT_BG_ALPHA,
      bgColor: UI.COLORS.BF_GREY_3,
      bgFill: mod.UIBgFill.Solid,
      depth: mod.UIDepth.AboveGameUI,
    },
    player,
  );

  if (swingUIBlur) {
    mod.SetUIWidgetParent(swingUIBlur.uiWidget, swingUIContainer.uiWidget);
  }

  if (!demoUI) {
    ui.swingUI.root = swingUIContainer;
    ui.swingUI.root.hide();

    const swingUIContainerOutline = new UI.Container(
      {
        name: `${demoPrefix}swing_ui_container_outline_${pid}`,
        parent: swingUIContainer,
        x: 0,
        y: 0,
        width: SWING_WIDTH * scaleFactor,
        height: SWING_HEIGHT * scaleFactor,
        anchor: mod.UIAnchor.TopLeft,
        bgAlpha: 0.6,
        bgColor: UI.COLORS.WHITE,
        bgFill: mod.UIBgFill.OutlineThin,
        depth: mod.UIDepth.AboveGameUI,
      },
      player,
    );
    ui.swingUI.containerOutline = swingUIContainerOutline;
  }

  const hSpinColor = UI.COLORS.GOLD_YELLOW; //Surfaces[GetPlayerBallSurfaceType(player)].color;

  const directionBgLeft = new UI.Container(
    {
      name: `${demoPrefix}swing_ui_direction_bg_left_${pid}`,
      parent: swingUIContainer,
      x:
        SWING_LEFT_LINE_X * scaleFactor +
        (SWING_LINE_WIDTH * scaleFactor) / 2 -
        LEFT_BUFFER_WIDTH * scaleFactor,
      y: 0,
      width: LEFT_BUFFER_WIDTH * scaleFactor,
      height: SWING_HEIGHT * scaleFactor,
      anchor: mod.UIAnchor.TopLeft,
      bgAlpha: 0.05,
      bgColor: hSpinColor,
      bgFill: mod.UIBgFill.GradientRight,
    },
    player,
  );

  const directionBgRight = new UI.Container(
    {
      name: `${demoPrefix}swing_ui_direction_bg_right_${pid}`,
      parent: swingUIContainer,
      x: SWING_LEFT_LINE_X * scaleFactor + (SWING_LINE_WIDTH * scaleFactor) / 2,
      y: 0,
      width: LEFT_BUFFER_WIDTH * scaleFactor,
      height: SWING_HEIGHT * scaleFactor,
      anchor: mod.UIAnchor.TopLeft,
      bgAlpha: 0.05,
      bgColor: hSpinColor,
      bgFill: mod.UIBgFill.GradientLeft,
    },
    player,
  );

  const directionMiddleLine = new UI.Container(
    {
      name: `${demoPrefix}swing_ui_direction_mid_line_${pid}`,
      parent: swingUIContainer,
      x: SWING_LEFT_LINE_X * scaleFactor,
      y: 0,
      width: SWING_LINE_WIDTH * scaleFactor,
      height: SWING_HEIGHT * scaleFactor,
      anchor: mod.UIAnchor.TopLeft,
      bgAlpha: 1,
      bgColor: UI.COLORS.WHITE,
      bgFill: mod.UIBgFill.Solid,
    },
    player,
  );

  if (!demoUI) {
    const leftIconLayout = {
      width: 20,
      height: 20,
    };

    leftImage = new UI.Image(
      {
        name: `${demoPrefix}swing_ui_direction_center_icon_${pid}`,
        parent: swingUIContainer,
        x: SWING_LEFT_LINE_X - leftIconLayout.width / 2 + SWING_LINE_WIDTH / 2,
        y: -leftIconLayout.height,
        width: leftIconLayout.width,
        height: leftIconLayout.height,
        anchor: mod.UIAnchor.TopLeft,
        bgFill: mod.UIBgFill.None,
        imageType: mod.UIImageType.SpawnBeacon,
        imageColor: UI.COLORS.WHITE,
        imageAlpha: 1,
        depth: mod.UIDepth.AboveGameUI,
      },
      player,
    );

    leftText = new UI.Text(
      {
        name: `${demoPrefix}swing_ui_direction_center_label_${pid}`,
        parent: swingUIContainer,
        x: SWING_LEFT_LINE_X - leftIconLayout.width + SWING_LINE_WIDTH / 2,
        y: -leftIconLayout.height * 2,
        width: leftIconLayout.width * 2,
        height: 30,
        anchor: mod.UIAnchor.TopLeft,
        textAnchor: mod.UIAnchor.Center,
        message: mod.Message("ACCURACY" + ps.general.languageSuffix),
        textSize: 12,
        textColor: UI.COLORS.WHITE,
        textAlpha: 0.6,
      },
      player,
    );
  }

  if (demoUI) {
    // directionMiddleLineLeftLabel
    new UI.Text(
      {
        name: `${demoPrefix}swing_ui_direction_mid_line_left_label_${pid}`,
        parent: swingUIContainer,
        x: SWING_LEFT_LINE_X * scaleFactor - 80,
        y: -6,
        width: 70,
        height: 30,
        anchor: mod.UIAnchor.TopLeft,
        textAnchor: mod.UIAnchor.CenterRight,
        message: mod.Message("LEFT_SPIN" + ps.general.languageSuffix),
        textSize: 12,
        textColor: UI.COLORS.WHITE,
        textAlpha: 0.3,
      },
      player,
    );

    // directionMiddleLineRightLabel
    new UI.Text(
      {
        name: `${demoPrefix}swing_ui_direction_mid_line_right_label_${pid}`,
        parent: swingUIContainer,
        x: SWING_LEFT_LINE_X * scaleFactor + 10 + SWING_LINE_WIDTH / 2,
        y: -6,
        width: 70,
        height: 30,
        anchor: mod.UIAnchor.TopLeft,
        textAnchor: mod.UIAnchor.CenterLeft,
        message: mod.Message("RIGHT_SPIN" + ps.general.languageSuffix),
        textSize: 12,
        textColor: UI.COLORS.WHITE,
        textAlpha: 0.3,
      },
      player,
    );
  }

  // middleLine
  const middleLine = new UI.Container(
    {
      name: `${demoPrefix}swing_ui_mid_line_${pid}`,
      parent: swingUIContainer,
      x: SWING_MID_LINE_X * scaleFactor - (SWING_LINE_WIDTH * scaleFactor) / 2,
      y: 0,
      width: SWING_LINE_WIDTH * scaleFactor,
      height: SWING_HEIGHT * scaleFactor,
      anchor: mod.UIAnchor.TopLeft,
      bgAlpha: 1,
      bgColor: UI.COLORS.WHITE,
      bgFill: mod.UIBgFill.Solid,
    },
    player,
  );

  // powerLineBg
  const powerLineBg = new UI.Container(
    {
      name: `${demoPrefix}swing_ui_power_bg_${pid}`,
      parent: swingUIContainer,
      x: SWING_RIGHT_LINE_X * scaleFactor - RIGHT_BUFFER_WIDTH * scaleFactor,
      y: 0,
      width: RIGHT_BUFFER_WIDTH * scaleFactor,
      height: SWING_HEIGHT * scaleFactor,
      anchor: mod.UIAnchor.TopLeft,
      bgAlpha: 0.05,
      bgColor: UI.COLORS.GOLD_YELLOW,
      bgFill: mod.UIBgFill.GradientRight,
    },
    player,
  );

  // powerLine
  new UI.Container(
    {
      name: `${demoPrefix}swing_ui_power_line_${pid}`,
      parent: swingUIContainer,
      x: SWING_RIGHT_LINE_X * scaleFactor,
      y: 0,
      width: SWING_LINE_WIDTH * scaleFactor,
      height: SWING_HEIGHT * scaleFactor,
      anchor: mod.UIAnchor.TopLeft,
      bgAlpha: 1,
      bgColor: UI.COLORS.WHITE,
      bgFill: mod.UIBgFill.Solid,
    },
    player,
  );

  if (!demoUI) {
    const rightIconLayout = {
      width: 20,
      height: 20,
    };

    rightImage = new UI.Image(
      {
        name: `${demoPrefix}swing_ui_power_right_icon_${pid}`,
        parent: swingUIContainer,
        x:
          SWING_RIGHT_LINE_X - rightIconLayout.width / 2 + SWING_LINE_WIDTH / 2,
        y: -rightIconLayout.height,
        width: rightIconLayout.width,
        height: rightIconLayout.height,
        anchor: mod.UIAnchor.TopLeft,
        bgFill: mod.UIBgFill.None,
        imageType: mod.UIImageType.SpawnBeacon,
        imageColor: UI.COLORS.WHITE,
        imageAlpha: 1,
        depth: mod.UIDepth.AboveGameUI,
      },
      player,
    );

    rightText = new UI.Text(
      {
        name: `${demoPrefix}swing_ui_power_center_label_${pid}`,
        parent: swingUIContainer,
        x: SWING_RIGHT_LINE_X - rightIconLayout.width + SWING_LINE_WIDTH / 2,
        y: -rightIconLayout.height * 2,
        width: rightIconLayout.width * 2,
        height: 30,
        anchor: mod.UIAnchor.TopLeft,
        textAnchor: mod.UIAnchor.Center,
        message: mod.Message("POWER" + ps.general.languageSuffix),
        textSize: 12,
        textColor: UI.COLORS.WHITE,
        textAlpha: 0.6,
      },
      player,
    );
  }

  // powerLineLabel
  new UI.Text(
    {
      name: `${demoPrefix}swing_ui_power_line_label_${pid}`,
      parent: swingUIContainer,
      x: SWING_RIGHT_LINE_X * scaleFactor - 85,
      y: -6,
      width: 80,
      height: 30,
      anchor: mod.UIAnchor.TopLeft,
      textAnchor: mod.UIAnchor.CenterRight,
      message: mod.Message("PERFECT_SHOT" + ps.general.languageSuffix),
      textSize: 12,
      textColor: UI.COLORS.WHITE,
      textAlpha: 0.3,
    },
    player,
  );

  const horizSpinStoppedMarker = new UI.Container(
    {
      name: `${demoPrefix}swing_ui_hspin_stopped_marker_${pid}`,
      parent: swingUIContainer,
      x: SWING_LEFT_LINE_X * scaleFactor,
      y: 0,
      width: SWING_LINE_WIDTH * scaleFactor,
      height: SWING_HEIGHT * scaleFactor,
      anchor: mod.UIAnchor.TopLeft,
      bgAlpha: 0.3,
      bgColor: UI.COLORS.WHITE,
      bgFill: mod.UIBgFill.Solid,
      visible: false,
    },
    player,
  );

  const marker = new UI.Container(
    {
      name: `${demoPrefix}swing_ui_marker_${pid}`,
      parent: swingUIContainer,
      x: SWING_MID_LINE_X * scaleFactor,
      y: 0,
      width: MARKER_WIDTH * scaleFactor,
      height: SWING_HEIGHT * scaleFactor,
      anchor: mod.UIAnchor.TopLeft,
      bgAlpha: 1,
      bgColor: UI.COLORS.WHITE,
      bgFill: mod.UIBgFill.Solid,
    },
    player,
  );

  if (!demoUI) {
    ui.swingUI.directionBgLeft = directionBgLeft;
    ui.swingUI.directionBgRight = directionBgRight;
    ui.swingUI.directionMiddleLine = directionMiddleLine;
    ui.swingUI.middleLine = middleLine;
    ui.swingUI.powerLineBg = powerLineBg;
    ui.swingUI.leftImage = leftImage ?? undefined;
    ui.swingUI.leftText = leftText ?? undefined;
    ui.swingUI.rightImage = rightImage ?? undefined;
    ui.swingUI.rightText = rightText ?? undefined;

    ui.swingUI.marker = marker;
    ui.swingUI.horizSpinStoppedMarker = horizSpinStoppedMarker;
  }

  return swingUIContainer;
}

async function ResetSwingUIState(player: mod.Player) {
  const ps = GetValidPlayerState(player);
  if (!ps) return;

  const root = ps.ui.swingUI.root;
  if (!root) return;
  if (!root.visible) return;

  root.hide();
  await mod.Wait(1);
  root.setPosition({ x: SWING_UI_DEFAULT_POS.x, y: SWING_UI_DEFAULT_POS.y });
}

function DeleteSwingUI(pid: number) {
  const ps = players[pid];
  if (!ps) return;
  if (ps.ui.swingUI.root) {
    ps.ui.swingUI.root.delete();
    ps.ui.swingUI = {};
    LogEvent(1, DeleteSwingUI.name, `Deleted UI.`, {
      pid,
      main: LogOType.Player,
    });
  } else {
    LogEvent(1, DeleteSwingUI.name, `No UI to delete.`, {
      pid,
      main: LogOType.Player,
    });
  }
}

function InitGamemodeInfoUI(player: mod.Player) {
  const ps = GetValidPlayerState(player);
  if (!ps) return;

  const pid = mod.GetObjId(player);

  if (ps.ui.gamemodeInfoUI.root) {
    DeleteGamemodeInfoUI(pid);
  }

  const gameVersionDisplay = Math.round(GAMEMODE_INFO.version * 100) / 100;

  ps.ui.gamemodeInfoUI.root = new UI.Text(
    {
      name: `gamemode_info_ui_text_${mod.GetObjId(player)}`,
      x: 0,
      y: 0,
      width: 500,
      height: 20,
      anchor: mod.UIAnchor.BottomCenter,
      message: mod.Message(
        "GAMEMODE_INFO" + ps.general.languageSuffix,
        gameVersionDisplay,
      ),
      textSize: 12,
      textColor: UI.COLORS.WHITE,
      bgAlpha: 0.5,
      bgFill: mod.UIBgFill.Solid,
      bgColor: UI.COLORS.BLACK,
      textAnchor: mod.UIAnchor.Center,
    },
    player,
  );
}

function DeleteGamemodeInfoUI(pid: number) {
  const ps = players[pid];
  if (!ps) return;
  if (ps.ui.gamemodeInfoUI.root) {
    ps.ui.gamemodeInfoUI.root.delete();
    ps.ui.gamemodeInfoUI = {};
    LogEvent(1, DeleteGamemodeInfoUI.name, `Deleted UI.`, {
      pid,
      main: LogOType.Player,
    });
  } else {
    LogEvent(1, DeleteGamemodeInfoUI.name, `No UI to delete.`, {
      pid,
      main: LogOType.Player,
    });
  }
}

function InitSurfaceUI(player: mod.Player) {
  const ps = GetValidPlayerState(player);
  if (!ps) return;

  const pid = mod.GetObjId(player);
  const ui = ps.ui;

  const surfaceCtn = {
    width: 200,
    height: 120,
    padding: 20,
    surfaceGroundHeight: 15,
  };

  if (ui.surfaceUI.root) {
    ui.surfaceUI.root.delete();
    ui.surfaceUI = {};
  }

  const surfaceUIContainer = new UI.Container(
    {
      name: `surface_ui_container_${pid}`,
      x: 210,
      y: 30,
      width: surfaceCtn.width,
      height: surfaceCtn.height,
      anchor: mod.UIAnchor.BottomRight,
      bgAlpha: 0.8,
      bgColor: UI.COLORS.BF_GREY_3,
      bgFill: mod.UIBgFill.Solid,
      depth: mod.UIDepth.AboveGameUI,
      visible: false,
    },
    player,
  );
  ui.surfaceUI.root = surfaceUIContainer;

  const surfaceUIContainerOutline = new UI.Container(
    {
      name: `surface_ui_container_outline_${pid}`,
      parent: surfaceUIContainer,
      x: 0,
      y: 0,
      width: surfaceCtn.width,
      height: surfaceCtn.height,
      anchor: mod.UIAnchor.TopLeft,
      bgAlpha: 0.2,
      bgColor: UI.COLORS.WHITE,
      bgFill: mod.UIBgFill.OutlineThick,
      depth: mod.UIDepth.AboveGameUI,
    },
    player,
  );
  ui.surfaceUI.containerOutline = surfaceUIContainerOutline;

  const surfaceKeyLabel = new UI.Text(
    {
      name: `surface_ui_key_${pid}`,
      parent: surfaceUIContainer,
      x: 0,
      y: surfaceCtn.padding,
      width: surfaceCtn.width,
      height: 25,
      anchor: mod.UIAnchor.TopCenter,
      message: mod.Message(""),
      textSize: 18,
      textColor: UI.COLORS.WHITE,
      textAnchor: mod.UIAnchor.Center,
      depth: mod.UIDepth.AboveGameUI,
    },
    player,
  );
  ui.surfaceUI.surfaceKeyLabel = surfaceKeyLabel;

  const surfacePowerPenaltyLabel = new UI.Text(
    {
      name: `surface_ui_power_penalty_${pid}`,
      parent: surfaceUIContainer,
      x: 0,
      y: surfaceCtn.padding + 25,
      width: surfaceCtn.width,
      height: 20,
      anchor: mod.UIAnchor.TopCenter,
      message: mod.Message(""),
      textSize: 14,
      textColor: UI.COLORS.WHITE,
      textAnchor: mod.UIAnchor.Center,
      depth: mod.UIDepth.AboveGameUI,
    },
    player,
  );
  ui.surfaceUI.surfacePowerPenaltyLabel = surfacePowerPenaltyLabel;

  const surfaceAccuracyPenaltyLabel = new UI.Text(
    {
      name: `surface_ui_accuracy_penalty_${pid}`,
      parent: surfaceUIContainer,
      x: 0,
      y: surfaceCtn.padding + 40,
      width: surfaceCtn.width,
      height: 20,
      anchor: mod.UIAnchor.TopCenter,
      message: mod.Message(""),
      textSize: 14,
      textColor: UI.COLORS.WHITE,
      textAnchor: mod.UIAnchor.Center,
      depth: mod.UIDepth.AboveGameUI,
    },
    player,
  );
  ui.surfaceUI.surfaceAccuracyPenaltyLabel = surfaceAccuracyPenaltyLabel;

  const surfaceGround = new UI.Container(
    {
      name: `surface_ui_ground_${pid}`,
      parent: surfaceUIContainer,
      x: 0,
      y: 0,
      width: surfaceCtn.width,
      height: surfaceCtn.surfaceGroundHeight,
      anchor: mod.UIAnchor.BottomCenter,
      bgAlpha: 1,
      bgColor: UI.COLORS.WHITE,
      bgFill: mod.UIBgFill.Solid,
      depth: mod.UIDepth.AboveGameUI,
    },
    player,
  );
  ui.surfaceUI.surfaceGround = surfaceGround;

  const fairwayGrassLines = 30;
  const fairwayGrassContainers: UI.Container[] = [];

  for (let i = 0; i < fairwayGrassLines; i++) {
    const fairwayLayer = new UI.Container(
      {
        name: `surface_ui_fairway_layer_${pid}_${i}`,
        parent: surfaceUIContainer,
        x: (i / fairwayGrassLines) * surfaceCtn.width,
        y: 0,
        width: surfaceCtn.width / fairwayGrassLines / 2,
        height: surfaceCtn.surfaceGroundHeight * 1.5,
        anchor: mod.UIAnchor.BottomLeft,
        bgAlpha: 0.5,
        bgFill: mod.UIBgFill.Solid,
        bgColor: UICOLORS.GOLF_GREEN,
        depth: mod.UIDepth.AboveGameUI,
        visible: false,
      },
      player,
    );
    fairwayGrassContainers.push(fairwayLayer);
  }
  ui.surfaceUI.fairwayGrassContainers = fairwayGrassContainers;

  const roughGrassLines = 30;
  const roughGrassContainers: UI.Container[] = [];

  for (let i = 0; i < roughGrassLines; i++) {
    const h = surfaceCtn.surfaceGroundHeight * 1.5 + (i % 2 === 0 ? 5 : -2);

    const roughLayer = new UI.Container(
      {
        name: `surface_ui_rough_layer_${pid}_${i}`,
        parent: surfaceUIContainer,
        x: (i / roughGrassLines) * surfaceCtn.width,
        y: 0,
        width: surfaceCtn.width / roughGrassLines / 2,
        height: h,
        anchor: mod.UIAnchor.BottomLeft,
        bgAlpha: 0.5,
        bgFill: mod.UIBgFill.Solid,
        bgColor: UICOLORS.GOLF_GREEN,
        depth: mod.UIDepth.AboveGameUI,
        visible: false,
      },
      player,
    );
    roughGrassContainers.push(roughLayer);
  }
  ui.surfaceUI.roughGrassContainers = roughGrassContainers;
}

function ShowSurfaceUI(player: mod.Player) {
  const ps = GetValidPlayerState(player);
  if (!ps) return;

  if (!ps.ui.surfaceUI.root) InitBallHitUI(player);

  const surfaceType = GetPlayerBallSurfaceType(player);
  const surfKey = Surfaces[surfaceType].key;
  const surfColor = Surfaces[surfaceType].color;
  const surfaceHasPowerPenalty = Surfaces[surfaceType].powerPenalty > 0;
  const surfaceHasAccuracyPenalty = Surfaces[surfaceType].accuracyPenalty > 0;

  ps.ui.surfaceUI.surfaceKeyLabel?.setMessage(
    mod.Message(
      "BALL_STOPPED_" + surfKey.toUpperCase() + ps.general.languageSuffix,
    ),
  );

  let powerPenaltyMsg = mod.Message(
    "POWER_PENALTY_INACTIVE" + ps.general.languageSuffix,
  );

  if (surfaceHasPowerPenalty) {
    powerPenaltyMsg = mod.Message(
      "POWER_PENALTY_ACTIVE" + ps.general.languageSuffix,
      Surfaces[surfaceType].powerPenalty * 100,
    );
  }

  let accuracyPenaltyMsg = mod.Message(
    "ACCURACY_PENALTY_INACTIVE" + ps.general.languageSuffix,
  );

  if (surfaceHasAccuracyPenalty) {
    accuracyPenaltyMsg = mod.Message(
      "ACCURACY_PENALTY_ACTIVE" + ps.general.languageSuffix,
      Surfaces[surfaceType].accuracyPenalty * 100,
    );
  }

  ps.ui.surfaceUI.surfacePowerPenaltyLabel?.setMessage(powerPenaltyMsg);
  ps.ui.surfaceUI.surfacePowerPenaltyLabel?.setTextColor(
    surfaceHasPowerPenalty ? UI.COLORS.BF_RED_BRIGHT : UI.COLORS.WHITE,
  );

  ps.ui.surfaceUI.surfaceAccuracyPenaltyLabel?.setMessage(accuracyPenaltyMsg);
  ps.ui.surfaceUI.surfaceAccuracyPenaltyLabel?.setTextColor(
    surfaceHasAccuracyPenalty ? UI.COLORS.BF_RED_BRIGHT : UI.COLORS.WHITE,
  );

  ps.ui.surfaceUI.containerOutline?.setBgColor(surfColor);
  //ps.ui.swingUI.directionBgLeft?.setBgColor(surfColor);
  //ps.ui.swingUI.directionBgRight?.setBgColor(surfColor);
  ps.ui.surfaceUI.surfaceGround?.setBgColor(surfColor);

  const fairwayGrassContainers = ps.ui.surfaceUI.fairwayGrassContainers;
  const roughGrassContainers = ps.ui.surfaceUI.roughGrassContainers;

  if (surfaceType === SurfaceType.Fairway && fairwayGrassContainers) {
    for (const ctn of fairwayGrassContainers) {
      ctn.show();
    }
  } else if (surfaceType === SurfaceType.Rough && roughGrassContainers) {
    for (const ctn of roughGrassContainers) {
      ctn.show();
    }
  }

  ps.ui.surfaceUI.root?.show();
}

function HideSurfaceUI(player: mod.Player) {
  const ps = GetValidPlayerState(player);
  if (!ps) return;

  if (!ps.ui.surfaceUI.root) return;

  ps.ui.surfaceUI.root.hide();

  const fairwayGrassContainers = ps.ui.surfaceUI.fairwayGrassContainers;
  const roughGrassContainers = ps.ui.surfaceUI.roughGrassContainers;

  if (fairwayGrassContainers) {
    for (const ctn of fairwayGrassContainers) {
      ctn.hide();
    }
  }

  if (roughGrassContainers) {
    for (const ctn of roughGrassContainers) {
      ctn.hide();
    }
  }
}

function DeleteSurfaceUI(pid: number) {
  const ps = players[pid];
  if (!ps) return;
  if (ps.ui.surfaceUI.root) {
    ps.ui.surfaceUI.root.delete();
    ps.ui.surfaceUI = {};
    LogEvent(1, DeleteSurfaceUI.name, `Deleted UI.`, {
      pid,
      main: LogOType.Player,
    });
  } else {
    LogEvent(1, DeleteSurfaceUI.name, `No UI to delete.`, {
      pid,
      main: LogOType.Player,
    });
  }
}

async function InitBallHitUI(player: mod.Player) {
  const ps = GetValidPlayerState(player);
  if (!ps) return;

  const pid = mod.GetObjId(player);

  const hitCtn = {
    width: 600,
    height: 245,
    padding: 10,
    ctnPadding: 10,
    titleHeight: 30,
    hmBtnWidth: 170,
    hmBtnHeight: 70,
    smallBtnHeight: 40,
    smallBtnTextSize: 20,
    largeBtnHeight: 50,
    largeBtnTextSize: 20,
  };

  const parentContainer = new UI.Container(
    {
      name: `hitUI_container_${pid}`,
      x: 0,
      y: 20,
      width: hitCtn.width,
      height: hitCtn.height,
      bgFill: mod.UIBgFill.Solid,
      bgAlpha: 0.98,
      bgColor: UICOLORS.GOLF_GREEN_DARK,
      anchor: mod.UIAnchor.BottomCenter,
      depth: mod.UIDepth.AboveGameUI,
      visible: false,
    },
    player,
  );
  ps.ui.ballHitUI.root = parentContainer;

  // parentContainerOutline
  new UI.Container(
    {
      name: `hitUI_containerOutline_${pid}`,
      parent: parentContainer,
      x: 0,
      y: 0,
      width: hitCtn.width,
      height: hitCtn.height,
      bgFill: mod.UIBgFill.OutlineThin,
      bgAlpha: 0.3,
      bgColor: UI.COLORS.WHITE,
      anchor: mod.UIAnchor.TopLeft,
      depth: mod.UIDepth.AboveGameUI,
    },
    player,
  );

  const parentContainerTitle = new UI.Text(
    {
      name: `hitUI_containerTitle_${pid}`,
      parent: parentContainer,
      x: 0,
      y: hitCtn.padding,
      width: parentContainer.size.width,
      height: hitCtn.titleHeight,
      textSize: 30,
      textColor: UI.COLORS.WHITE,
      bgFill: mod.UIBgFill.None,
      anchor: mod.UIAnchor.TopCenter,
      depth: mod.UIDepth.AboveGameUI,
      message: mod.Message("HIT_UI_TITLE" + ps.general.languageSuffix),
    },
    player,
  );

  const selectClubContainer = new UI.Container(
    {
      name: `hitUI_selectClubContainer_${pid}`,
      parent: parentContainer,
      x: 0,
      y:
        parentContainerTitle.position.y +
        parentContainerTitle.size.height +
        hitCtn.padding,
      width: parentContainer.size.width,
      height: 30,
      bgFill: mod.UIBgFill.None,
      anchor: mod.UIAnchor.TopCenter,
      depth: mod.UIDepth.AboveGameUI,
    },
    player,
  );

  const clubLabel = new UI.Text(
    {
      name: `hitUI_clubLabel_${pid}`,
      parent: selectClubContainer,
      x: 0,
      y: 0,
      width: 160,
      height: 30,
      textSize: 20,
      textColor: UI.COLORS.WHITE,
      bgFill: mod.UIBgFill.OutlineThin,
      anchor: mod.UIAnchor.TopCenter,
      textAnchor: mod.UIAnchor.Center,
      depth: mod.UIDepth.AboveGameUI,
      message: mod.Message("CLUB_DR1" + ps.general.languageSuffix),
    },
    player,
  );
  ps.ui.ballHitUI.clubLabel = clubLabel;

  const leftClubButton = new UI.Button(
    {
      name: `hitUI_leftClubButton_${pid}`,
      parent: selectClubContainer,
      x: -100,
      y: 0,
      width: 40,
      height: 30,
      bgFill: mod.UIBgFill.OutlineThin,
      anchor: mod.UIAnchor.TopCenter,
      depth: mod.UIDepth.AboveGameUI,
      label: {
        message: mod.Message("<" + ps.general.languageSuffix),
        textSize: 20,
        textColor: UI.COLORS.WHITE,
        textAnchor: mod.UIAnchor.Center,
      },
      onClick: async (btnPlayer: mod.Player) => {
        SelectPlayerClub(btnPlayer, "left");
      },
    },
    player,
  );
  ps.ui.ballHitUI.clubPrevBtn = leftClubButton;

  const previousClubLabel = new UI.Text(
    {
      name: `hitUI_previousClubLabel_${pid}`,
      parent: selectClubContainer,
      x: -190,
      y: 0,
      width: 120,
      height: 30,
      bgFill: mod.UIBgFill.None,
      textColor: UI.COLORS.WHITE,
      textSize: 18,
      textAlpha: 0.1,
      anchor: mod.UIAnchor.TopCenter,
      depth: mod.UIDepth.AboveGameUI,
      textAnchor: mod.UIAnchor.CenterRight,
      message: mod.Message("CLUB_DR3" + ps.general.languageSuffix),
    },
    player,
  );
  ps.ui.ballHitUI.clubPrevLabel = previousClubLabel;

  const rightClubButton = new UI.Button(
    {
      name: `hitUI_rightClubButton_${pid}`,
      parent: selectClubContainer,
      x: 100,
      y: 0,
      width: 40,
      height: 30,
      bgFill: mod.UIBgFill.OutlineThin,
      anchor: mod.UIAnchor.TopCenter,
      depth: mod.UIDepth.AboveGameUI,
      label: {
        message: mod.Message(">" + ps.general.languageSuffix),
        textSize: 20,
        textColor: UI.COLORS.WHITE,
      },
      onClick: async (btnPlayer: mod.Player) => {
        SelectPlayerClub(btnPlayer, "right");
      },
    },
    player,
  );
  ps.ui.ballHitUI.clubNextBtn = rightClubButton;

  const nextClubLabel = new UI.Text(
    {
      name: `hitUI_nextClubLabel_${pid}`,
      parent: selectClubContainer,
      x: 190,
      y: 0,
      width: 120,
      height: 30,
      bgFill: mod.UIBgFill.None,
      textColor: UI.COLORS.WHITE,
      textSize: 18,
      textAlpha: 0.1,
      anchor: mod.UIAnchor.TopCenter,
      depth: mod.UIDepth.AboveGameUI,
      textAnchor: mod.UIAnchor.CenterLeft,
      message: mod.Message("CLUB_SW" + ps.general.languageSuffix),
    },
    player,
  );
  ps.ui.ballHitUI.clubNextLabel = nextClubLabel;

  SelectPlayerClub(player, "none");

  InitPowerUI(player);

  const hitModsContainer = new UI.Container(
    {
      name: `hitUI_hitModsContainer_${pid}`,
      parent: parentContainer,
      x: 0,
      y: selectClubContainer.position.y + 30 + hitCtn.padding,
      width: parentContainer.size.width,
      height: 70,
      bgFill: mod.UIBgFill.None,
      anchor: mod.UIAnchor.TopCenter,
      depth: mod.UIDepth.AboveGameUI,
    },
    player,
  );

  const hitModifierKeys = Object.keys(hitModifiers) as HitModifierKey[];

  for (let i = 0; i < hitModifierKeys.length; i++) {
    const key = hitModifierKeys[i];
    //const hitMod = hitModifiers[key];

    const modInventoryNumber = ps.general.inventoryModifiers[key] as number;

    const hitModContainer = new UI.Container(
      {
        name: `hitUI_hitModContainer_${i}_${pid}`,
        parent: hitModsContainer,
        x:
          -(
            (hitModifierKeys.length - 1) *
            (hitCtn.hmBtnWidth + hitCtn.ctnPadding)
          ) /
            2 +
          i * (hitCtn.hmBtnWidth + hitCtn.ctnPadding),
        y: 0,
        width: hitCtn.hmBtnWidth,
        height: hitCtn.hmBtnHeight,
        bgFill: mod.UIBgFill.GradientBottom,
        bgAlpha: modInventoryNumber > 0 ? 0.04 : 0.02,
        bgColor: UI.COLORS.WHITE,
        anchor: mod.UIAnchor.TopCenter,
        depth: mod.UIDepth.AboveGameUI,
      },
      player,
    );

    // hitModInventoryLabel
    new UI.Text(
      {
        name: `hitUI_hitModInventoryLabel_${i}_${pid}`,
        parent: hitModContainer,
        x: 0,
        y: 0,
        width: hitCtn.hmBtnWidth / 4,
        height: hitCtn.hmBtnWidth / 4,
        textSize: 18,
        textColor: UI.COLORS.WHITE,
        textAlpha: modInventoryNumber > 0 ? 1 : 0.2,
        bgFill: mod.UIBgFill.None,
        anchor: mod.UIAnchor.TopRight,
        depth: mod.UIDepth.AboveGameUI,
        textAnchor: mod.UIAnchor.Center,
        message: mod.Message("{}", modInventoryNumber),
      },
      player,
    );

    const hitModButton = new UI.Button(
      {
        name: `hitUI_hitModButton_${i}_${pid}`,
        parent: hitModContainer,
        x: 0,
        y: 0,
        width: hitCtn.hmBtnWidth,
        height: hitCtn.hmBtnHeight,
        bgFill: mod.UIBgFill.OutlineThin,
        anchor: mod.UIAnchor.TopLeft,
        depth: mod.UIDepth.AboveGameUI,
        label: {
          message: mod.Message(key + ps.general.languageSuffix),
          textSize: 16,
          textAlpha: modInventoryNumber > 0 ? 1 : 0.2,
          textColor: UI.COLORS.WHITE,
          textAnchor: mod.UIAnchor.Center,
        },
        onClick: async (btnPlayer: mod.Player) => {
          if (modInventoryNumber <= 0) {
            PlaySFX(sfxButtonDenied, ZERO_VEC, btnPlayer, {
              amplitude: 0.5,
            });

            return;
          }

          ToggleModifierForPlayer(
            btnPlayer,
            key,
            hitModButton,
            hitModContainer,
          );
        },
      },
      player,
    );
  }

  // hitConfirmButton
  const hitConfirmButton = new UI.Button(
    {
      name: `hitUI_hitConfirmButton_${pid}`,
      parent: parentContainer,
      x: 0,
      y:
        hitModsContainer.position.y +
        hitModsContainer.size.height +
        hitCtn.padding * 2,
      width: parentContainer.size.width - hitCtn.padding * 2,
      height: hitCtn.largeBtnHeight,
      bgFill: mod.UIBgFill.OutlineThin,
      anchor: mod.UIAnchor.TopCenter,
      depth: mod.UIDepth.AboveGameUI,
      label: {
        message: mod.Message("HIT_BALL_CONFIRM" + ps.general.languageSuffix),
        textSize: hitCtn.largeBtnTextSize,
        textColor: UI.COLORS.WHITE,
        textAnchor: mod.UIAnchor.Center,
      },
      disabledOnClick: false,
      onClick: async (btnPlayer: mod.Player) => {
        const btnPid = mod.GetObjId(btnPlayer);
        const pss = players[btnPid].swing;
        const psui = players[btnPid].ui.swingUI;
        const phase = GetPlayerSwingPhase(btnPid);

        if (pss.locked || !psui.root || !psui.marker) {
          return;
        }

        const playerGroup = GetGroupFromPlayer(btnPlayer);
        if (playerGroup) SpawnFlagPole(playerGroup);

        const root = psui.root;

        if (ps.general.activeModifiers.superFocus && psui.containerOutline) {
          psui.containerOutline.setBgColor(UI.COLORS.GOLD_YELLOW);
        } else if (psui.containerOutline) {
          psui.containerOutline.setBgColor(UI.COLORS.WHITE);
        }

        // Start

        pss.hitToken++;

        const club = GetPlayerCurrentClub(btnPlayer);

        if (phase === "IDLE") {
          SetPlayerGeneralPhase(pid, "SWING");
          SetBallPhase(pid, "SWING");

          root.show();

          if (club.type === ClubType.PT) {
            SetPlayerSwingPhase(btnPid, "MOVING_RIGHT");
            pss.pos = 0;

            psui.powerLineBg?.setBgAlpha(0.2);
            psui.powerLineBg?.setPosition({
              x: 0,
              y: 0,
            });
            psui.powerLineBg?.setSize({
              width: SWING_WIDTH,
              height: SWING_HEIGHT,
            });

            psui.rightText?.setTextAlpha(1);
            psui.rightImage?.setImageColor(UI.COLORS.GOLD_YELLOW);
            psui.rightText?.setTextColor(UI.COLORS.GOLD_YELLOW);

            if (psui.directionBgLeft) psui.directionBgLeft.hide();
            if (psui.directionBgRight) psui.directionBgRight.hide();
            if (psui.directionMiddleLine) psui.directionMiddleLine.hide();
            if (psui.middleLine) psui.middleLine.hide();
            if (psui.horizSpinStoppedMarker) psui.horizSpinStoppedMarker.hide();
            if (psui.leftImage) psui.leftImage.hide();
            if (psui.leftText) psui.leftText.hide();
          } else {
            SetPlayerSwingPhase(btnPid, "MOVING_LEFT_1");
            pss.pos = SWING_MID_LINE_X;

            psui.directionBgLeft?.setBgAlpha(0.2);
            psui.directionBgRight?.setBgAlpha(0.2);

            psui.powerLineBg?.setBgAlpha(0.05);
            psui.powerLineBg?.setPosition({
              x: SWING_RIGHT_LINE_X - RIGHT_BUFFER_WIDTH,
              y: 0,
            });
            psui.powerLineBg?.setSize({
              width: RIGHT_BUFFER_WIDTH,
              height: SWING_HEIGHT,
            });

            psui.rightText?.setTextAlpha(0.6);
            psui.rightImage?.setImageColor(UI.COLORS.WHITE);
            psui.rightText?.setTextColor(UI.COLORS.WHITE);

            psui.leftText?.setTextAlpha(1);
            psui.leftImage?.setImageColor(UI.COLORS.GOLD_YELLOW);
            psui.leftText?.setTextColor(UI.COLORS.GOLD_YELLOW);

            if (psui.directionBgLeft) psui.directionBgLeft.show();
            if (psui.directionBgRight) psui.directionBgRight.show();
            if (psui.directionMiddleLine) psui.directionMiddleLine.show();
            if (psui.middleLine) psui.middleLine.show();
            if (psui.horizSpinStoppedMarker) psui.horizSpinStoppedMarker.hide();
            if (psui.leftImage) psui.leftImage.show();
            if (psui.leftText) psui.leftText.show();
          }

          if (!pss.running) {
            if (club.type !== ClubType.PT) await RecallHitCam(btnPlayer);
            // fire-and-forget; async loop will manage itself per-player
            StartPlayerSwingLoop(player);
          }
        }
        // Interrupt left; immediately go right
        else if (phase === "MOVING_LEFT_1") {
          pss.leftLockedPos = pss.pos + MARKER_WIDTH / 2;

          if (psui.horizSpinStoppedMarker) {
            psui.horizSpinStoppedMarker.setPosition({
              x: pss.leftLockedPos,
              y: 0,
            });
            psui.horizSpinStoppedMarker.show();
          }

          SetPlayerSwingPhase(btnPid, "MOVING_RIGHT");

          psui.directionBgLeft?.setBgAlpha(0.05);
          psui.directionBgRight?.setBgAlpha(0.05);
          psui.powerLineBg?.setBgAlpha(0.2);

          psui.rightText?.setTextAlpha(1);
          psui.rightImage?.setImageColor(UI.COLORS.GOLD_YELLOW);
          psui.rightText?.setTextColor(UI.COLORS.GOLD_YELLOW);

          psui.leftText?.setTextAlpha(0.6);
          psui.leftImage?.setImageColor(UI.COLORS.WHITE);
          psui.leftText?.setTextColor(UI.COLORS.WHITE);

          const playerPos = GetPlayerPos(player);

          if (GetPlayerCurrentClub(player).type != ClubType.PT)
            PlaySFX(sfxSwingWoosh, playerPos, undefined, {
              is3D: true,
              amplitude: 0.5,
              delay: 0.2,
            });
        }
        // Interrupt right; finalize
        else if (phase === "MOVING_RIGHT" && club.type === ClubType.PT) {
          pss.rightLockedPos = pss.pos + MARKER_WIDTH / 2;
          SetPlayerSwingLocked(btnPid, true);
          SetPlayerSwingPhase(btnPid, "STOPPED_MID");
        } else if (
          (phase === "MOVING_RIGHT" && pss.pos > SWING_MID_LINE_X - 5) ||
          phase === "MOVING_LEFT_2"
        ) {
          pss.rightLockedPos = pss.pos + MARKER_WIDTH / 2;
          SetPlayerSwingLocked(btnPid, true);
          SetPlayerSwingPhase(btnPid, "STOPPED_MID");
        }
      },
    },
    player,
  );

  ps.ui.ballHitUI.hitConfirmButton = hitConfirmButton;

  parentContainer.show();
}

function DeleteBallHitUI(pid: number) {
  const ps = players[pid];
  if (!ps) return;
  if (ps.ui.ballHitUI.root) {
    ps.ui.ballHitUI.root.delete();
    ps.ui.ballHitUI = {};
    LogEvent(1, DeleteBallHitUI.name, `Deleted UI.`, {
      pid,
      main: LogOType.Player,
    });
  } else {
    LogEvent(1, DeleteBallHitUI.name, `No UI to delete.`, {
      pid,
      main: LogOType.Player,
    });
  }
}

function SelectPlayerClub(
  player: mod.Player,
  direction: "left" | "right" | "none",
) {
  const ps = GetValidPlayerState(player);
  if (!ps) return;

  const pid = mod.GetObjId(player);

  PlaySFX(sfxSelectClub, ZERO_VEC, player, { amplitude: 0.5 });

  const playerGroup = GetGroupFromPlayer(player);
  if (!playerGroup) return;

  const authorizedClubs = GetPlayerAuthorizedClubs(player);
  if (authorizedClubs.length === 0) return;

  let currentIndex = authorizedClubs.indexOf(GetPlayerCurrentClub(player));

  if (direction === "none") {
    currentIndex = authorizedClubs.length - 1;
    SetPlayerCurrentClub(pid, authorizedClubs[currentIndex]);
  }

  const widgets = ps.ui.ballHitUI;
  if (
    !widgets.clubLabel ||
    !widgets.clubPrevLabel ||
    !widgets.clubNextLabel ||
    !widgets.clubPrevBtn ||
    !widgets.clubNextBtn
  )
    return;

  const maxIndex = authorizedClubs.length - 1;

  let newCurrent = currentIndex;

  if (direction === "left") {
    newCurrent = Math.max(0, currentIndex - 1);
  } else if (direction === "right") {
    newCurrent = Math.min(maxIndex, currentIndex + 1);
  }

  SetPlayerCurrentClub(pid, authorizedClubs[newCurrent]);

  const prevIndex = newCurrent > 0 ? newCurrent - 1 : -1;
  const nextIndex = newCurrent < maxIndex ? newCurrent + 1 : -1;

  const key = "CLUB_" + authorizedClubs[newCurrent].key;
  widgets.clubLabel.setMessage(mod.Message(key + ps.general.languageSuffix));

  if (newCurrent === 0) {
    widgets.clubPrevLabel.setMessage(
      mod.Message("EMPTY" + ps.general.languageSuffix),
    );
    widgets.clubPrevBtn.hide();
  } else {
    const key = "CLUB_" + authorizedClubs[prevIndex].key;
    widgets.clubPrevLabel.setMessage(
      mod.Message(key + ps.general.languageSuffix),
    );
    widgets.clubPrevBtn.show();
  }

  if (newCurrent === maxIndex) {
    widgets.clubNextLabel.setMessage(
      mod.Message("EMPTY" + ps.general.languageSuffix),
    );
    widgets.clubNextBtn.hide();
  } else {
    const key = "CLUB_" + authorizedClubs[nextIndex].key;
    widgets.clubNextLabel.setMessage(
      mod.Message(key + ps.general.languageSuffix),
    );
    widgets.clubNextBtn.show();
  }
}

async function PredictedPosLoop(player: mod.Player) {
  const ps = GetValidPlayerState(player);
  if (!ps) return;

  const pid = mod.GetObjId(player);
  const playerGroup = GetGroupFromPlayer(player);

  let powerFactorLowering = true;

  InitializePredictedWorldIcon(player);
  InitializePredictedFx(player);

  const playerPos = GetPlayerPos(player);

  SetPlayerSwingRestrictions(player);

  let wasCrouching = mod.GetSoldierState(
    player,
    mod.SoldierStateBool.IsCrouching,
  );

  let firstIteration = true;
  let secondIteration = false;
  let firstIterationCrouched = wasCrouching;

  let crouchAccumulator = 0;
  const crouchInterval = 0.4;

  while (GetPlayerGeneralPhase(pid) === "SWING_SETUP") {
    //mod.EnableInputRestriction(player, mod.RestrictedInputs.Crouch, false);

    const playerFacingDir = vectorToV3(GetPlayerFacingDir(player));

    const ballPos = ps.ball.lastObjectPos
      ? ps.ball.lastObjectPos
      : vectorToV3(playerPos);

    const isCrouching = mod.GetSoldierState(
      player,
      mod.SoldierStateBool.IsCrouching,
    );

    // Detect release: crouching -> not crouching
    if (wasCrouching && !isCrouching) {
      powerFactorLowering = !powerFactorLowering;
      firstIterationCrouched = false;
    }

    if (isCrouching && !firstIterationCrouched) {
      if (crouchAccumulator >= crouchInterval) {
        crouchAccumulator = 0;

        const bounds = ps.swing.powerBoundsAndSteps;
        if (!bounds) {
          await mod.Wait(0.1);
          continue;
        }

        const { min, max } = bounds;

        let power = GetPlayerPowerFactor(pid);

        if (power >= max) {
          power = max;
          powerFactorLowering = true;
        } else if (power <= min) {
          power = min;
          powerFactorLowering = false;
        }

        power += powerFactorLowering ? -POWER_STEPS : POWER_STEPS;

        // SNAP
        power =
          MIN_POWER_FACTOR +
          Math.round((power - MIN_POWER_FACTOR) / POWER_STEPS) * POWER_STEPS;

        // CLAMP
        power = Math.max(min, Math.min(max, power));

        SetPlayerPowerFactor(pid, power);
        UpdatePowerUI(player);

        //mod.EnableInputRestriction(player, mod.RestrictedInputs.Crouch, true);
      }
    }

    if (!playerGroup) return;

    const hole = playerGroup.currentHole;

    let landingPos: V3 | null;

    if (GetPlayerCurrentClub(player).type === ClubType.PT) {
      landingPos = PredictRollFromBallPos(
        player,
        hole,
        GetPlayerPowerFactor(pid),
        playerFacingDir,
      );
    } else {
      landingPos = PredictLandingPointFlat(
        player,
        ballPos,
        GetPlayerCurrentClub(player),
        hole,
        GetPlayerPowerFactor(pid),
        0,
        playerFacingDir,
      );
    }

    SetPredictedWIandFx(player, playerGroup, ballPos, landingPos);

    if (landingPos && !firstIteration) {
      let camPos = GetPositionBehindTarget(ballPos, landingPos, 2);

      ps.swing.hitCamDefaultPos = v3(camPos.x, camPos.y + 2, camPos.z);

      camPos = PointBetweenTwoPoints(camPos, landingPos);

      const distanceToLandingPos = DistanceBetween(
        v3ToVector(ballPos),
        v3ToVector(landingPos),
        DistanceType.XZ,
        DistanceUnit.Meters,
        0,
      ).wholeWithDecimals;
      const heightRatio =
        GetHoleData(hole).teeOffSpawnDirection === "TowardsTeeOff" &&
        ps.course.onFirstShot
          ? 10
          : 20;
      const yOffset = Math.max(2.5, distanceToLandingPos / heightRatio);

      const finalCamPos = v3(camPos.x, camPos.y + yOffset, camPos.z);

      if (secondIteration) {
        // Transition camera for second iteration

        const camMoveTime = 0.5;
        secondIteration = false;

        MoveCameraToPos(
          finalCamPos,
          { trackedPos: landingPos, trackPitch: true, trackYaw: true },
          camMoveTime,
          undefined,
          false,
        );
        await mod.Wait(camMoveTime * 2);
      } else {
        MoveCameraToPos(
          finalCamPos,
          { trackedPos: landingPos, trackPitch: true, trackYaw: true },
          0,
          undefined,
          false,
        );
      }
    }

    if (firstIteration) {
      firstIteration = false;
      secondIteration = true;
    }

    firstIterationCrouched = false;

    wasCrouching = isCrouching;

    crouchAccumulator += GLOBAL_TICK_RATE;
    await mod.Wait(GLOBAL_TICK_RATE);
  }
}

function ComputePlayerPowerSettings(player: mod.Player): PowerSettings | null {
  const ps = GetValidPlayerState(player);
  if (!ps) return null;

  if (!ps.swing.powerBoundsAndSteps) {
    SetPlayerPowerBoundsAndSteps(player, ps);
  }

  const powerBoundsAndSteps = ps.swing.powerBoundsAndSteps!;
  const initialPowerFactor = ComputeInitialPowerFactor(
    player,
    ps,
    powerBoundsAndSteps,
  );

  return {
    initialPowerFactor,
    powerBoundsAndSteps,
  };
}

function ComputeInitialPowerFactor(
  player: mod.Player,
  ps: PlayerState,
  powerBounds: PowerBoundsAndSteps,
): number {
  const startingPower =
    // Removed. For PT, start at 80% to avoid having to reduce power every time
    /*GetPlayerCurrentClub(player).type === ClubType.PT
      ? // Snapped mid
        Math.min(
          powerBounds.max,
          Math.max(
            powerBounds.min,
            powerBounds.min +
              Math.round(
                ((powerBounds.max - powerBounds.min) * 0.8) / POWER_STEPS,
              ) *
                POWER_STEPS,
          ),
        )
      : // 100%*/
    powerBounds.max;

  return startingPower;
}

function SetPlayerPowerBoundsAndSteps(
  player: mod.Player,
  ps: PlayerState,
): PowerBoundsAndSteps {
  const min = MIN_POWER_FACTOR;

  let max = MAX_POWER_FACTOR;
  let cappedMax = MAX_POWER_FACTOR * hitModifiers.powerHit.effectFactor;

  const surface = GetPlayerBallSurfaceType(player);
  const surfPenalty = Surfaces[surface].powerPenalty;

  if (surfPenalty > 0) {
    max *= 1 - surfPenalty;
    cappedMax = MAX_POWER_FACTOR; // Ensure powerHit only increases up to normal 100% of club power when affected by penalty
  }

  if (ps.general.activeModifiers.powerHit) {
    max *= hitModifiers.powerHit.effectFactor;
  }

  if (max > cappedMax) max = cappedMax;

  if (max < min) max = min;

  const numberOfSteps = Math.round((max - min) / POWER_STEPS);
  const bounds = { min, max, numberOfSteps };

  ps.swing.powerBoundsAndSteps = bounds;
  return bounds;
}

function InitPowerUI(player: mod.Player) {
  const ps = GetValidPlayerState(player);
  if (!ps) return;

  const pid = mod.GetObjId(player);

  const rootCtn = {
    width: 110,
    height: 680,
  };

  const powerCtn = {
    width: 50,
    height: 600,
    padding: 10,
    ctnPadding: 10,
  };

  if (!ps.ui.powerUI.stepLineContainers) ps.ui.powerUI.stepLineContainers = [];
  if (!ps.ui.powerUI.stepLabels) ps.ui.powerUI.stepLabels = [];

  const rootContainer = new UI.Container(
    {
      name: `powerUI_root_${pid}`,
      x: 250,
      y: -20,
      width: rootCtn.width,
      height: rootCtn.height,
      bgAlpha: 1,
      bgFill: mod.UIBgFill.Blur,
      anchor: mod.UIAnchor.CenterRight,
      depth: mod.UIDepth.AboveGameUI,
      visible: false,
    },
    player,
  );
  ps.ui.powerUI.bgRoot = rootContainer;

  // rootTitle
  new UI.Text(
    {
      name: `powerUI_rootTitle_${pid}`,
      parent: rootContainer,
      x: 0,
      y: 10,
      width: rootCtn.width,
      height: 30,
      textSize: 24,
      textColor: UI.COLORS.WHITE,
      bgFill: mod.UIBgFill.None,
      anchor: mod.UIAnchor.TopCenter,
      depth: mod.UIDepth.AboveGameUI,
      message: mod.Message("POWER_UI_TITLE" + ps.general.languageSuffix),
    },
    player,
  );

  // rootSubtitle
  new UI.Text(
    {
      name: `powerUI_rootSubtitle_${pid}`,
      parent: rootContainer,
      x: 0,
      y: 38,
      width: rootCtn.width,
      height: 20,
      textSize: 12,
      textColor: UI.COLORS.WHITE,
      bgFill: mod.UIBgFill.None,
      anchor: mod.UIAnchor.TopCenter,
      depth: mod.UIDepth.AboveGameUI,
      message: mod.Message("POWER_UI_SUBTITLE" + ps.general.languageSuffix),
    },
    player,
  );

  const oobText = new UI.Text(
    {
      name: `powerUI_oobText_${pid}`,
      parent: rootContainer,
      x: 0,
      y: -80,
      width: rootCtn.width + 100,
      height: 70,
      bgFill: mod.UIBgFill.Solid,
      bgColor: UI.COLORS.BF_RED_DARK,
      bgAlpha: 0.8,
      anchor: mod.UIAnchor.TopCenter,
      depth: mod.UIDepth.AboveGameUI,
      message: mod.Message("POWER_UI_OOB_WARNING" + ps.general.languageSuffix),
      textSize: 16,
      textColor: UI.COLORS.RED,
      textAnchor: mod.UIAnchor.Center,
    },
    player,
  );
  ps.ui.powerUI.oobText = oobText;

  const oobTextOutline = new UI.Container(
    {
      name: `powerUI_oobTextOutline_${pid}`,
      parent: rootContainer,
      x: 0,
      y: -80,
      width: rootCtn.width + 100,
      height: 70,
      bgFill: mod.UIBgFill.OutlineThin,
      bgAlpha: 0.6,
      bgColor: UI.COLORS.RED,
      anchor: mod.UIAnchor.TopCenter,
      depth: mod.UIDepth.AboveGameUI,
    },
    player,
  );
  ps.ui.powerUI.oobTextOutline = oobTextOutline;

  oobText.hide();
  oobTextOutline.hide();

  const parentContainer = new UI.Container(
    {
      name: `powerUI_container_${pid}`,
      parent: rootContainer,
      x: 10,
      y: 10,
      width: powerCtn.width,
      height: powerCtn.height,
      bgFill: mod.UIBgFill.Solid,
      bgAlpha: 0.3,
      bgColor: UI.COLORS.BF_GREY_3,
      anchor: mod.UIAnchor.BottomRight,
      depth: mod.UIDepth.AboveGameUI,
    },
    player,
  );
  ps.ui.powerUI.root = parentContainer;

  const fillContainer = new UI.Container(
    {
      name: `powerUI_fill_${pid}`,
      parent: parentContainer,
      x: 0,
      y: 0,
      width: powerCtn.width,
      height: 0,
      bgFill: mod.UIBgFill.Solid,
      bgAlpha: 0.7,
      bgColor: UICOLORS.GOLF_GREEN,
      anchor: mod.UIAnchor.BottomLeft,
      depth: mod.UIDepth.AboveGameUI,
    },
    player,
  );
  ps.ui.powerUI.fillContainer = fillContainer;

  // parentContainerOutline
  new UI.Container(
    {
      name: `powerUI_containerOutline_${pid}`,
      parent: parentContainer,
      x: 0,
      y: 0,
      width: powerCtn.width,
      height: powerCtn.height,
      bgFill: mod.UIBgFill.OutlineThin,
      bgAlpha: 0.6,
      bgColor: UI.COLORS.BF_GREY_4,
      anchor: mod.UIAnchor.TopLeft,
      depth: mod.UIDepth.AboveGameUI,
    },
    player,
  );

  const powerSettings = ComputePlayerPowerSettings(player);
  if (!powerSettings) return;

  SetPlayerPowerFactor(pid, powerSettings.initialPowerFactor);

  const numberOfSteps = powerSettings.powerBoundsAndSteps.numberOfSteps;
  const maxPower = powerSettings.powerBoundsAndSteps.max;
  const minPower = powerSettings.powerBoundsAndSteps.min;

  for (let i = 0; i <= numberOfSteps; i++) {
    const value = i === numberOfSteps ? maxPower : minPower + i * POWER_STEPS;

    const stepSpacing = powerCtn.height / numberOfSteps;
    let yPos = powerCtn.height - i * stepSpacing;

    yPos -= 2;

    const stepLineContainer = new UI.Container(
      {
        name: `powerUI_stepLineContainer_${i}_${pid}`,
        parent: parentContainer,
        x: -9,
        y: yPos,
        width: powerCtn.width + 8,
        height: 3,
        bgFill: mod.UIBgFill.GradientRight,
        bgAlpha: value === GetPlayerPowerFactor(pid) ? 1 : 0.3,
        bgColor: UI.COLORS.WHITE,
        anchor: mod.UIAnchor.TopLeft,
        depth: mod.UIDepth.AboveGameUI,
      },
      player,
    );
    ps.ui.powerUI.stepLineContainers.push({
      element: stepLineContainer,
      value: value,
    });

    const stepLabel = new UI.Text(
      {
        name: `powerUI_stepLabel_${i}_${pid}`,
        parent: stepLineContainer,
        x: powerCtn.width,
        y: 0,
        width: 40,
        height: 20,
        textSize: 16,
        textColor: UI.COLORS.WHITE,
        bgFill: mod.UIBgFill.None,
        bgAlpha: 0.8,
        bgColor: UICOLORS.GOLF_GREEN_DARK,
        anchor: mod.UIAnchor.CenterRight,
        depth: mod.UIDepth.AboveGameUI,
        textAnchor: mod.UIAnchor.CenterLeft,
        textAlpha: value === GetPlayerPowerFactor(pid) ? 1 : 0.3,
        message: mod.Message(
          "POWER_VALUE_PERCENTAGE" + ps.general.languageSuffix,
          Math.round(value * 100),
        ),
      },
      player,
    );
    ps.ui.powerUI.stepLabels.push({ element: stepLabel, value: value });
  }

  rootContainer.show();

  UpdatePowerUI(player);
}

function UpdatePowerUI(player: mod.Player) {
  const ps = GetValidPlayerState(player);
  if (!ps) return;

  const pid = mod.GetObjId(player);
  const powerFactor = GetPlayerPowerFactor(pid);

  const parent = ps.ui.powerUI.root;
  const uiFill = ps.ui.powerUI.fillContainer;

  if (!parent || !uiFill || powerFactor == null || Number.isNaN(powerFactor))
    return;

  const powerBS = ps.swing.powerBoundsAndSteps;
  if (!powerBS) return;

  const { min, max } = powerBS;

  function PowerStepIndex(v: number): number {
    return Math.round((v - min) / POWER_STEPS);
  }

  const currentStep = PowerStepIndex(powerFactor);

  ps.ui.powerUI.stepLineContainers?.forEach(({ element, value }) => {
    const step = PowerStepIndex(value);
    element.setBgAlpha(step === currentStep ? 1 : 0.3);
  });

  ps.ui.powerUI.stepLabels?.forEach(({ element, value }) => {
    const step = PowerStepIndex(value);
    element.setTextAlpha(step === currentStep ? 1 : 0.3);
  });

  const barHeight = parent.size.height;
  const numberOfSteps = powerBS.numberOfSteps;

  const clampedStep = Math.max(0, Math.min(numberOfSteps, currentStep));
  const stepHeight = barHeight / numberOfSteps;
  const targetHeight = Math.round(clampedStep * stepHeight);

  uiFill.setSize({ width: uiFill.size.width, height: targetHeight });
  uiFill.setPosition({
    x: 0,
    y: 0,
  });

  parent.setVisible(true);
}

function DeletePowerUI(pid: number) {
  const psui = players[pid].ui;
  if (!psui) return;

  if (psui.powerUI.bgRoot) {
    psui.powerUI.bgRoot.delete();
    psui.powerUI = {};
    LogEvent(1, DeletePowerUI.name, `Deleted UI.`, {
      pid,
      main: LogOType.Player,
    });
  } else {
    LogEvent(1, DeletePowerUI.name, `No UI to delete.`, {
      pid,
      main: LogOType.Player,
    });
  }
}

//************************
// -/ MATCHMAKING UI
//************************

/* ============================================================
 * MATCHMAKING UI – LEAK-SAFE, DELTA-REFRESHED
 * NO LAYOUT CHANGES
 * ============================================================ */

/* ---------- TYPES ---------- */

type MatchmakingPlayerUI = {
  root: UI.Container;
  name: UI.Text;
  score: UI.Text;
};

type MatchmakingGroupUI = {
  root: UI.Container;
  title: UI.Text;
  playersContainer: UI.Container;
  players: Record<number, MatchmakingPlayerUI>;
  actionButton: UI.Button;
};

type MatchmakingButtonsUI = {
  createGroup?: UI.Button;
  ready?: UI.Button;
  startCourse?: UI.Button;
  startCourseFast?: UI.Button;
  close?: UI.Button;
};

type MatchmakingUIState = {
  parentRoot: UI.Container;
  parentRootOutline: UI.Container;
  groupsRoot: UI.Container;
  groups: Record<number, MatchmakingGroupUI>;
  buttons: MatchmakingButtonsUI;
};

/* ============================================================
 * GROUP UI
 * ============================================================ */

function AddGroupBox(
  player: mod.Player,
  parent: UI.Container,
  g: CourseGroup,
  idx: number,
  matchmakingLayout: MatchmakingUILayout,
  viewerPid: number,
): MatchmakingGroupUI {
  const gid = g.groupId;

  const root = new UI.Container(
    {
      name: `matchmakingUI_groupContainer_${gid}_${viewerPid}`,
      parent,
      x: 0,
      y:
        idx * matchmakingLayout.groupCtnHeight +
        idx * matchmakingLayout.ctnPadding,
      width: parent.size.width,
      height: matchmakingLayout.groupCtnHeight,
      bgFill: mod.UIBgFill.Solid,
      bgColor: UI.COLORS.WHITE,
      bgAlpha: 0.02,
      anchor: mod.UIAnchor.TopLeft,
      depth: mod.UIDepth.AboveGameUI,
    },
    player,
  );

  const title = new UI.Text(
    {
      name: `matchmakingUI_groupTitle_${gid}_${viewerPid}`,
      parent: root,
      x: matchmakingLayout.padding,
      y: matchmakingLayout.padding,
      width:
        root.size.width -
        matchmakingLayout.padding * 3 -
        matchmakingLayout.groupBtnWidth,
      height: 30,
      textSize: 20,
      textColor: UI.COLORS.WHITE,
      bgFill: mod.UIBgFill.None,
      anchor: mod.UIAnchor.TopLeft,
      textAnchor: mod.UIAnchor.CenterLeft,
      depth: mod.UIDepth.AboveGameUI,
      message: mod.Message(""),
    },
    player,
  );

  const playersContainer = new UI.Container(
    {
      name: `matchmakingUI_groupPlayersContainer_${gid}_${viewerPid}`,
      parent: root,
      x: matchmakingLayout.padding,
      y: title.position.y + title.size.height + matchmakingLayout.padding / 2,
      width: root.size.width - 2 * matchmakingLayout.padding,
      height: 80,
      bgFill: mod.UIBgFill.OutlineThin,
      anchor: mod.UIAnchor.TopLeft,
      depth: mod.UIDepth.AboveGameUI,
    },
    player,
  );

  const actionButton = new UI.Button(
    {
      name: `matchmakingUI_groupActionButton_${gid}_${viewerPid}`,
      parent: root,
      x: 0,
      y: 0,
      width: root.size.width,
      height: matchmakingLayout.groupCtnHeight,
      bgFill: mod.UIBgFill.OutlineThin,
      anchor: mod.UIAnchor.TopLeft,
      depth: mod.UIDepth.AboveGameUI,
      buttonEnabled: GetGroupPhase(g) === "LOBBY",
      disabledOnClick: true,
      label: {
        message: mod.Message(""),
        textSize: matchmakingLayout.largeBtnTextSize,
        textColor: UI.COLORS.WHITE,
        textAlpha: 0.8,
        textAnchor: mod.UIAnchor.BottomCenter,
        padding: 10,
      },
      onClick: async (btnPlayer: mod.Player) => {
        if (!mod.IsPlayerValid(btnPlayer)) return;

        const groupNow = AllGroups[gid];
        if (!groupNow) return;

        if (GetGroupPhase(groupNow) !== "LOBBY") return;

        const btnPid = mod.GetObjId(btnPlayer);
        const currentGroup = GetGroupFromPlayer(btnPlayer);
        const inThisGroup = currentGroup?.groupId === gid;

        if (currentGroup !== null && !inThisGroup) return;

        if (inThisGroup) {
          PlaySFX(sfxCloseMenu, ZERO_VEC, btnPlayer, { amplitude: 0.5 });
          await RemovePlayerFromGroup(btnPid, true);
        } else {
          PlaySFX(sfxOpenMenu, ZERO_VEC, btnPlayer, { amplitude: 0.5 });
          await AddPlayerToGroup(btnPlayer, gid);
        }

        RefreshAllOpenMatchmakingUIs();
      },
    },
    player,
  );

  return {
    root,
    title,
    playersContainer,
    players: {},
    actionButton,
  };
}

/* ============================================================
 * PLAYER UI
 * ============================================================ */

function AddPlayerInGroup(
  player: mod.Player,
  ui: MatchmakingGroupUI,
  p: GroupPlayer,
  idx: number,
  matchmakingLayout: MatchmakingUILayout,
  viewerPid: number,
) {
  const x = idx === 0 || idx === 1 ? 0 : ui.playersContainer.size.width / 2;
  const y = idx === 0 || idx === 2 ? 0 : ui.playersContainer.size.height / 2;

  const root = new UI.Container(
    {
      name: `matchmakingUI_groupPlayerContainer_${p.pid}_${viewerPid}`,
      parent: ui.playersContainer,
      x,
      y,
      width: ui.playersContainer.size.width / 2 - matchmakingLayout.ctnPadding,
      height:
        ui.playersContainer.size.height / 2 - matchmakingLayout.ctnPadding,
      bgFill: mod.UIBgFill.OutlineThin,
      bgAlpha: p.pid === viewerPid ? 0.1 : 0.05,
      bgColor: UI.COLORS.WHITE,
      anchor: mod.UIAnchor.TopLeft,
      depth: mod.UIDepth.AboveGameUI,
    },
    player,
  );

  const isThisPlayer = p.pid === viewerPid;

  const name = new UI.Text(
    {
      name: `matchmakingUI_groupPlayerLabel_${p.pid}_${viewerPid}`,
      parent: root,
      x: 7,
      y: 0,
      width: root.size.width - 10,
      height: root.size.height,
      textSize: 16,
      textAlpha: isThisPlayer ? 1.0 : 0.8,
      textColor: isThisPlayer ? UI.COLORS.GOLD_YELLOW : UI.COLORS.WHITE,
      bgFill: mod.UIBgFill.None,
      anchor: mod.UIAnchor.CenterLeft,
      textAnchor: mod.UIAnchor.CenterLeft,
      depth: mod.UIDepth.AboveGameUI,
      message: mod.Message("{}", p.player),
    },
    player,
  );

  const score = new UI.Text(
    {
      name: `matchmakingUI_groupPlayerScore_${p.pid}_${viewerPid}`,
      parent: root,
      x: 10,
      y: 0,
      width: 50,
      height: root.size.height,
      textSize: 16,
      textAlpha: isThisPlayer ? 1.0 : 0.8,
      textColor: isThisPlayer ? UI.COLORS.GOLD_YELLOW : UI.COLORS.WHITE,
      bgFill: mod.UIBgFill.None,
      anchor: mod.UIAnchor.CenterRight,
      textAnchor: mod.UIAnchor.CenterRight,
      depth: mod.UIDepth.AboveGameUI,
      message: mod.Message(""),
    },
    player,
  );

  ui.players[p.pid] = { root, name, score };
}

/* ============================================================
 * REFRESH (DELTA-ONLY)
 * ============================================================ */

function RefreshMatchmakingUI(player: mod.Player) {
  if (!mod.IsPlayerValid(player)) return;

  const pid = mod.GetObjId(player);
  const ps = players[pid];
  const state = ps.ui.matchmakingUI.state as MatchmakingUIState;
  if (!state) return;

  const matchmakingLayout = ps.ui.matchmakingUI.lastLayout;
  if (!matchmakingLayout) return;

  /* --- REMOVE DEAD GROUPS --- */
  for (const gidStr of Object.keys(state.groups)) {
    const gid = Number(gidStr);
    if (!AllGroups[gid]) {
      state.groups[gid].root.delete();
      delete state.groups[gid];
    }
  }

  const gids = Object.keys(AllGroups).map(Number);

  gids.forEach((gid, idx) => {
    const g = AllGroups[gid];
    let ui = state.groups[gid];

    if (!ui) {
      ui = AddGroupBox(
        player,
        state.groupsRoot,
        g,
        idx,
        matchmakingLayout,
        pid,
      );
      state.groups[gid] = ui;
    }

    ui.root.setPosition({
      x: 0,
      y:
        idx * matchmakingLayout.groupCtnHeight +
        idx * matchmakingLayout.ctnPadding,
    });

    ui.title.setMessage(
      GetGroupPhase(g) === "LOBBY"
        ? mod.Message("GROUP_ID_LOBBY" + ps.general.languageSuffix, gid)
        : mod.Message(
            "GROUP_ID_PLAYING_PIN" + ps.general.languageSuffix,
            gid,
            g.currentHole,
          ),
    );

    const playerGroup = GetGroupFromPlayer(player);
    const inAnyGroup = !!playerGroup;
    const inThisGroup = playerGroup?.groupId === gid;

    const groupInLobby = GetGroupPhase(g) === "LOBBY";

    let actionButtonMsg: mod.Message;

    if (!groupInLobby) {
      actionButtonMsg = mod.Message("-");
    } else {
      if (inThisGroup) {
        actionButtonMsg = mod.Message(
          "LEAVE_GROUP" + ps.general.languageSuffix,
        );
      } else if (inAnyGroup) {
        actionButtonMsg = mod.Message("-");
      } else {
        actionButtonMsg = mod.Message("JOIN_GROUP" + ps.general.languageSuffix);
      }
    }

    ui.actionButton.setEnabled(true);
    ui.actionButton.setLabelMessage(actionButtonMsg);

    // Remove inactive players
    for (const ppidStr of Object.keys(ui.players)) {
      const ppid = Number(ppidStr);
      if (!g.players.some((p) => p.pid === ppid)) {
        ui.players[ppid].root.delete();
        delete ui.players[ppid];
      }
    }

    // Add/update active players
    g.players.forEach((p, i) => {
      if (!ui.players[p.pid]) {
        AddPlayerInGroup(player, ui, p, i, matchmakingLayout, pid);
      }

      const entry = ui.players[p.pid];

      let msg: mod.Message;
      let alpha = 0.5;

      if (GetGroupPhase(g) === "LOBBY") {
        const ready = GetPlayerIsReady(p.pid);
        msg = ready
          ? mod.Message("LOBBY_READY" + ps.general.languageSuffix)
          : mod.Message("-");
        alpha = ready ? 1.0 : 0.5;
      } else {
        const score = GetPlayerCourseRelativeScore(p.pid);
        msg =
          score === 0
            ? mod.Message("SCORE_EVEN_PAR" + ps.general.languageSuffix)
            : score > 0
              ? mod.Message("SCORE_OVER_PAR" + ps.general.languageSuffix, score)
              : mod.Message(
                  "SCORE_UNDER_PAR" + ps.general.languageSuffix,
                  score,
                );
      }

      entry.score.setMessage(msg);
      entry.score.setTextAlpha(alpha);
    });
  });

  // Container and buttons resize/position calculations
  const groupCount = Object.keys(state.groups).length;

  const groupsHeight =
    groupCount === 0
      ? 0
      : groupCount * matchmakingLayout.groupCtnHeight +
        (groupCount - 1) * matchmakingLayout.ctnPadding;

  // Compute container height before adding buttons
  let cursorY =
    matchmakingLayout.padding +
    matchmakingLayout.groupsCtnY +
    matchmakingLayout.padding +
    groupsHeight +
    matchmakingLayout.padding;

  const buttons = state.buttons;
  const playerGroup = GetGroupFromPlayer(player);

  const activeButtonTextAlpha = 0.8;
  const inactiveButtonTextAlpha = 0.1;

  // Position and set buttons state
  if (buttons.createGroup) {
    const visible = !playerGroup && GROUP_MODE === "Dynamic";
    buttons.createGroup.setLabelTextAlpha(activeButtonTextAlpha);
    buttons.createGroup.setVisible(visible);
    buttons.createGroup.setEnabled(visible);
  }

  if (buttons.ready) {
    const visible = !!playerGroup;
    buttons.ready.setLabelTextAlpha(activeButtonTextAlpha);
    buttons.ready.setVisible(visible);
    buttons.ready.setEnabled(visible);
    buttons.ready.setLabelMessage(
      GetPlayerIsReady(pid)
        ? mod.Message("TOGGLE_NOT_READY" + ps.general.languageSuffix)
        : mod.Message("TOGGLE_READY" + ps.general.languageSuffix),
    );
  }

  if (buttons.startCourse) {
    const enabled = playerGroup ? AllPlayersInGroupReady(playerGroup) : false;
    buttons.startCourse.setVisible(!!playerGroup);
    buttons.startCourse.setLabelTextAlpha(
      enabled ? activeButtonTextAlpha : inactiveButtonTextAlpha,
    );
    buttons.startCourse.setEnabled(enabled);
  }

  if (buttons.startCourseFast) {
    const enabled = playerGroup ? AllPlayersInGroupReady(playerGroup) : false;
    buttons.startCourseFast.setVisible(!!playerGroup);
    buttons.startCourseFast.setLabelTextAlpha(
      enabled ? activeButtonTextAlpha : inactiveButtonTextAlpha,
    );
    buttons.startCourseFast.setEnabled(enabled);
  }

  if (buttons.close) {
    buttons.close.setLabelTextAlpha(activeButtonTextAlpha);
  }

  function placeButton(btn?: UI.Button) {
    if (!btn || !btn.visible) return;

    btn.setPosition({ x: 0, y: cursorY });
    cursorY += matchmakingLayout!.smallBtnHeight;
    cursorY += matchmakingLayout!.padding;
  }

  placeButton(buttons.createGroup);
  placeButton(buttons.ready);
  placeButton(buttons.startCourse);
  placeButton(buttons.startCourseFast);
  placeButton(buttons.close);

  // resize groups root
  state.groupsRoot.setSize({
    width: state.groupsRoot.size.width,
    height: groupsHeight,
  });

  // resize parent container
  state.parentRoot.setSize({
    width: matchmakingLayout.width,
    height: cursorY,
  });

  // resize parent container
  state.parentRootOutline.setSize({
    width: matchmakingLayout.width,
    height: cursorY,
  });

  if (!state.parentRoot.visible) {
    state.parentRoot.show();
  }
}

function RefreshAllOpenMatchmakingUIs() {
  for (const pidStr of Object.keys(players)) {
    const pid = Number(pidStr);
    const ps = players[pid];
    if (!ps) continue;

    const playerObj = ps.general.playerRef.object;

    if (
      ps.ui.matchmakingUI.opened &&
      ps.ui.matchmakingUI.state &&
      playerObj &&
      mod.IsPlayerValid(playerObj)
    ) {
      RefreshMatchmakingUI(playerObj);
    }
  }
}

/* ============================================================
 * SETUP
 * ============================================================ */

async function SetupMatchmakingUI(player: mod.Player, refreshOnly = false) {
  const ps = GetValidPlayerState(player);
  if (!ps) return;

  const pid = mod.GetObjId(player);

  if (!refreshOnly) {
    ps.ui.matchmakingUI.opened = true;
    mod.EnableUIInputMode(true, player);
    DeleteMatchmakingUI({ id: pid }, true);
  }

  if (refreshOnly && ps.ui.matchmakingUI.state) {
    RefreshMatchmakingUI(player);
    return;
  }

  const matchmakingLayout = MATCHMAKING_DEFAULT_LAYOUT;
  ps.ui.matchmakingUI.lastLayout = matchmakingLayout;

  const parentContainer = new UI.Container(
    {
      name: `matchmakingUI_container_${pid}`,
      x: 0,
      y: 0,
      width: matchmakingLayout.width,
      height: matchmakingLayout.height,
      bgFill: mod.UIBgFill.Solid,
      bgAlpha: 0.98,
      bgColor: UICOLORS.GOLF_GREEN_DARK,
      anchor: mod.UIAnchor.Center,
      depth: mod.UIDepth.AboveGameUI,
      visible: false,
    },
    player,
  );

  const parentContainerOutline = new UI.Container(
    {
      name: `matchmakingUI_containerBgOutline_${pid}`,
      parent: parentContainer,
      x: 0,
      y: 0,
      width: matchmakingLayout.width,
      height: matchmakingLayout.height,
      bgFill: mod.UIBgFill.OutlineThin,
      bgAlpha: 0.6,
      bgColor: UI.COLORS.WHITE,
      anchor: mod.UIAnchor.TopLeft,
      depth: mod.UIDepth.AboveGameUI,
    },
    player,
  );

  new UI.Container(
    {
      name: `matchmakingUI_containerOutline_${pid}`,
      parent: parentContainer,
      x: 0,
      y: 0,
      width: matchmakingLayout.width,
      height: matchmakingLayout.height,
      bgFill: mod.UIBgFill.OutlineThin,
      bgAlpha: 0.3,
      bgColor: UI.COLORS.WHITE,
      anchor: mod.UIAnchor.TopLeft,
      depth: mod.UIDepth.AboveGameUI,
    },
    player,
  );

  new UI.Text(
    {
      name: `matchmakingUI_containerTitle_${pid}`,
      parent: parentContainer,
      x: 0,
      y: matchmakingLayout.padding,
      width: parentContainer.size.width,
      height: matchmakingLayout.groupsCtnY,
      textSize: 30,
      textColor: UI.COLORS.WHITE,
      bgFill: mod.UIBgFill.None,
      anchor: mod.UIAnchor.TopCenter,
      depth: mod.UIDepth.AboveGameUI,
      message: mod.Message("MATCHMAKING" + ps.general.languageSuffix),
    },
    player,
  );

  const groupsRoot = new UI.Container(
    {
      name: `matchmakingUI_allGroupsContainer_${pid}`,
      parent: parentContainer,
      x: matchmakingLayout.padding,
      y:
        matchmakingLayout.padding +
        matchmakingLayout.groupsCtnY +
        matchmakingLayout.padding,
      width: parentContainer.size.width - 2 * matchmakingLayout.padding,
      height: 0,
      bgFill: mod.UIBgFill.None,
      anchor: mod.UIAnchor.TopLeft,
      depth: mod.UIDepth.AboveGameUI,
    },
    player,
  );

  ps.ui.matchmakingUI.state = {
    parentRoot: parentContainer,
    parentRootOutline: parentContainerOutline,
    groupsRoot,
    groups: {},
    buttons: {},
  };

  ps.ui.matchmakingUI.opened = true;

  AddMatchmakingButtons(
    player,
    ps.ui.matchmakingUI.state,
    matchmakingLayout,
    pid,
  );

  RefreshMatchmakingUI(player);
  RefreshLoopMatchmakingUI(player);
}

function AddMatchmakingButtons(
  player: mod.Player,
  state: MatchmakingUIState,
  layout: MatchmakingUILayout,
  pid: number,
) {
  const root = state.parentRoot;
  const ps = GetValidPlayerState(player);
  if (!ps) return;

  /* --------------------------------
   * CREATE GROUP
   * -------------------------------- */

  state.buttons.createGroup = new UI.Button(
    {
      name: `matchmakingUI_createGroupButton_${pid}`,
      parent: root,
      x: 0,
      y: 0, // positioned during refresh
      width: root.size.width - 2 * layout.padding,
      height: layout.smallBtnHeight,
      bgFill: mod.UIBgFill.OutlineThin,
      anchor: mod.UIAnchor.TopCenter,
      depth: mod.UIDepth.AboveGameUI,
      label: {
        message: mod.Message("CREATE_GROUP" + ps.general.languageSuffix),
        textSize: layout.smallBtnTextSize,
        textColor: UI.COLORS.WHITE,
      },
      onClick: async (btnPlayer: mod.Player) => {
        if (!mod.IsPlayerValid(btnPlayer)) return;

        if (Object.keys(AllGroups).length >= MAX_GROUPS) {
          return;
        }

        PlaySFX(sfxOpenMenu, ZERO_VEC, btnPlayer, { amplitude: 0.5 });

        if (GetGroupFromPlayer(btnPlayer) !== null) {
          RefreshMatchmakingUI(btnPlayer);
          return;
        }

        await AddPlayerToGroup(btnPlayer);

        RefreshAllOpenMatchmakingUIs();
      },
    },
    player,
  );

  /* --------------------------------
   * READY
   * -------------------------------- */

  state.buttons.ready = new UI.Button(
    {
      name: `matchmakingUI_readyButton_${pid}`,
      parent: root,
      x: 0,
      y: 0,
      width: root.size.width - 2 * layout.padding,
      height: layout.smallBtnHeight,
      bgFill: mod.UIBgFill.OutlineThin,
      anchor: mod.UIAnchor.TopCenter,
      depth: mod.UIDepth.AboveGameUI,
      label: {
        message: mod.Message(""),
        textSize: layout.smallBtnTextSize,
        textColor: UI.COLORS.WHITE,
      },
      onClick: async (btnPlayer: mod.Player) => {
        if (!mod.IsPlayerValid(btnPlayer)) return;

        const btnPid = mod.GetObjId(btnPlayer);

        if (GetPlayerIsReady(btnPid)) {
          PlaySFX(sfxUnready, ZERO_VEC, btnPlayer, { amplitude: 0.5 });
          SetPlayerIsReady(btnPid, false);
        } else {
          PlaySFX(sfxReady, ZERO_VEC, btnPlayer, { amplitude: 0.5 });
          SetPlayerIsReady(btnPid, true);
        }

        RefreshAllOpenMatchmakingUIs();

        const group = GetGroupFromPlayer(btnPlayer);
        if (group) {
          for (const p of group.players) {
            if (!mod.IsPlayerValid(p.player)) continue;
            SetupGroupPlayersUI(group, p.player);
          }
        }
      },
    },
    player,
  );

  /* --------------------------------
   * START COURSE
   * -------------------------------- */

  state.buttons.startCourse = new UI.Button(
    {
      name: `matchmakingUI_startCourseButton_${pid}`,
      parent: root,
      x: 0,
      y: 0,
      width: root.size.width - 2 * layout.padding,
      height: layout.smallBtnHeight,
      bgFill: mod.UIBgFill.OutlineThin,
      anchor: mod.UIAnchor.TopCenter,
      depth: mod.UIDepth.AboveGameUI,
      label: {
        message: mod.Message("START_COURSE" + ps.general.languageSuffix),
        textSize: layout.smallBtnTextSize,
        textColor: UI.COLORS.WHITE,
      },
      onClick: async (btnPlayer: mod.Player) => {
        if (!mod.IsPlayerValid(btnPlayer)) return;

        mod.EnableUIInputMode(false, btnPlayer);

        const group = GetGroupFromPlayer(btnPlayer);

        if (!group || group.phase !== "LOBBY") return;

        LogEvent(
          1,
          AddMatchmakingButtons.name,
          `startCourseButton: Starting course for Group ${
            group.groupId
          }; actioned by Player ${mod.GetObjId(btnPlayer)}.`,
          {
            gid: group.groupId,
            pid: mod.GetObjId(btnPlayer),
            main: LogOType.Group,
          },
          true,
        );

        SetGroupPhase(group, "LOADING_HOLE");
        SetGroupCourseMode(group, "NORMAL");

        StartCourseButtonSafety();

        if (!group || !AllPlayersInGroupReady(group)) {
          RefreshMatchmakingUI(btnPlayer);
          SetGroupPhase(group, "LOBBY");

          LogEvent(
            1,
            AddMatchmakingButtons.name,
            `Course start canceled. Not all players in Group are ready.`,
            {
              gid: group.groupId,
              pid: mod.GetObjId(btnPlayer),
              main: LogOType.Group,
            },
            true,
          );

          return;
        }

        for (const p of group.players) {
          if (!mod.IsPlayerValid(p.player)) {
            RemovePlayerFromGroup(p.pid);
          } else {
            DeleteMatchmakingUI({ object: p.player }, true);
          }
        }

        await mod.Wait(0.5);

        InitializeGroupCourse(group);
      },
    },
    player,
  );

  state.buttons.startCourseFast = new UI.Button(
    {
      name: `matchmakingUI_startCourseFastButton_${pid}`,
      parent: root,
      x: 0,
      y: 0,
      width: root.size.width - 2 * layout.padding,
      height: layout.smallBtnHeight,
      bgFill: mod.UIBgFill.OutlineThin,
      anchor: mod.UIAnchor.TopCenter,
      depth: mod.UIDepth.AboveGameUI,
      label: {
        message: mod.Message("START_COURSE_FAST" + ps.general.languageSuffix),
        textSize: layout.smallBtnTextSize,
        textColor: UI.COLORS.WHITE,
      },
      onClick: async (btnPlayer: mod.Player) => {
        if (!mod.IsPlayerValid(btnPlayer)) return;

        mod.EnableUIInputMode(false, btnPlayer);

        const group = GetGroupFromPlayer(btnPlayer);

        if (!group || group.phase !== "LOBBY") return;

        LogEvent(
          1,
          AddMatchmakingButtons.name,
          `startCourseButton: Starting course for Group ${
            group.groupId
          }; actioned by Player ${mod.GetObjId(btnPlayer)}.`,
          {
            gid: group.groupId,
            pid: mod.GetObjId(btnPlayer),
            main: LogOType.Group,
          },
          true,
        );

        SetGroupPhase(group, "LOADING_HOLE");
        SetGroupCourseMode(group, "FAST");

        StartCourseButtonSafety();

        if (!group || !AllPlayersInGroupReady(group)) {
          RefreshMatchmakingUI(btnPlayer);
          SetGroupPhase(group, "LOBBY");

          LogEvent(
            1,
            AddMatchmakingButtons.name,
            `Course start canceled. Not all players in Group are ready.`,
            {
              gid: group.groupId,
              pid: mod.GetObjId(btnPlayer),
              main: LogOType.Group,
            },
            true,
          );

          return;
        }

        for (const p of group.players) {
          if (!mod.IsPlayerValid(p.player)) {
            RemovePlayerFromGroup(p.pid);
          } else {
            DeleteMatchmakingUI({ object: p.player }, true);
          }
        }

        await mod.Wait(0.5);

        InitializeGroupCourse(group);
      },
    },
    player,
  );

  async function StartCourseButtonSafety() {
    state.buttons.startCourse?.setEnabled(false);
    state.buttons.startCourseFast?.setEnabled(false);
    await mod.Wait(1);
    state.buttons.startCourseFast?.setEnabled(true);
    state.buttons.startCourse?.setEnabled(true);
  }

  /* --------------------------------
   * CLOSE
   * -------------------------------- */

  state.buttons.close = new UI.Button(
    {
      name: `matchmakingUI_closeButton_${pid}`,
      parent: root,
      x: 0,
      y: 0,
      width: root.size.width - 2 * layout.padding,
      height: layout.smallBtnHeight,
      bgFill: mod.UIBgFill.OutlineThin,
      anchor: mod.UIAnchor.TopCenter,
      depth: mod.UIDepth.AboveGameUI,
      label: {
        message: mod.Message("CLOSE" + ps.general.languageSuffix),
        textSize: layout.smallBtnTextSize,
        textColor: UI.COLORS.WHITE,
      },
      onClick: async (btnPlayer: mod.Player) => {
        if (!mod.IsPlayerValid(btnPlayer)) return;

        PlaySFX(sfxCloseMenu, ZERO_VEC, btnPlayer, { amplitude: 0.5 });

        DeleteMatchmakingUI({ object: btnPlayer }, false);
      },
    },
    player,
  );
}

/* ============================================================
 * REFRESH LOOP
 * ============================================================ */

async function RefreshLoopMatchmakingUI(player: mod.Player) {
  if (!mod.IsPlayerValid(player)) return;

  const pid = mod.GetObjId(player);
  const ps = GetValidPlayerState(player);
  if (!ps) return;

  while (players[pid]?.ui.matchmakingUI.opened) {
    for (let i = 0; i < 20; i++) {
      await mod.Wait(0.5);
      if (ps && !ps.ui.matchmakingUI.opened) return;
    }
    RefreshMatchmakingUI(player);
  }
}

/* ============================================================
 * DELETE
 * ============================================================ */

function DeleteMatchmakingUI(player: PlayerRef, silent = false) {
  // Silent means the UI input mode won't be disabled

  if (player.object && !mod.IsPlayerValid(player.object)) return;

  let pid: number;

  if (!player.id && player.object) {
    pid = mod.GetObjId(player.object);
  } else if (player.id) {
    pid = player.id;
  } else {
    return;
  }

  const ps = players[pid];
  if (!ps) return;

  ps.ui.matchmakingUI.opened = false;

  const state = ps.ui.matchmakingUI.state as MatchmakingUIState | undefined;

  if (state?.parentRoot) {
    state.parentRoot.delete();
    LogEvent(1, DeleteMatchmakingUI.name, `Deleted UI.`, {
      pid,
      main: LogOType.Player,
    });
  } else {
    LogEvent(1, DeleteMatchmakingUI.name, `No UI to delete.`, {
      pid,
      main: LogOType.Player,
    });
  }

  ps.ui.matchmakingUI.state = undefined;

  if (!silent && player.object) {
    mod.EnableUIInputMode(false, player.object);
  }
}

//************************
// -/ GROUP SCOREBOARD UI
//************************

type ScoreRow = {
  pid: number;
  playerObject: mod.Player;
  scorePerHole: number[]; // length 9
};

function BuildScoreRows(group: CourseGroup): ScoreRow[] {
  const rows: ScoreRow[] = [];

  for (const p of group.players) {
    const ps = GetValidPlayerState(p.player);
    if (!ps) continue;

    rows.push({
      pid: p.pid,
      playerObject: p.player,
      scorePerHole: [...ps.course.strokesPerHole],
    });
  }

  return rows;
}

function UpdateGameScoreboardForPlayer(player: mod.Player) {
  if (!mod.IsPlayerValid(player)) return;

  const pid = mod.GetObjId(player);
  const group = GetGroupFromPlayer(player);
  const totalStrokes = GetPlayerTotalCourseStrokes(
    pid,
    ScoreUpdateType.MidHole,
  );
  const wins = GetPlayerWins(player);

  let groupNumber = 0;
  let currentHole = 0;

  if (group != null) {
    groupNumber = group.groupId;
    currentHole = group.currentHole;
  }

  mod.SetScoreboardPlayerValues(
    player,
    groupNumber,
    currentHole,
    totalStrokes,
    COURSE_TOTAL_PAR,
    wins,
  );
}

function InitScoreboardUI(group: CourseGroup) {
  if (!group) return;

  const gid = group.groupId;
  const team = AllGroups[gid].team;

  const rows = BuildScoreRows(group);
  const pars = GetParsPerHole();
  const sortedRows = SortPlayersByScore(rows);

  if (!team) {
    LogError(InitScoreboardUI.name, `No valid team found for group ${gid}`, 8);
    return;
  }

  const SB = {
    x: 0,
    y: 0,
    width: 1100,
    height: 420,
    pad: 16,

    headerH: 42,
    rowH: 52,

    crownW: 25,
    nameW: 240,
    cellW: 70, // each hole column width
    totalW: 90,

    gridBgAlpha: 0.3,
    bgAlpha: 0.85,
  };

  const size = ComputeScoreboardSize(SB, sortedRows.length);

  // Clean previous if it exists
  const prev = AllGroups[gid].ui.groupScoreboardUI.root;
  if (prev) {
    prev.delete();
    AllGroups[gid].ui.groupScoreboardUI = {};
  }

  // Root
  const root = new UI.Container(
    {
      name: `sb_root_${gid}`,
      x: SB.x,
      y: SB.y,
      width: size.width,
      height: size.height,
      anchor: mod.UIAnchor.Center,
      bgFill: mod.UIBgFill.Solid,
      bgColor: UICOLORS.GOLF_GREEN_DARK,
      bgAlpha: SB.bgAlpha,
      depth: mod.UIDepth.AboveGameUI,
    },
    team,
  );

  AllGroups[gid].ui.groupScoreboardUI.root = root;

  // rootOutline
  new UI.Container(
    {
      name: `sb_root_outline_${gid}`,
      parent: root,
      x: 0,
      y: 0,
      width: size.width,
      height: size.height,
      anchor: mod.UIAnchor.Center,
      bgFill: mod.UIBgFill.OutlineThin,
      bgColor: UI.COLORS.WHITE,
      bgAlpha: 0.3,
      depth: mod.UIDepth.AboveGameUI,
    },
    team,
  );

  const cells: UI.Text[] = [];

  // Helpers
  const colX = (col: number) => {
    // col: -1 = crown, 0 = name, 1..9 = hole columns, 10 = total
    if (col === -1) return SB.pad;
    if (col === 0) return SB.pad + SB.crownW;
    if (col >= 1 && col <= 9)
      return SB.pad + SB.crownW + SB.nameW + (col - 1) * SB.cellW;
    // total
    return SB.pad + SB.crownW + SB.nameW + 9 * SB.cellW;
  };

  const colW = (col: number) => {
    if (col === -1) return SB.crownW;
    if (col === 0) return SB.nameW;
    if (col >= 1 && col <= 9) return SB.cellW;
    return SB.totalW;
  };

  const rowY = (row: number) => {
    // row: 0 = header, 1 = par row, 2.. = player rows
    if (row === 0) return SB.pad;
    return SB.pad + SB.headerH + (row - 1) * SB.rowH;
  };

  function ComputeScoreboardSize(
    SB: {
      pad: number;
      crownW: number;
      nameW: number;
      cellW: number;
      totalW: number;
      headerH: number;
      rowH: number;
    },
    numPlayers: number,
    numHoles: number = 9,
  ): { width: number; height: number } {
    const width =
      SB.pad * 2 + SB.crownW + SB.nameW + numHoles * SB.cellW + SB.totalW;

    const height = SB.pad * 2 + SB.headerH + (1 + numPlayers) * SB.rowH; // par + players

    return { width, height };
  }

  function AddCell(
    parent: UI.Container,
    id: string,
    x: number,
    y: number,
    w: number,
    h: number,
    msg: mod.Message,
    crownParams: { cellIsCrown: boolean; enabled: boolean },
    opts?: Partial<ConstructorParameters<typeof UI.Text>[0]>,
    bgColor?: mod.Vector,
  ) {
    if (crownParams.cellIsCrown) {
      new UI.Image(
        {
          name: `${id}_crown`,
          parent: parent,
          x,
          y,
          width: SB.crownW,
          height: SB.rowH,
          anchor: mod.UIAnchor.TopLeft,
          bgFill: mod.UIBgFill.None,
          imageType: mod.UIImageType.CrownOutline,
          imageColor: UI.COLORS.GOLD_YELLOW,
          imageAlpha: 0.9,
          depth: mod.UIDepth.AboveGameUI,
          visible: crownParams.enabled,
        },
        team,
      );
      return;
    }

    // optional grid cell background
    if (bgColor) {
      new UI.Container(
        {
          name: `${id}_bg`,
          parent,
          x,
          y,
          width: w,
          height: h,
          bgFill: mod.UIBgFill.Solid,
          bgColor: bgColor,
          bgAlpha: SB.gridBgAlpha,
          anchor: mod.UIAnchor.TopLeft,
          depth: mod.UIDepth.AboveGameUI,
        },
        team,
      );
    }

    const t = new UI.Text(
      {
        name: `${id}_text`,
        parent,
        x,
        y,
        width: w,
        height: h,
        anchor: mod.UIAnchor.TopLeft,
        depth: mod.UIDepth.AboveGameUI,
        bgFill: mod.UIBgFill.None,
        textAnchor: mod.UIAnchor.Center,
        textColor: UI.COLORS.WHITE,
        textSize: 18,
        textAlpha: 1.0,
        message: msg,
        ...(opts ?? {}),
      },
      team,
    );

    cells.push(t);
    return t;
  }

  // --- Header row ---
  AddCell(
    root,
    `sb_hdr_name_${gid}`,
    colX(0),
    rowY(0),
    colW(0),
    SB.headerH,
    mod.Message(
      "SCOREBOARD_PIN_KEY" + (GetGroupLanguage(group) === "cn" ? "_C" : ""),
    ),
    { cellIsCrown: false, enabled: false },
    { textAnchor: mod.UIAnchor.CenterLeft, x: colX(0) + 10 },
  );

  for (let h = 1; h <= 9; h++) {
    AddCell(
      root,
      `sb_hdr_h${h}_${gid}`,
      colX(h),
      rowY(0),
      colW(h),
      SB.headerH,
      mod.Message("{}", h),
      { cellIsCrown: false, enabled: false },
      {},
    );
  }

  AddCell(
    root,
    `sb_hdr_total_${gid}`,
    colX(10),
    rowY(0),
    colW(10),
    SB.headerH,
    mod.Message(
      "SCOREBOARD_TOTAL_KEY" + (GetGroupLanguage(group) === "cn" ? "_C" : ""),
    ),
    { cellIsCrown: false, enabled: false },
  );

  // --- Par row (row 1) ---
  AddCell(
    root,
    `sb_par_label_${gid}`,
    colX(0),
    rowY(1),
    colW(0),
    SB.rowH,
    mod.Message(
      "SCOREBOARD_PAR_KEY" + (GetGroupLanguage(group) === "cn" ? "_C" : ""),
    ),
    { cellIsCrown: false, enabled: false },
    { textAnchor: mod.UIAnchor.CenterLeft, x: colX(0) + 10 },
    UI.COLORS.BLACK,
  );

  const parTotal = pars.reduce((s, v) => s + v, 0);

  for (let i = 0; i < 9; i++) {
    const par = pars[i] ?? 0;
    const parMsg =
      par > 0
        ? mod.Message("{}", par)
        : mod.Message("WIP" + (GetGroupLanguage(group) === "cn" ? "_C" : ""));
    AddCell(
      root,
      `sb_par_${i + 1}_${gid}`,
      colX(i + 1),
      rowY(1),
      colW(i + 1),
      SB.rowH,
      parMsg,
      { cellIsCrown: false, enabled: false },
      { textColor: UI.COLORS.GOLD_YELLOW },
      UI.COLORS.BLACK,
    );
  }

  AddCell(
    root,
    `sb_par_total_${gid}`,
    colX(10),
    rowY(1),
    colW(10),
    SB.rowH,
    mod.Message("{}", parTotal),
    { cellIsCrown: false, enabled: false },
    { textColor: UI.COLORS.GOLD_YELLOW },
    UI.COLORS.BLACK,
  );

  const leadingPlayers = GetGroupCurrentLeaders(group);

  // Player rows
  for (let r = 0; r < sortedRows.length; r++) {
    const rowIdx = 2 + r; // starts after header+par
    const pr = sortedRows[r];

    const playerTotalStrokes = GetPlayerTotalCourseStrokes(
      pr.pid,
      ScoreUpdateType.HoleComplete,
    );

    const crownEnabled =
      playerTotalStrokes > 0 &&
      leadingPlayers &&
      leadingPlayers.some((p) => mod.GetObjId(p) === pr.pid);

    // Crown (left, vertically stacked by rows)
    AddCell(
      root,
      `sb_p_crown_${pr.pid}_${gid}`,
      colX(-1),
      rowY(rowIdx),
      colW(-1),
      SB.rowH,
      mod.Message(""),
      { cellIsCrown: true, enabled: crownEnabled ?? false },
      {},
    );

    // Name (left, vertically stacked by rows)
    AddCell(
      root,
      `sb_pname_${pr.pid}_${gid}`,
      colX(0),
      rowY(rowIdx),
      colW(0),
      SB.rowH,
      mod.Message("{}", pr.playerObject),
      { cellIsCrown: false, enabled: false },
      {
        textAnchor: mod.UIAnchor.CenterLeft,
        x: colX(0) + 10,
        textAlpha: 1,
      },
    );

    // Holes 1..9
    for (let i = 0; i < 9; i++) {
      const score = pr.scorePerHole?.[i] ?? 0;

      let strokesMsg: mod.Message;

      if (!players[pr.pid].course.holesCompleted[i]) {
        strokesMsg = mod.Message("-");
      } else {
        strokesMsg = mod.Message("{}", score);
      }

      AddCell(
        root,
        `sb_p_${pr.pid}_h${i + 1}_${gid}`,
        colX(i + 1),
        rowY(rowIdx),
        colW(i + 1),
        SB.rowH,
        strokesMsg,
        { cellIsCrown: false, enabled: false },
        { textAlpha: 0.7 },
      );
    }

    // Total

    const totalMsg =
      playerTotalStrokes > 0
        ? mod.Message("{}", playerTotalStrokes)
        : mod.Message("-");

    AddCell(
      root,
      `sb_p_${pr.pid}_total_${gid}`,
      colX(10),
      rowY(rowIdx),
      colW(10),
      SB.rowH,
      totalMsg,
      { cellIsCrown: false, enabled: false },
      { textColor: UI.COLORS.WHITE, textAlpha: 0.7 },
    );
  }
}

function DeleteScoreboardUI(gid: number) {
  const sbUI = AllGroups[gid].ui.groupScoreboardUI;
  if (sbUI?.root) {
    sbUI.root.delete();
    AllGroups[gid].ui.groupScoreboardUI = {};
  }
}

function GetPlayerTotalScore(holes: number[], maxHoles = 9): number {
  let total = 0;

  for (let i = 0; i < maxHoles; i++) {
    total += holes[i] ?? 0;
  }

  return total;
}

function SortPlayersByScore(players: ScoreRow[], maxHoles = 9): ScoreRow[] {
  return [...players].sort((a, b) => {
    const aTotal = GetPlayerTotalScore(a.scorePerHole, maxHoles);
    const bTotal = GetPlayerTotalScore(b.scorePerHole, maxHoles);

    // Lower score is better
    if (aTotal !== bTotal) return aTotal - bTotal;

    // Tie-breaker (stable): keep original order
    return players.indexOf(a) - players.indexOf(b);
  });
}

//************************
// -/ GROUP PLAYERS UI
//************************

async function SetupGroupPlayersUI(group: CourseGroup, player: mod.Player) {
  const ps = GetValidPlayerState(player);
  if (!ps) return;

  const pid = mod.GetObjId(player);

  DeleteGroupPlayersUI(pid);

  let groupPlayers = group.players;

  for (const p of groupPlayers) {
    if (!mod.IsPlayerValid(p.player)) {
      await RemovePlayerFromGroup(p.pid);
      DeletePlayerState(p.pid);
      groupPlayers = group.players;
    }
  }

  const playersCtn = {
    width: 370,
    height: 70,
    leftPadding: 20,
    ctnPadding: 20,
    totalScoreCtnWidth: 80,
    shotWidth: 20,
    shotHeight: 20,
    shotPadding: 5,
  };

  const nbPlayers = groupPlayers.length;
  const totalHeight =
    nbPlayers * playersCtn.height + (nbPlayers - 1) * playersCtn.ctnPadding;

  const parentContainer = new UI.Container(
    {
      name: `groupPlayersUI_container_${pid}`,
      x: 0,
      y: 0,
      width: playersCtn.width + playersCtn.leftPadding,
      height: totalHeight,
      bgFill: mod.UIBgFill.None,
      anchor: mod.UIAnchor.CenterLeft,
      depth: mod.UIDepth.AboveGameUI,
    },
    player,
  );
  ps.ui.groupPlayersUI.root = parentContainer;

  group.ui.groupPlayersUI.distanceToFlagLabels = {};

  for (const p of groupPlayers) {
    if (!mod.IsPlayerValid(player)) return;

    const pps = GetValidPlayerState(p.player);
    if (!pps) continue;

    const yPos =
      groupPlayers.indexOf(p) * (playersCtn.height + playersCtn.ctnPadding);

    const playerContainer = new UI.Container(
      {
        name: `player_${p.pid}_container_${pid}`,
        x: 0,
        y: yPos,
        width: playersCtn.width,
        height: playersCtn.height,
        bgFill: mod.UIBgFill.Solid,
        bgColor: UICOLORS.GOLF_GREEN_DARK,
        bgAlpha: ROOT_DEFAULT_BG_ALPHA,
        anchor: mod.UIAnchor.TopLeft,
        parent: parentContainer,
        depth: mod.UIDepth.AboveGameUI,
      },
      player,
    );

    let currentlyPlayingMsg = mod.Message("");
    let showCurrentlyPlaying = false;

    if (group.currentPlayer && mod.GetObjId(group.currentPlayer) === p.pid) {
      // playerContainerOutline
      new UI.Container(
        {
          name: `player_${p.pid}_containerOutline_${pid}`,
          x: -5,
          y: yPos,
          width: playersCtn.width + 5,
          height: playersCtn.height,
          bgFill: mod.UIBgFill.OutlineThin,
          bgColor: UI.COLORS.WHITE,
          bgAlpha: 0.6,
          anchor: mod.UIAnchor.TopLeft,
          parent: parentContainer,
          depth: mod.UIDepth.AboveGameUI,
        },
        player,
      );
    } else if (group.currentPlayer) {
      currentlyPlayingMsg = mod.Message(
        "CURRENTLY_PLAYING_NAME" + ps.general.languageSuffix,
        group.currentPlayer,
      );
      showCurrentlyPlaying = true;
    }

    // update currentlyPlayingLabel
    if (pps.ui.firstLayerUI.currentlyPlayingLabel) {
      pps.ui.firstLayerUI.currentlyPlayingLabel.setMessage(currentlyPlayingMsg);
      if (showCurrentlyPlaying) {
        pps.ui.firstLayerUI.currentlyPlayingLabel.show();
      } else {
        pps.ui.firstLayerUI.currentlyPlayingLabel.hide();
      }
    }

    const hole = group.currentHole > 0 ? group.currentHole : 1;
    const holeData = GetHoleData(hole);
    const ballObject = players[p.pid].ball.object;
    let ballPos = v3ToVector(holeData.teeOffPt);
    if (ballObject) {
      ballPos = mod.GetObjectPosition(ballObject);
    }
    const distance = DistanceBetween(
      ballPos,
      v3ToVector(holeData.flagPt),
      DistanceType.XZ,
      DistanceUnit.Yards,
      1,
    );

    let height: number;
    let textAnchor: mod.UIAnchor;
    let labelMessage: mod.Message;
    let keyMessage: mod.Message;

    if (GetGroupPhase(group) === "LOBBY") {
      textAnchor = mod.UIAnchor.Center;
      height = playersCtn.height;
      keyMessage = mod.Message("");
      if (!GetPlayerIsReady(p.pid)) {
        labelMessage = mod.Message("-");
      } else {
        labelMessage = mod.Message("LOBBY_READY" + ps.general.languageSuffix);
      }
    } else if (pps?.ball.isInHole) {
      labelMessage = mod.Message("IN_HOLE" + ps.general.languageSuffix);
      textAnchor = mod.UIAnchor.Center;
      height = playersCtn.height;
      keyMessage = mod.Message("");
    } else {
      labelMessage = mod.Message(
        "DISTANCE_YARDS" + ps.general.languageSuffix,
        distance.whole,
        distance.fraction,
      );
      textAnchor = mod.UIAnchor.BottomCenter;
      height = playersCtn.height / 2;
      keyMessage = mod.Message(
        "DISTANCE_TO_FLAG_KEY" + ps.general.languageSuffix,
      );
    }

    const distanceToPinLabel = new UI.Text(
      {
        name: `player_${p.pid}_distance_to_pin_label_${pid}`,
        message: labelMessage,
        x: playersCtn.leftPadding,
        y: 0,
        width: 60,
        height: height,
        textSize: 18,
        textColor: UI.COLORS.WHITE,
        textAnchor: textAnchor,
        anchor: mod.UIAnchor.TopLeft,
        parent: playerContainer,
        depth: mod.UIDepth.AboveGameUI,
        bgFill: mod.UIBgFill.None,
      },
      player,
    );

    group.ui.groupPlayersUI.distanceToFlagLabels[p.pid] = distanceToPinLabel;

    // distanceToPinKey
    new UI.Text(
      {
        name: `player_${p.pid}_distance_to_pin_key_${pid}`,
        message: keyMessage,
        x: playersCtn.leftPadding,
        y: distanceToPinLabel.position.y + playersCtn.height / 2,
        width: 60,
        height: playersCtn.height / 2,
        textSize: 12,
        textColor: UI.COLORS.WHITE,
        textAnchor: mod.UIAnchor.TopCenter,
        anchor: mod.UIAnchor.TopLeft,
        parent: playerContainer,
        depth: mod.UIDepth.AboveGameUI,
        bgFill: mod.UIBgFill.None,
      },
      player,
    );

    // playerNameLabel
    new UI.Text(
      {
        name: `player_${p.pid}_label_${pid}`,
        message: mod.Message("{}", p.player),
        x: playersCtn.leftPadding * 2 + 60,
        y: 2,
        width:
          playersCtn.width -
          playersCtn.leftPadding -
          playersCtn.totalScoreCtnWidth,
        height: playersCtn.height / 2,
        textSize: 20,
        textColor: UI.COLORS.WHITE,
        textAnchor: mod.UIAnchor.CenterLeft,
        anchor: mod.UIAnchor.TopLeft,
        parent: playerContainer,
        depth: mod.UIDepth.AboveGameUI,
        bgFill: mod.UIBgFill.None,
      },
      player,
    );

    const playerShotsContainer = new UI.Container(
      {
        name: `player_${p.pid}_shots_container_${pid}`,
        x: playersCtn.leftPadding * 2 + 60,
        y: playersCtn.height / 2,
        width:
          playersCtn.width -
          playersCtn.leftPadding -
          playersCtn.totalScoreCtnWidth,
        height: playersCtn.height / 2,
        bgFill: mod.UIBgFill.None,
        anchor: mod.UIAnchor.TopLeft,
        parent: playerContainer,
        depth: mod.UIDepth.AboveGameUI,
      },
      player,
    );

    const maxNbDisplayedShots = 7;
    const par = holeData.par;
    const currentShot = GetPlayerCurrentShot(p.pid);
    const displayedNbShots =
      currentShot > par ? Math.min(maxNbDisplayedShots, currentShot) : par;
    const moreThanMaxShots = currentShot > maxNbDisplayedShots;
    let shotMessage: mod.Message;
    let onMaxShot = false;

    for (
      let shotIndex = 0;
      shotIndex < Math.min(maxNbDisplayedShots, displayedNbShots);
      shotIndex++
    ) {
      if (moreThanMaxShots && shotIndex + 1 === maxNbDisplayedShots) {
        shotMessage = mod.Message(
          "SHOT_NUMBER" + ps.general.languageSuffix,
          currentShot,
        );
        onMaxShot = true;
      } else {
        shotMessage = mod.Message(
          "SHOT_NUMBER" + ps.general.languageSuffix,
          shotIndex + 1,
        );
      }
      // shotLabel
      new UI.Text(
        {
          name: `player_${p.pid}_shot_${shotIndex + 1}_label_${pid}`,
          message: shotMessage,
          x: shotIndex * (playersCtn.shotWidth + playersCtn.shotPadding),
          y: 0,
          width: playersCtn.shotWidth,
          height: playersCtn.shotHeight,
          textSize: shotIndex + 1 === currentShot ? 14 : 13,
          textColor: shotIndex + 1 > par ? UI.COLORS.WHITE : UI.COLORS.BLACK,
          textAnchor: mod.UIAnchor.Center,
          anchor: mod.UIAnchor.TopLeft,
          parent: playerShotsContainer,
          depth: mod.UIDepth.AboveGameUI,
          bgFill: mod.UIBgFill.Solid,
          bgColor: shotIndex + 1 > par ? UICOLORS.RED : UI.COLORS.WHITE,
          bgAlpha: shotIndex + 1 === currentShot || onMaxShot ? 1 : 0.1,
          textAlpha: shotIndex + 1 === currentShot || onMaxShot ? 1 : 0.4,
        },
        player,
      );
    }

    let scoreMessage: mod.Message;

    if (GetPlayerCourseRelativeScore(p.pid) < 0) {
      scoreMessage = mod.Message(
        "SCORE_UNDER_PAR" + ps.general.languageSuffix,
        GetPlayerCourseRelativeScore(p.pid),
      );
    } else if (GetPlayerCourseRelativeScore(p.pid) === 0) {
      scoreMessage = mod.Message(
        "SCORE_EVEN_PAR" + ps.general.languageSuffix,
        GetPlayerCourseRelativeScore(p.pid),
      );
    } else {
      scoreMessage = mod.Message(
        "SCORE_OVER_PAR" + ps.general.languageSuffix,
        GetPlayerCourseRelativeScore(p.pid),
      );
    }

    // totalScoreLabel
    new UI.Text(
      {
        name: `player_${p.pid}_total_score_label_${pid}`,
        message: scoreMessage,
        x: 0,
        y: 0,
        width: playersCtn.totalScoreCtnWidth,
        height: playersCtn.height,
        textSize: 30,
        textColor: UI.COLORS.WHITE,
        textAnchor: mod.UIAnchor.Center,
        anchor: mod.UIAnchor.CenterRight,
        parent: playerContainer,
        depth: mod.UIDepth.AboveGameUI,
        bgFill: mod.UIBgFill.None,
      },
      player,
    );

    // totalScoreSep
    new UI.Container(
      {
        name: `player_${p.pid}_total_score_sep_${pid}`,
        x: playersCtn.totalScoreCtnWidth - 1,
        y: 0,
        width: 1,
        height: playersCtn.height - 16,
        bgFill: mod.UIBgFill.Solid,
        bgColor: UI.COLORS.WHITE,
        bgAlpha: 0.2,
        anchor: mod.UIAnchor.CenterRight,
        parent: playerContainer,
        depth: mod.UIDepth.AboveGameUI,
      },
      player,
    );
  }
}

function DeleteGroupPlayersUI(pid: number) {
  const ps = players[pid];
  if (!ps) return;

  if (ps.ui.groupPlayersUI.root) {
    ps.ui.groupPlayersUI.root.delete();
    ps.ui.groupPlayersUI = {};
    LogEvent(1, DeleteGroupPlayersUI.name, `Deleted UI.`, {
      pid,
      main: LogOType.Player,
    });
  } else {
    LogEvent(1, DeleteGroupPlayersUI.name, `No UI to delete.`, {
      pid,
      main: LogOType.Player,
    });
  }
}

function InitializeCarryWorldIcon(
  player: mod.Player,
  initialPos: V3,
  landingPos: V3,
): { whole: number; decimals: number } {
  const ps = GetValidPlayerState(player);
  if (!ps) return { whole: 0, decimals: 0 };

  const pid = mod.GetObjId(player);
  const carryWIName = `${pid}_carryWorldIcon`;
  const wim = WIM.setup();

  const distance = DistanceBetween(
    v3ToVector(initialPos),
    v3ToVector(landingPos),
    DistanceType.XZ,
    DistanceUnit.Yards,
    1,
  );

  if (distance.whole > 50) {
    wim.createIcon(carryWIName, v3ToVector(landingPos), {
      text: mod.Message(
        "CARRY_TEXT" + ps.general.languageSuffix,
        distance.whole,
        distance.fraction,
      ),
      textEnabled: false, // Disabled text to reduce clutter
      icon: mod.WorldIconImages.Cross,
      iconEnabled: true,
      color: UICOLORS.GOLF_GREEN_COMP,
      playerOwner: player,
    });

    wim.setPosition(carryWIName, v3ToVector(landingPos));

    ps.ball.carryWorldIconName = carryWIName;
  }

  return { whole: distance.whole, decimals: distance.fraction };
}

function DeleteCarryWorldIcon(pid: number) {
  const ps = players[pid];
  if (!ps) return;

  const carryWIName = ps.ball.carryWorldIconName;
  const wim = WIM.setup();

  if (carryWIName && wim.hasIcon(carryWIName)) {
    wim.deleteIcon(carryWIName);
    ps.ball.carryWorldIconName = null;
  }

  LogEvent(1, DeleteCarryWorldIcon.name, `Deleted carry world icon.`, {
    pid,
    main: LogOType.Player,
  });
}

function InitializePredictedWorldIcon(player: mod.Player) {
  const ps = GetValidPlayerState(player);
  if (!ps) return;

  const pid = mod.GetObjId(player);
  const predictedWIName = `${pid}_predictedWorldIcon`;
  const psb = ps.ball;
  const wim = WIM.setup();
  const group = GetGroupFromPlayer(player);
  if (!group) return;

  wim.createIcon(predictedWIName, ZERO_VEC, {
    textEnabled: false,
    icon: mod.WorldIconImages.Cross,
    iconEnabled: false,
    color: UICOLORS.GOLF_GREEN_COMP,
    teamOwner: group.team,
  });

  psb.predictedWorldIconName = predictedWIName;
}

async function InitializePredictedFx(player: mod.Player) {
  const ps = GetValidPlayerState(player);
  if (!ps) return;

  const psb = ps.ball;

  psb.predictedFx = await PlayVFX(vfxPlayingBall, ZERO_VEC, true, true, 10);
}

function SetPredictedWIandFx(
  player: mod.Player,
  group: CourseGroup,
  initialPos: V3,
  landingPos: V3 | null,
) {
  const ps = GetValidPlayerState(player);
  if (!ps) return;

  const psb = ps.ball;
  const wim = WIM.setup();

  const iconName = psb.predictedWorldIconName;
  const iconExists = iconName && wim.hasIcon(iconName);

  const fx = psb.predictedFx;
  const fxExists = fx != null;

  const landingPosValid = landingPos != null;

  const surface = landingPosValid
    ? DetectSurfaceType(group.currentHole, landingPos)
    : null;
  const isOob = surface === SurfaceType.OutOfBounds;

  if (landingPos == null || isOob) {
    if (ps.ui.powerUI.oobText && !ps.ui.powerUI.oobText.visible) {
      PlaySFX(sfxAimingOutOfBoundsOneShot, ZERO_VEC, player, {
        amplitude: 0.5,
      });
      ps.ui.powerUI.oobText.show();
    }
    if (ps.ui.powerUI.oobTextOutline && !ps.ui.powerUI.oobTextOutline.visible)
      ps.ui.powerUI.oobTextOutline.show();

    if (ps.swing.predictionVisible) {
      if (iconExists) wim.setEnabled(iconName, false, false);
      if (fxExists) mod.EnableVFX(fx, false);

      ps.swing.predictionVisible = false;
    }
    return;
  }

  const distance = DistanceBetween(
    v3ToVector(initialPos),
    v3ToVector(landingPos),
    DistanceType.XZ,
    DistanceUnit.Yards,
    1,
  );

  // If landing position invalid such as out of bounds, disabled WI and FX
  if (iconExists) {
    wim.setPosition(iconName!, v3ToVector(landingPos));
    wim.setText(
      iconName,
      mod.Message("DISTANCE_YARDS", distance.whole, distance.fraction),
    );
    wim.setEnabled(iconName, false, true);
  }

  if (fxExists) {
    const dist = Math.max(distance.wholeWithDecimals, 0);
    const yOffset = dist >= 30 ? 0 : 13 * (1 - Math.pow(dist / 30, 2.354));

    const fLandingPos = {
      x: landingPos.x,
      y: landingPos.y - yOffset,
      z: landingPos.z,
    };

    mod.MoveVFX(fx, v3ToVector(fLandingPos), ZERO_VEC);
    mod.EnableVFX(fx, true);
  }

  if (ps.ui.powerUI.oobText && ps.ui.powerUI.oobText.visible)
    ps.ui.powerUI.oobText.hide();
  if (ps.ui.powerUI.oobTextOutline && ps.ui.powerUI.oobTextOutline.visible)
    ps.ui.powerUI.oobTextOutline.hide();

  ps.swing.predictionVisible = true;
}

function DeletePredictedWorldIcon(pid: number) {
  const ps = players[pid];
  if (!ps) return;

  const wim = WIM.setup();
  const iconName = ps.ball.predictedWorldIconName;

  if (iconName && wim.hasIcon(iconName)) {
    wim.deleteIcon(iconName);
    ps.ball.predictedWorldIconName = null;
  }

  LogEvent(1, DeletePredictedWorldIcon.name, `Deleted predicted world icon.`, {
    pid,
    main: LogOType.Player,
  });
}

function DeletePredictedFx(pid: number) {
  const ps = players[pid];
  if (!ps) return;

  const fx = ps.ball.predictedFx;

  if (fx) {
    mod.UnspawnObject(fx);
    ps.ball.predictedFx = null;
  }

  LogEvent(1, DeletePredictedFx.name, `Deleted predicted FX.`, {
    pid,
    main: LogOType.Player,
  });
}

//************************
// -/ GROUPS
//************************

function AddPlayerToGroup(player: mod.Player, groupId?: number) {
  if (!mod.IsPlayerValid(player)) return;

  const pid = mod.GetObjId(player);
  const gid = groupId == null ? CreateGroup() : groupId;

  if (gid == null) {
    LogError(
      AddPlayerToGroup.name,
      `Unable to add Player ${pid} to Group. Group id is null`,
      9,
    );
    return;
  }

  const group = AllGroups[gid];
  if (!group) return;

  if (group.players.some((p) => p.pid === pid)) {
    LogError(
      AddPlayerToGroup.name,
      `Player ${pid} is already in Group ${gid}`,
      9,
    );
    return;
  } else if (group.players.length >= MAX_PLAYERS_PER_GROUP) {
    LogError(
      AddPlayerToGroup.name,
      `Group ${gid} has reached max players (${MAX_PLAYERS_PER_GROUP})`,
      9,
    );
    return;
  }

  group.players.push({ pid: pid, player: player });

  for (const p of group.players) {
    SetupGroupPlayersUI(group, p.player);
  }

  UpdateGameScoreboardForPlayer(player);

  LogEvent(1, AddPlayerToGroup.name, `Added player to group.`, {
    pid,
    gid,
    main: LogOType.Group,
  });

  if (groupId) {
    mod.DisplayHighlightedWorldLogMessage(
      mod.Message("JOINED_GROUP", player, groupId),
    );
  }
}

function CreateGroup(): number | null {
  const keys = Object.keys(AllGroups)
    .map((k) => Number(k))
    .filter(Number.isFinite);

  if (keys.length >= MAX_GROUPS) {
    if (GROUP_MODE === "Dynamic") {
      LogError(
        CreateGroup.name,
        `Unable to create group. Max groups reached (${MAX_GROUPS})`,
        10,
      );
    }
    return null;
  }

  let gid = 1;
  while (AllGroups[gid]) gid++;

  SetGroupDefaultStates(gid);

  // if (!AllGroups[gid].ui.notificationUI.root) InitNotificationUI(gid);

  LogEvent(1, CreateGroup.name, `Created group.`, {
    gid,
    main: LogOType.Group,
  });

  return gid;
}

function GetGroupLanguage(group: CourseGroup): "en" | "cn" {
  const defaultLanguage = "en";
  let finalLanguage: "en" | "cn" = defaultLanguage;

  for (const p of group.players) {
    const ps = GetValidPlayerState(p.player);
    if (!ps) continue;

    if (ps.general.selectedLanguage === defaultLanguage) {
      return defaultLanguage;
    } else {
      finalLanguage = ps.general.selectedLanguage;
    }
  }

  return finalLanguage;
}

function SetGroupDefaultStates(gid: number, fullReset = false) {
  let ui: GroupUI;
  let team: mod.Team;
  let players: GroupPlayer[];

  if (AllGroups[gid] && !fullReset) {
    ui = AllGroups[gid].ui;
    team = AllGroups[gid].team;
    players = AllGroups[gid].players;
  } else {
    ui = {
      notificationUI: {
        cancelRequested: false,
      },
      groupPlayersUI: {
        distanceToFlagLabels: {},
      },
      groupScoreboardUI: {},
    };
    team = mod.GetTeam(gid + 1);
    players = [];
  }

  AllGroups[gid] = {
    groupId: gid,
    groupUniqueId: gid * Math.floor(Math.random() * 1000000),
    team: team,
    players: players,
    currentHole: 0,
    nextHole: 1,
    phase: "LOBBY",
    courseMode: "NORMAL",
    currentPlayer: null,
    previousPlayer: null,
    currentLeadingPlayers: null,
    previousLeadingPlayers: null,
    ui: ui,
  };

  LogEvent(1, SetGroupDefaultStates.name, `Default states set for group.`, {
    gid,
    main: LogOType.Group,
  });
}

async function RemovePlayerFromGroup(
  pid: number,
  fromMatchmakingUI: boolean = false,
) {
  const group = Object.values(AllGroups).find((g) =>
    g.players.some((p) => p.pid === pid),
  );
  if (group) {
    // remove the player from that group's player list
    const player = group.players.find((p) => p.pid === pid);
    group.players = group.players.filter((p) => p.pid !== pid);

    // return player to lobby, clear ui and reset player data
    if (player && mod.IsPlayerValid(player.player) && players[pid]) {
      await AssignPlayerToLobby(player.player, false, !fromMatchmakingUI);
      DeleteGroupPlayersUI(player.pid);
    }

    LogEvent(1, RemovePlayerFromGroup.name, `Removed player from group.`, {
      pid,
      gid: group.groupId,
      main: LogOType.Group,
    });

    // clear turn if the removed player had the turn
    const removedWasCurrent =
      group.currentPlayer && mod.GetObjId(group.currentPlayer) === pid;
    const removedWasPrevious =
      group.previousPlayer && mod.GetObjId(group.previousPlayer) === pid;

    if (removedWasCurrent) {
      group.currentPlayer = null;
    }
    if (removedWasPrevious) {
      group.previousPlayer = null;
    }

    if (removedWasCurrent) {
      InitializeNextShot(group);
    }

    if (group.players.length === 0) {
      await DeleteGroup(group.groupId);
    } else {
      for (const p of group.players) {
        SetupGroupPlayersUI(group, p.player);
      }
    }
  } else {
    // return player to lobby, clear ui and reset player data
    const playerObject = players[pid].general.playerRef.object;
    if (playerObject && mod.IsPlayerValid(playerObject) && players[pid]) {
      await AssignPlayerToLobby(playerObject, false, !fromMatchmakingUI);
      DeleteGroupPlayersUI(pid);
    }
  }

  if (players[pid] && players[pid].ui.firstLayerUI.currentlyPlayingLabel) {
    players[pid].ui.firstLayerUI.currentlyPlayingLabel.setMessage(
      mod.Message(""),
    );
    players[pid].ui.firstLayerUI.currentlyPlayingLabel.hide();
  }
}

function SetGroupPhase(group: CourseGroup, phase: CourseGroup["phase"]) {
  group.phase = phase;
  LogEvent(1, SetGroupPhase.name, `Group phase set to: ${group.phase}.`, {
    gid: group.groupId,
    main: LogOType.Group,
  });
}

function GetGroupPhase(group: CourseGroup): CourseGroup["phase"] {
  return group.phase;
}

function SetGroupCourseMode(group: CourseGroup, mode: CourseMode) {
  group.courseMode = mode;
  LogEvent(1, SetGroupCourseMode.name, `Group course mode set to: ${mode}.`, {
    gid: group.groupId,
    main: LogOType.Group,
  });
}

function GetGroupCourseMode(group: CourseGroup) {
  return group.courseMode;
}

function SetGroupCurrentLeaders(group: CourseGroup) {
  if (group.currentLeadingPlayers != null) {
    group.previousLeadingPlayers = group.currentLeadingPlayers;
  }

  const players = group.players;

  if (players.length === 0) {
    DeleteGroup(group.groupId);
    return null;
  }

  let bestScore: number | null = null;
  let winners: mod.Player[] = [];

  for (const p of players) {
    const ps = GetValidPlayerState(p.player);
    if (!ps) continue;

    const score = GetPlayerCourseRelativeScore(p.pid);

    if (bestScore === null || score < bestScore) {
      bestScore = score;
      winners = [p.player];
    } else if (score === bestScore) {
      winners.push(p.player);
    }
  }

  if (winners.length === 0) {
    group.currentLeadingPlayers = null;
  } else {
    group.currentLeadingPlayers = winners;
  }

  LogEvent(
    1,
    SetGroupCurrentLeaders.name,
    `Group current leaders updated (previous leaders: ${group.previousLeadingPlayers?.length}, current leaders: ${group.currentLeadingPlayers?.length}).`,
    {
      gid: group.groupId,
      main: LogOType.Group,
    },
  );
}

function GetGroupCurrentLeaders(group: CourseGroup): mod.Player[] | null {
  return group.currentLeadingPlayers;
}

function GetGroupPreviousLeaders(group: CourseGroup): mod.Player[] | null {
  return group.previousLeadingPlayers;
}

function GroupIsValid(groupId: number): boolean {
  const group = AllGroups[groupId];
  if (!group) return false;
  return true;
}

async function DeleteGroup(groupId: number): Promise<void> {
  const group = AllGroups[groupId];
  if (!group) return;

  const groupPlayers = group.players;

  await Promise.all(
    groupPlayers.map((p) => {
      DeleteGroupPlayersUI(p.pid);
      AssignPlayerToLobby(p.player, false);
    }),
  );

  DestroyCarts(group);
  DeleteFlagWorldIcon(group);
  DeleteFlagFx(group);
  DeletePlayingBallFx(group);
  UnspawnHolePanelForGroup(group);
  UnspawnGolfBag(group);
  DeleteNotificationUI({ type: "group", id: group.groupId });
  DeleteScoreboardUI(groupId);

  await mod.Wait(0.5);

  if (GROUP_MODE === "Static") {
    SetGroupDefaultStates(groupId, true);
  } else if (GROUP_MODE === "Dynamic") {
    delete AllGroups[groupId];
  }

  for (const p of groupPlayers) {
    if (!mod.IsPlayerValid(p.player)) continue;
    UpdateGameScoreboardForPlayer(p.player);
  }

  const eventStr = GROUP_MODE === "Static" ? "Reset" : "Deleted";
  LogEvent(1, DeleteGroup.name, `${eventStr} group.`, {
    gid: groupId,
    main: LogOType.Group,
  });
}

async function ReturnGroupToLobby(group: CourseGroup) {
  LogEvent(1, ReturnGroupToLobby.name, `Returning group to Lobby.`, {
    gid: group.groupId,
    main: LogOType.Group,
  });

  SetGroupPhase(group, "LOBBY");

  const groupPlayers = group.players;

  await Promise.all(
    groupPlayers.map((p) => {
      mod.EnableUIInputMode(true, p.player);
      return TransitionScreenInAndOut(p.player, true, 0.8);
    }),
  );

  const flagPos = v3ToVector(GetHoleData(group.currentHole).flagPt);

  for (const p of groupPlayers) {
    const pos = vectorToV3(GetPlayerPos(p.player));
    const offsetPos = v3ToVector({ x: pos.x, y: pos.y + 50, z: pos.z });
    mod.Teleport(p.player, offsetPos, YawTowards(offsetPos, flagPos));
  }

  // End game condition 1: if no group is playing
  let anyGroupPlaying = false;
  for (const group of Object.values(AllGroups)) {
    if (group.phase !== "LOBBY") {
      anyGroupPlaying = true;
      break;
    }
  }

  /* // NOW REMOVED AND HANDLED AFTER GROUP IS DELETED - EVERYONE WINS
  // End game condition 2: if any player has reached the required wins to end the gamemode
  let playersWithMostWins: mod.Player[] = [];
  let mostWins = 0;

  if (!anyGroupPlaying) {
    for (let i = 0; i < mod.CountOf(mod.AllPlayers()); i++) {
      const p = mod.ValueInArray(mod.AllPlayers(), i);

      const ps = GetValidPlayerState(p);
      if (!ps) continue;

      const thisPlayerWins = GetPlayerWins(p);
      console.log(`Player ${mod.GetObjId(p)} has ${thisPlayerWins} wins.`);

      if (thisPlayerWins > mostWins) {
        mostWins = thisPlayerWins;
        playersWithMostWins = [p];
      } else if (thisPlayerWins === mostWins) {
        playersWithMostWins.push(p);
      }
    }

    console.log(
      `Most wins: ${mostWins}. Players with most wins: ${mod.GetObjId(playersWithMostWins[0])}`,
    );

    if (
      mostWins >= WINS_NEEDED_TO_END_GAMEMODE &&
      playersWithMostWins.length === 1
    ) {
      mod.EndGameMode(playersWithMostWins[0] as mod.Player);
    } else if (mostWins >= WINS_NEEDED_TO_END_GAMEMODE) {
      mod.EndGameMode(mod.GetTeam(0));
    }
  }*/

  await mod.Wait(0.5);

  await DeleteGroup(group.groupId);

  await mod.Wait(0.5);

  await Promise.all(
    groupPlayers.map((p) => {
      const t = TransitionScreenInAndOut(p.player, false, 1);
      mod.EnableUIInputMode(false, p.player);
      return t;
    }),
  );

  if (!anyGroupPlaying) {
    mod.EndGameMode(mod.GetTeam(LOBBY_TEAM_ID));
  }
}

function GetGroupFromPlayer(player: mod.Player | number): CourseGroup | null {
  let pid: number;

  if (typeof player === "number") {
    pid = player;
  } else {
    if (!mod.IsPlayerValid(player)) return null;
    pid = mod.GetObjId(player);
  }

  for (const group of Object.values(AllGroups)) {
    for (const p of group.players) {
      if (p.pid === pid) {
        return group;
      }
    }
  }

  LogEvent(1, GetGroupFromPlayer.name, `Player not found in any group.`, {
    pid,
    main: LogOType.Player,
  });
  return null;
}

function CheckAllGroupPlayersDeployed(group: CourseGroup): boolean {
  let allDeployed = true;

  for (const p of group.players) {
    if (!GetPlayerIsDeployed(p.player)) {
      allDeployed = false;

      LogEvent(
        1,
        CheckAllGroupPlayersDeployed.name,
        `Player not deployed. Returning false.`,
        {
          pid: p.pid,
          gid: group.groupId,
          main: LogOType.Group,
        },
      );

      break;
    }
  }

  return allDeployed;
}

function CheckAllGroupPlayersInTeam(group: CourseGroup): boolean {
  let allInTeam = true;

  for (const p of group.players) {
    if (mod.GetObjId(mod.GetTeam(p.player)) !== mod.GetObjId(group.team)) {
      allInTeam = false;

      mod.SetTeam(p.player, group.team);

      LogEvent(
        1,
        CheckAllGroupPlayersInTeam.name,
        `Player not in team. Returning false.`,
        {
          pid: p.pid,
          gid: group.groupId,
          main: LogOType.Group,
        },
      );

      break;
    }
  }

  return allInTeam;
}

async function FinalizeGroupGame(group: CourseGroup) {
  if (!group) return;
  if (group.players.length === 0) {
    DeleteGroup(group.groupId);
    return;
  }

  group.currentPlayer = null;

  let languageSuffix = "";
  if (GetGroupLanguage(group) === "cn") {
    languageSuffix = "_C";
  }

  const mainMessage = mod.Message("COURSE_COMPLETED" + languageSuffix);

  const winners: mod.Player[] | null = GetGroupCurrentLeaders(group);

  let winner1: mod.Player | null = null;
  let winner2: mod.Player | null;
  let winner3: mod.Player | null;

  let winnersMessage = mod.Message("NO_WINNER");

  if (winners != null) {
    LogEvent(
      1,
      FinalizeGroupGame.name,
      `Winners determined (total: ${winners.length}).`,
      { gid: group.groupId, main: LogOType.Group },
    );

    switch (winners.length) {
      case 1:
        winner1 = winners[0];
        break;
      case 2:
        winner1 = winners[0];
        winner2 = winners[1];
        winnersMessage = mod.Message(
          "TIE_BETWEEN_TWO_PLAYERS" + languageSuffix,
          winner1,
          winner2,
        );
        break;
      case 3:
        winner1 = winners[0];
        winner2 = winners[1];
        winner3 = winners[2];
        winnersMessage = mod.Message(
          "TIE_BETWEEN_THREE_PLAYERS" + languageSuffix,
          winner1,
          winner2,
          winner3,
        );
        break;
      default:
        winnersMessage = mod.Message("ALL_PLAYERS_TIED" + languageSuffix);
        break;
    }

    if (group.players.length === 1 && winner1) {
      const wPid = mod.GetObjId(winner1);
      const wScore = GetPlayerCourseRelativeScore(wPid);

      const ranges: { min: number; max: number; key: string }[] = [
        { min: -Infinity, max: -10, key: "WINNER_PLAYER_M10" },
        { min: -9, max: -8, key: "WINNER_PLAYER_M8" },
        { min: -7, max: -5, key: "WINNER_PLAYER_M5" },
        { min: -4, max: -3, key: "WINNER_PLAYER_M3" },
        { min: -2, max: -1, key: "WINNER_PLAYER_M1" },
        { min: 1, max: 3, key: "WINNER_PLAYER_P1" },
        { min: 4, max: 6, key: "WINNER_PLAYER_P4" },
        { min: 7, max: 9, key: "WINNER_PLAYER_P7" },
        { min: 10, max: Infinity, key: "WINNER_PLAYER_P10" },
      ];

      const match = ranges.find((r) => wScore >= r.min && wScore <= r.max) ?? {
        key: "WINNER_PLAYER",
      };

      if (wScore === 0) {
        winnersMessage = mod.Message("WINNER_PLAYER_PAR" + languageSuffix);
      } else {
        winnersMessage = mod.Message(match.key + languageSuffix, wScore);
      }
    } else if (winner1) {
      winnersMessage = mod.Message("WINNER_PLAYER" + languageSuffix, winner1);
    }
  } else {
    LogError(
      FinalizeGroupGame.name,
      `No winners found for Group ${group.groupId}`,
      11,
    );
  }

  mod.PlayMusic(endCourseMusic, group.team);

  for (const p of group.players) {
    const ps = GetValidPlayerState(p.player);
    if (ps) ps.general.coursesCompleted += 1;
  }

  await mod.Wait(1);

  InitScoreboardUI(group);

  for (const p of group.players) {
    if (winners && winners.some((w) => mod.GetObjId(w) === p.pid)) {
      PlayVO(mod.VoiceOverEvents2D.GlobalEOMVictory, { player: p.player });
      AddPlayerWin(p.player);
    } else {
      PlayVO(mod.VoiceOverEvents2D.GlobalEOMDefeat, { player: p.player });
    }

    UpdateGameScoreboardForPlayer(p.player);
  }

  /*
  // DEBUG ONLY - START - SPAWN 2 AIs
  for (const p of group.players) {
    const pPos = vectorToV3(GetPlayerPos(p.player));
    const spawner = mod.SpawnObject(mod.RuntimeSpawn_Common.AI_Spawner, mod.CreateVector(pPos.x, pPos.y + 2, pPos.z), ZERO_VEC);
    mod.SpawnAIFromAISpawner(spawner);
  }

  await mod.Wait(5);

  for (const p of group.players) {
    const pPos = vectorToV3(GetPlayerPos(p.player));
    const spawner = mod.SpawnObject(mod.RuntimeSpawn_Common.AI_Spawner, mod.CreateVector(pPos.x, pPos.y + 2, pPos.z), ZERO_VEC);
    mod.SpawnAIFromAISpawner(spawner);
  }

  await mod.Wait(1);

  for (let ix = 0; ix < mod.CountOf(mod.AllPlayers()); ix++) {
    const p = mod.ValueInArray(mod.AllPlayers(), ix);
    if (mod.GetSoldierState(p, mod.SoldierStateBool.IsAISoldier)) {
      AddPlayerToGroup(p, group.groupId);
    }
  }

  await mod.Wait(1);
  // DEBIUG ONLY - END
  */

  await ShowNotification(
    { type: "group", id: group.groupId },
    { main: mainMessage, comment: winnersMessage },
    NotifyPosition.Bottom,
    12,
    {
      displayProgressBar: true,
      displayCrown: true,
    },
  );

  mod.PlayMusic(mod.MusicEvents.Gauntlet_Stop, group.team);

  DeleteScoreboardUI(group.groupId);

  let assignedTeams = 0;

  for (const p of group.players) {
    if (!mod.IsPlayerValid(p.player)) {
      RemovePlayerFromGroup(p.pid);
      continue;
    }

    assignedTeams++;
    mod.SetTeam(p.player, mod.GetTeam(MAX_GROUPS + 1 + assignedTeams));

    mod.AddEquipment(
      p.player,
      mod.Weapons.Sidearm_ES_57,
      mod.CreateNewWeaponPackage(),
      mod.InventorySlots.SecondaryWeapon,
    );

    PlayVO(mod.VoiceOverEvents2D.RoundSuddenDeath, { player: p.player });

    const ps = GetValidPlayerState(p.player);
    if (!ps) return;

    /*ShowNotification(
      { type: "player", id: p.pid },
      {
        main: mod.Message("RETURNING_TO_LOBBY" + ps.general.languageSuffix),
        comment: null,
      },
      NotifyPosition.Top,
      15,
      {
        displayProgressBar: true,
        displayTimerAsComment: { enabled: true },
      },
    );*/
  }

  for (const p of group.players) {
    mod.SpotTarget(p.player, 15, mod.SpotStatus.SpotInBoth);
    mod.PlayMusic(mod.MusicEvents.Gauntlet_Stop, mod.GetTeam(p.player));
    mod.PlayMusic(
      mod.MusicEvents.Gauntlet_Urgency_FinalMission,
      mod.GetTeam(p.player),
    );
  }

  GAME_ENDING = true;
  mod.SetSpawnMode(mod.SpawnModes.Spectating);
  mod.SetFriendlyFire(true);

  for (let i = 0; i < 60; i++) {
    // OnPlayerDied removes the player from the group, so we check if only one player remains alive by checking in group
    if (group.players.length <= 1) break;

    await mod.Wait(1);
  }

  mod.SetFriendlyFire(false);

  await mod.Wait(3);

  ReturnGroupToLobby(group);
}

//************************
// -/ INITIALIZE HOLE AND SHOT
//************************

function InitializeGroupCourse(group: CourseGroup) {
  if (!group) return;

  const totalHoles = GetCourseTotalHoles();

  for (const p of group.players) {
    const ps = GetValidPlayerState(p.player);
    if (!ps) return;

    ps.course = {
      ...ps.course,
      strokesPerHole: new Array(totalHoles).fill(0),
      holesCompleted: new Array(totalHoles).fill(false),
    };

    if (GetTeamIdFromPlayer(p.player) !== mod.GetObjId(group.team)) {
      mod.SetTeam(p.player, group.team);
    }

    const modifierKeys = Object.keys(hitModifiers) as HitModifierKey[];

    for (let i = 0; i < 3 + 1; i++) {
      const randomKey =
        modifierKeys[Math.floor(Math.random() * modifierKeys.length)];

      ps.general.inventoryModifiers[randomKey] =
        (ps.general.inventoryModifiers[randomKey] as number) + 1;
    }
  }

  LogEvent(1, InitializeGroupCourse.name, `Course initialized.`, {
    gid: group.groupId,
    main: LogOType.Group,
  });

  mod.DisablePlayerJoin();

  InitializeGroupNextHole(group);
}

function GetOtherGroupOnHole(hole: number, myGid: number): CourseGroup | null {
  for (const g of Object.values(AllGroups)) {
    if (!g) continue;
    if (g.groupId === myGid) continue;
    if (g.phase === "LOBBY") continue;

    if (g.currentHole === hole) return g;
  }
  return null;
}

async function WaitUntilHoleFree(group: CourseGroup, hole: number) {
  const gid = group.groupId;

  let blocking = GetOtherGroupOnHole(hole, gid);

  const languageSuffix = GetGroupLanguage(group) === "cn" ? "_C" : "";

  const msg = blocking
    ? mod.Message(
        "WAITING_FOR_GROUP_ON_HOLE" + languageSuffix,
        blocking.groupId,
      )
    : mod.Message("WAITING_FOR_GROUP_ON_HOLE_NO_GROUP" + languageSuffix);

  ShowNotification(
    { type: "group", id: gid },
    {
      main: msg,
      comment: null,
    },
    NotifyPosition.Top,
    600,
  );

  while (true) {
    await mod.Wait(2);

    blocking = GetOtherGroupOnHole(hole, gid);

    if (!blocking) {
      return;
    }
  }
}

async function InitializeGroupNextHole(group: CourseGroup) {
  if (!group) return;

  const gid = group.groupId;

  SetGroupCurrentLeaders(group);

  // Detect if all holes have been played
  const maxHole = GetCourseTotalHoles();
  if (group.nextHole > maxHole) {
    LogEvent(1, InitializeGroupNextHole.name, `Group completed the Course.`, {
      gid: group.groupId,
      main: LogOType.Group,
    });
    FinalizeGroupGame(group);
    return;
  }

  mod.PlayMusic(startCourseMusic, group.team);

  // Reset all players' ball as not in hole
  for (const p of group.players) {
    const ps = GetValidPlayerState(p.player);
    if (ps) {
      ps.ball.isInHole = false;
      SetPlayerBallSurfaceType(p.player, SurfaceType.TeeBox);
    }
  }

  // Set current hole depending on phase, then set next hole
  group.currentHole = group.nextHole;
  group.previousPlayer = null;
  group.nextHole++;

  // Get hole data
  const holeData = GetHoleData(group.currentHole);

  CreatePlayingBallFx(group);

  SetFlagWorldIcon(group, holeData);
  SpawnFlagFx(group, holeData);

  SpawnFlagPole(group);

  SpawnHolePanel(group);

  SpawnGolfBag(group);

  await mod.Wait(0.5);

  const introCamPromise = PlayHoleIntroCameraRoute(group);

  // Transition IN (group-level await)
  await Promise.all(
    group.players.map((p) => {
      UnspawnPlayerBall(p.pid);
      SetPlayerSwingRestrictions(p.player);
      return TransitionScreenInAndOut(p.player, true, 0.8, 0.7);
    }),
  );

  for (const p of group.players) {
    if (!mod.IsPlayerValid(p.player)) continue;
    mod.SetCameraTypeForPlayer(p.player, mod.Cameras.Fixed, 2001);
  }

  // Show scoreboard
  InitScoreboardUI(group);

  // Wait until hole is unoccupied by another group
  await WaitUntilHoleFree(group, group.currentHole);

  if (group.currentHole > 1) {
    // Leading (winning) player voice over
    const curLeadingPlayers = GetGroupCurrentLeaders(group);
    const prevLeadingPlayers = GetGroupPreviousLeaders(group);

    if (
      curLeadingPlayers &&
      curLeadingPlayers.length === 1 &&
      group.currentHole > 1
    ) {
      const leadingPlayer = curLeadingPlayers[0];

      if (leadingPlayer && mod.IsPlayerValid(leadingPlayer)) {
        if (
          prevLeadingPlayers == null ||
          !prevLeadingPlayers.some(
            (p) => mod.GetObjId(p) === mod.GetObjId(leadingPlayer),
          )
        ) {
          PlayVO(mod.VoiceOverEvents2D.ProgressEarlyWinning, {
            player: leadingPlayer,
          });
        }
      }
    }
  }

  // Check if players are deployed before teleporting
  const allDeployedCheckTimeout = 20; // seconds

  let allDeployed = CheckAllGroupPlayersDeployed(group);
  let allInGroupTeam = CheckAllGroupPlayersInTeam(group);

  ShowNotification(
    { type: "group", id: gid },
    {
      main: mod.Message(
        "WAITING_FOR_PLAYERS" + (GetGroupLanguage(group) === "cn" ? "_C" : ""),
      ),
      comment: null,
    },
    NotifyPosition.Top,
    20,
    {
      displayProgressBar: true,
    },
  );

  await DestroyCarts(group);
  await SpawnCarts(group);

  for (let i = 0; i < allDeployedCheckTimeout; i++) {
    if (allDeployed && allInGroupTeam) {
      await ForceHideGroupNotification(group);
      break;
    } else {
      allDeployed = CheckAllGroupPlayersDeployed(group);
      allInGroupTeam = CheckAllGroupPlayersInTeam(group);
    }

    await mod.Wait(1);
  }

  // Remove players still not deployed after timeout and re-create scoreboard if needed
  for (const p of group.players) {
    if (!GetPlayerIsDeployed(p.player)) {
      await RemovePlayerFromGroup(p.pid);
      DeleteScoreboardUI(gid);
      InitScoreboardUI(group);
    }
  }

  LogEvent(
    1,
    InitializeGroupNextHole.name,
    `All players deployed and ready for next hole.`,
    {
      gid: group.groupId,
      main: LogOType.Group,
    },
  );

  // Show next hole notification
  await ShowNotification(
    { type: "group", id: gid },
    {
      main: mod.Message(
        "LOADING_NEXT_PIN" + (GetGroupLanguage(group) === "cn" ? "_C" : ""),
        group.currentHole,
      ),
      comment: mod.Message(
        "NEXT_PIN_DETAILS" + (GetGroupLanguage(group) === "cn" ? "_C" : ""),
        holeData.par,
        DistanceBetween(
          v3ToVector(holeData.teeOffPt),
          v3ToVector(holeData.flagPt),
          DistanceType.XZ,
          DistanceUnit.Yards,
          1,
        ).whole,
      ),
    },
    NotifyPosition.Top,
    5,
    {
      displayProgressBar: true,
    },
  );

  DeleteScoreboardUI(gid);

  // Transition OUT (group-level await)
  await Promise.all(
    group.players.map((p) => {
      const t = TransitionScreenInAndOut(p.player, false, 1);
      return t;
    }),
  );

  await introCamPromise;

  mod.PlayMusic(mod.MusicEvents.Gauntlet_Stop, group.team);

  // Teleport after all screens are in
  await TeleportGroupBetweenPoints(
    group,
    v3ToVector(holeData.teeOffPlayerPts[0]),
    v3ToVector(holeData.teeOffPlayerPts[1]),
  );

  await mod.Wait(0.5);

  SetGroupPhase(group, "PLAYING_TEEOFF");

  SetDefaultShotsInGroup(group);

  for (const p of group.players) {
    mod.SetCameraTypeForPlayer(p.player, mod.Cameras.FirstPerson);
    mod.EnableUIInputMode(false, p.player);

    SetupGroupPlayersUI(group, p.player);

    UpdateGameScoreboardForPlayer(p.player);

    const ps = GetValidPlayerState(p.player);
    if (!ps) return;

    SetPlayerBallSurfaceType(p.player, SurfaceType.TeeBox);
  }

  LogEvent(
    1,
    InitializeGroupNextHole.name,
    `Hole ${group.currentHole} initialized. Next hole: ${group.nextHole}.`,
    { gid: group.groupId, main: LogOType.Group },
  );

  InitializeNextShot(group);
}

function SpawnGolfBag(group: CourseGroup) {
  const holeData = GetHoleData(group.currentHole);
  if (!holeData) return;

  UnspawnGolfBag(group);

  const middlePt = PointBetweenTwoPoints(
    holeData.teeOffPlayerPts[0],
    holeData.teeOffPlayerPts[1],
  );

  const teeOffPt = holeData.teeOffPt;
  const midPos = PointBetweenTwoPoints(middlePt, teeOffPt);
  const midPosY = GetTerrainHeight(group.currentHole, midPos);

  if (midPosY && holeData.spawnBag) {
    const finalPos = { x: midPos.x, y: midPosY, z: midPos.z };

    if (group.golfBagObject) mod.UnspawnObject(group.golfBagObject);

    group.golfBagObject = mod.SpawnObject(
      modelGolfBag,
      v3ToVector(finalPos),
      ZERO_VEC,
    );
  }
}

function UnspawnGolfBag(group: CourseGroup) {
  if (group.golfBagObject) mod.UnspawnObject(group.golfBagObject);
  group.golfBagObject = null;
}

function SpawnHolePanel(group: CourseGroup) {
  const holeData = GetHoleData(group.currentHole);
  if (!holeData) return;

  UnspawnHolePanelForGroup(group);

  const TEE_FORWARD_UNITS = 1;
  const TEE_RIGHT_UNITS = holeData.panelSpawnPosition === "Right" ? 7 : -7;

  const PANEL_FACE_WIDTH = 5.3; // Do not change
  const PANEL_FACE_HEIGHT = 2.6; // Do not change
  const PANEL_FACE_CENTER_UP_OFFSET = 4.54; // Do not change
  const PANEL_SURFACE_OFFSET = 0;

  type HolePx = {
    x: number;
    y: number;
  };

  type UV = {
    u: number;
    v: number;
  };

  const TEXTURE_WIDTH = 2048;
  const TEXTURE_HEIGHT = 957;

  const HOLE_TEXTURE_PX: Record<number, HolePx> = {
    1: { x: 1033, y: 390 },
    2: { x: 1240, y: 379 },
    3: { x: 1445, y: 425 },
    4: { x: 1143, y: 481 },
    5: { x: 1005, y: 520 },
    6: { x: 890, y: 501 },
    7: { x: 788, y: 476 },
    8: { x: 615, y: 737 },
    9: { x: 689, y: 474 },
    10: { x: 314, y: 560 },
    11: { x: 279, y: 580 },
    12: { x: 272, y: 615 },
    13: { x: 201, y: 453 },
    14: { x: 212, y: 495 },
    15: { x: 479, y: 515 },
    16: { x: 300, y: 238 },
    17: { x: 382, y: 378 },
    18: { x: 541, y: 414 },
  };

  /*// Markers on while hole number cirlces
  // const TEXTURE_WIDTH = 1043;
  const TEXTURE_HEIGHT = 512;

  const HOLE_TEXTURE_PX: Record<number, HolePx> = {
    1: { x: 473, y: 201 },
    2: { x: 595, y: 201 },
    3: { x: 679, y: 235 },
    4: { x: 548, y: 289 },
    5: { x: 475, y: 240 },
    6: { x: 482, y: 313 },
    7: { x: 409, y: 363 },
    8: { x: 365, y: 311 },
    9: { x: 292, y: 355 },
    10: { x: 304, y: 320 },
    11: { x: 228, y: 349 },
    12: { x: 233, y: 373.5 },
    13: { x: 61, y: 256 },
    14: { x: 160.5, y: 258 },
    15: { x: 247, y: 272 },
    16: { x: 155, y: 171 },
    17: { x: 191.5, y: 162.5 },
    18: { x: 361, y: 202 },
  };*/

  const HOLE_TEXTURE_PX_OFFSET: Record<number, HolePx> = {
    1: { x: 0, y: 0 },
    2: { x: 0, y: 0 },
    3: { x: 0, y: 0 },
    4: { x: 0, y: 0 },
    5: { x: 0, y: 0 },
    6: { x: 0, y: 0 },
    7: { x: 0, y: 0 },
    8: { x: 0, y: 0 },
    9: { x: 0, y: 0 },
    10: { x: 0, y: 0 },
    11: { x: 0, y: 0 },
    12: { x: 0, y: 0 },
    13: { x: 0, y: 0 },
    14: { x: 0, y: 0 },
    15: { x: 0, y: 0 },
    16: { x: 0, y: 0 },
    17: { x: 0, y: 0 },
    18: { x: 0, y: 0 },
  };

  function PxToUV(px: HolePx): UV {
    return {
      u: px.x / TEXTURE_WIDTH,
      v: px.y / TEXTURE_HEIGHT,
    };
  }

  function GetHoleUV(holeNumber: number): UV | undefined {
    const base = HOLE_TEXTURE_PX[holeNumber];
    if (!base) return undefined;

    const offset = HOLE_TEXTURE_PX_OFFSET[holeNumber] ?? { x: 0, y: 0 };

    return PxToUV({
      x: base.x + offset.x,
      y: base.y + offset.y,
    });
  }

  const playerPt0 = holeData.teeOffPlayerPts[0];
  const playerPt1 = holeData.teeOffPlayerPts[1];
  const teeOffPt = holeData.teeOffPt;

  function NormalizeXZ(v: V3): V3 {
    const len = Math.sqrt(v.x * v.x + v.z * v.z);

    return {
      x: v.x / len,
      y: 0,
      z: v.z / len,
    };
  }

  function AddScaled(base: V3, dir: V3, scale: number): V3 {
    return {
      x: base.x + dir.x * scale,
      y: base.y + dir.y * scale,
      z: base.z + dir.z * scale,
    };
  }

  function GetLocalOffsetFromUV(uv: UV): V3 {
    return {
      x: (uv.u - 0.5) * PANEL_FACE_WIDTH,
      y: PANEL_FACE_CENTER_UP_OFFSET + (0.5 - uv.v) * PANEL_FACE_HEIGHT,
      z: 0,
    };
  }

  function GetPanelFaceWorldPos(localX: number, localY: number): V3 {
    let pos = finalPos;
    pos = AddScaled(pos, panelRight, localX);
    pos = AddScaled(pos, panelUp, localY);
    pos = AddScaled(pos, panelForward, PANEL_SURFACE_OFFSET);
    return pos;
  }

  // right direction along player line
  const right = NormalizeXZ({
    x: playerPt1.x - playerPt0.x,
    y: 0,
    z: playerPt1.z - playerPt0.z,
  });

  // perpendicular forward direction
  const forward: V3 = {
    x: right.z,
    y: 0,
    z: -right.x,
  };

  const finalPos: V3 = {
    x: teeOffPt.x + forward.x * TEE_FORWARD_UNITS + right.x * TEE_RIGHT_UNITS,
    y: teeOffPt.y - 2.5,
    z: teeOffPt.z + forward.z * TEE_FORWARD_UNITS + right.z * TEE_RIGHT_UNITS,
  };

  group.holePanelObject = mod.SpawnObject(
    rte.GolfSign_Large_01,
    v3ToVector(finalPos),
    mod.CreateVector(
      0,
      YawTowards(v3ToVector(finalPos), v3ToVector(teeOffPt)),
      0,
    ),
    mod.CreateVector(3, 3, 3),
  );

  // The sign faces toward the tee, so its forward direction is from panel -> tee
  const panelForward = NormalizeXZ({
    x: teeOffPt.x - finalPos.x,
    y: 0,
    z: teeOffPt.z - finalPos.z,
  });

  const panelRight: V3 = {
    x: panelForward.z,
    y: 0,
    z: -panelForward.x,
  };

  const panelUp: V3 = {
    x: 0,
    y: 1,
    z: 0,
  };

  const holeNumber = holeData.panelHoleNumber;

  const uv = GetHoleUV(holeNumber);

  let iconPos: V3 = {
    x: finalPos.x,
    y: finalPos.y + 6,
    z: finalPos.z,
  };

  if (uv) {
    const local = GetLocalOffsetFromUV(uv);
    iconPos = GetPanelFaceWorldPos(local.x, local.y);
  }

  for (const p of group.players) {
    if (
      !mod.IsPlayerValid(p.player) ||
      GetGroupFromPlayer(p.player)?.groupId != group.groupId
    )
      continue;

    const pps = GetValidPlayerState(p.player);
    if (!pps) continue;

    const pid = mod.GetObjId(p.player);

    pps.general.holePanelWorldIconName =
      "HolePanel_WI_" + group.groupId + "_" + pid + "_" + holeNumber;

    WIM.setup().createIcon(
      pps.general.holePanelWorldIconName,
      v3ToVector(iconPos),
      {
        color: UI.COLORS.WHITE,
        icon: mod.WorldIconImages.Cross,
        iconEnabled: true,
        text: mod.Message(
          "HOLE_PANEL_NUMBER" + pps.general.languageSuffix,
          holeNumber,
        ),
        textEnabled: true,
        playerOwner: p.player,
      },
    );
  }
}

function UnspawnHolePanelWIForPlayer(pid: number) {
  const ps = players[pid];
  if (!ps) return;

  if (
    ps.general.holePanelWorldIconName &&
    WIM.setup().hasIcon(ps.general.holePanelWorldIconName)
  ) {
    WIM.setup().deleteIcon(ps.general.holePanelWorldIconName);
    ps.general.holePanelWorldIconName = null;
  }
}

function UnspawnHolePanelForGroup(
  group: CourseGroup,
  removeIconOnly: boolean = true,
) {
  if (group.holePanelObject != null && !removeIconOnly) {
    mod.UnspawnObject(group.holePanelObject);
    group.holePanelObject = null;
  }

  for (const p of group.players) {
    if (
      !mod.IsPlayerValid(p.player) ||
      GetGroupFromPlayer(p.player)?.groupId != group.groupId
    )
      continue;

    const pps = GetValidPlayerState(p.player);
    if (!pps) continue;

    if (
      pps.general.holePanelWorldIconName &&
      WIM.setup().hasIcon(pps.general.holePanelWorldIconName)
    ) {
      WIM.setup().deleteIcon(pps.general.holePanelWorldIconName);
      pps.general.holePanelWorldIconName = null;
    }
  }
}

function SpawnFlagPole(group: CourseGroup) {
  const holeData = GetHoleData(group.currentHole);
  if (!holeData) return;

  if (holeData.spawnFlag) {
    UnspawnFlagPole(group);

    group.flagPoleObject = mod.SpawnObject(
      rtc.GolfFlagStickPole_01,
      v3ToVector(holeData.flagPt),
      ZERO_VEC,
    );
  }
}

function UnspawnFlagPole(group: CourseGroup) {
  if (!group) return;
  if (group.flagPoleObject != null) mod.UnspawnObject(group.flagPoleObject);
}

async function SpawnCarts(group: CourseGroup) {
  if (!group) return;

  const gs = AllGroups[group.groupId];
  if (!gs) return;

  const holeData = GetHoleData(group.currentHole);
  if (!holeData) return;

  const cartPts = holeData.cartPts;
  const cartCount = Math.min(2, cartPts ? cartPts.length : 0);

  if (cartCount <= 0) return;

  const spawnYaw =
    cartPts.length >= 2
      ? YawTowards(v3ToVector(cartPts[1]), v3ToVector(cartPts[0]))
      : 0;

  for (let cartIndex = 0; cartIndex < cartCount; cartIndex++) {
    const pt = cartPts[cartIndex];
    if (!pt) {
      continue;
    }

    const pos = v3ToVector({ x: pt.x, y: pt.y + 1, z: pt.z });
    const rot = mod.CreateVector(0, 0.5, 0);

    const spawnerObject = mod.SpawnObject(
      mod.RuntimeSpawn_Common.VehicleSpawner,
      pos,
      ZERO_VEC,
    );

    mod.RotateObject(spawnerObject, rot);

    mod.SetVehicleSpawnerVehicleType(spawnerObject, mod.VehicleList.GolfCart);
    mod.SetVehicleSpawnerAutoSpawn(spawnerObject, true);
    mod.SetVehicleSpawnerRespawnTime(spawnerObject, 5);
    mod.SetVehicleSpawnerTimeUntilAbandon(spawnerObject, 30);

    const before = mod.AllVehicles();
    const beforeCount = mod.CountOf(before);

    const beforeIds: number[] = [];
    for (let j = 0; j < beforeCount; j++) {
      const v = mod.ValueInArray(before, j);
      beforeIds.push(mod.GetObjId(v));
    }

    mod.ForceVehicleSpawnerSpawn(spawnerObject);

    let spawned: mod.Vehicle | null = null;

    for (let it = 0; it < 50; it++) {
      const after = mod.AllVehicles();
      const afterCount = mod.CountOf(after);

      for (let k = 0; k < afterCount; k++) {
        const v = mod.ValueInArray(after, k);
        const id = mod.GetObjId(v);

        const vPos = GetVehiclePos(v);
        const distToSpawn = DistanceBetween(
          pos,
          vPos,
          DistanceType.XYZ,
          DistanceUnit.Meters,
          1,
        ).wholeWithDecimals;

        if (!beforeIds.includes(id) && distToSpawn <= 5) {
          spawned = v;
          break;
        }
      }

      if (spawned) break;
      await mod.Wait(0.1);
    }

    if (!spawned) {
      if (spawnerObject != null) mod.UnspawnObject(spawnerObject);
      continue;
    }

    AllVehicleSpawners.push({
      object: spawnerObject,
      id: mod.GetObjId(spawnerObject),
      groupId: group.groupId,
      spawnPos: pt,
      spawnYaw: spawnYaw,
      vehicle: spawned,
      vehicleId: mod.GetObjId(spawned),
    });
  }
}

async function DestroyCarts(group: CourseGroup) {
  if (!group) return;

  const gid = group.groupId;

  for (let i = AllVehicleSpawners.length - 1; i >= 0; i--) {
    const spawner = AllVehicleSpawners[i];
    if (!spawner || spawner.groupId !== gid) continue;

    // Destroy the spawned vehicle
    if (spawner.vehicle) {
      try {
        mod.ForcePlayerExitVehicle(spawner.vehicle);
        await mod.Wait(0.25);

        // Move it away before killing to avoid collateral physics
        const pos = vectorToV3(
          mod.GetVehicleState(
            spawner.vehicle,
            mod.VehicleStateVector.VehiclePosition,
          ),
        );
        mod.Teleport(
          spawner.vehicle,
          v3ToVector(v3(pos.x, pos.y - 40, pos.z)),
          0,
        );

        await mod.Wait(0.25);

        mod.DealDamage(spawner.vehicle, 9999);
        await mod.Wait(0.1);
      } catch (e) {
        // If the vehicle became invalid between checks,  keep going
        LogError(
          DestroyCarts.name,
          `Failed to destroy vehicle for SpawnerId=${spawner.id} (${e})`,
          12,
        );
      }
    }

    // Always unspawn the spawner object, regardless of vehicle state
    try {
      if (
        spawner.object != null &&
        mod.GetObjId(spawner.object) === spawner.id
      ) {
        mod.UnspawnObject(spawner.object as mod.Object);
      }
    } catch (e) {
      LogError(
        DestroyCarts.name,
        `Failed to unspawn spawner for SpawnerId=${spawner.id} (${e})`,
        12,
      );
    }

    // Remove from tracking list
    AllVehicleSpawners.splice(i, 1);
  }
}

async function CreatePlayingBallFx(group: CourseGroup) {
  if (!group) return;

  if (group.playingBallFx != null) mod.UnspawnObject(group.playingBallFx);

  const vfxEnabled = false;

  group.playingBallFx = await PlayVFX(
    vfxPlayingBall,
    ZERO_VEC,
    vfxEnabled,
    true,
  );

  mod.SetVFXScale(group.playingBallFx, 0.1);
}

async function SetPlayingBallFx(group: CourseGroup, player: mod.Player) {
  if (!group) return;

  const ps = GetValidPlayerState(player);
  if (!ps) return;

  if (group.playingBallFx == null) {
    await CreatePlayingBallFx(group);
  }

  if (ps.ball.object && ps.ball.lastObjectPos && group.playingBallFx) {
    mod.MoveVFX(
      group.playingBallFx,
      v3ToVector(ps.ball.lastObjectPos),
      ZERO_VEC,
    );
    mod.EnableVFX(group.playingBallFx, true);

    mod.SetVFXScale(group.playingBallFx, 0.1);
  }
}

function HidePlayingBallFx(group: CourseGroup) {
  if (!group) return;
  if (group.playingBallFx == null) {
    CreatePlayingBallFx(group);
  } else {
    mod.EnableVFX(group.playingBallFx, false);
  }
}

function DeletePlayingBallFx(group: CourseGroup) {
  if (!group) return;
  if (group.playingBallFx != null) {
    mod.UnspawnObject(group.playingBallFx);
    group.playingBallFx = null;
  }
}

function SetFlagWorldIcon(group: CourseGroup, holeData: HoleData) {
  const wim = WIM.setup();

  const iconName = `${group.groupId}_FlagWorldIcon`;
  const iconPos = v3ToVector({
    x: holeData.flagPt.x,
    y: holeData.flagPt.y + PIN_ICON_Y_OFFSET,
    z: holeData.flagPt.z,
  });
  //const distance = DistanceBetween(iconPos, v3ToVector(holeData.teeOffPt), "yd", 1);

  // No need to delete previous icon, as it will be overwritten
  wim.createIcon(iconName, iconPos, {
    icon: mod.WorldIconImages.Flag,
    textEnabled: true,
    text: mod.Message("{}", group.currentHole),
    iconEnabled: true,
    color: UICOLORS.ENEMY_PRIMARY,
    teamOwner: group.team,
  });

  group.flagWorldIconName = iconName;
}

async function SpawnFlagFx(group: CourseGroup, holeData: HoleData) {
  const fxPos = v3ToVector({
    x: holeData.flagPt.x,
    y: holeData.flagPt.y - 98,
    z: holeData.flagPt.z,
  });

  group.flagFx = await PlayVFX(vfxPlayingBall, fxPos, false, true);
}

function DeleteFlagFx(group: CourseGroup) {
  if (!group.flagFx) return;

  mod.UnspawnObject(group.flagFx);
  group.flagFx = null;
}

function HideFlagFx(group: CourseGroup) {
  if (!group.flagFx) return;
  mod.EnableVFX(group.flagFx, false);
}

function ShowFlagFx(group: CourseGroup) {
  if (!group.flagFx) return;
  mod.EnableVFX(group.flagFx, true);
}

function SetFlagFxVisibility(
  group: CourseGroup | null,
  ballPos: V3 | undefined | null,
) {
  if (!group || !ballPos) return;

  const surface = DetectSurfaceType(group.currentHole, ballPos);

  if (surface === SurfaceType.Green) {
    HideFlagFx(group);
  } else {
    ShowFlagFx(group);
  }
}

function DeleteFlagWorldIcon(group: CourseGroup) {
  if (!group) return;
  const wim = WIM.setup();
  const icon = group.flagWorldIconName;
  if (icon && typeof icon === "string") {
    if (wim.hasIcon(icon)) wim.deleteIcon(icon);
    group.flagWorldIconName = null;
  }

  LogEvent(1, DeleteFlagWorldIcon.name, `Deleted flag world icon.`, {
    gid: group.groupId,
    main: LogOType.Group,
  });
}

async function OnPlayerFailedtoInteractWithBall(player: mod.Player) {
  if (!mod.IsPlayerValid(player)) return;

  const pid = mod.GetObjId(player);
  const ps = players[pid];

  const group = GetGroupFromPlayer(pid);
  if (!group) return;

  const gid = group.groupId;

  ps.course.failedInteractAttempts += 1;

  if (GetPlayerGeneralPhase(pid) === "IDLE") {
    DeleteBallInteractPoint(pid);
  } else if (GetPlayerGeneralPhase(pid) === "SWING_SETUP") {
    SetPostSwingState(player);
  }

  mod.SetCameraTypeForPlayer(player, mod.Cameras.FirstPerson);

  if (ps.course.failedInteractAttempts >= MAX_FAILED_INTERACT_ATTEMPTS) {
    await ShowNotification(
      { type: "group", id: gid },
      {
        main: mod.Message(
          "FAILED_INTERACT_FINAL" +
            (GetGroupLanguage(group) === "cn" ? "_C" : ""),
          player,
        ),
        comment: mod.Message(
          "FAILED_INTERACT_COMMENT" +
            (GetGroupLanguage(group) === "cn" ? "_C" : ""),
          ps.course.failedInteractAttempts,
        ),
      },
      NotifyPosition.Bottom,
      4,
      {
        displayProgressBar: true,
      },
    );

    LogEvent(
      1,
      OnPlayerFailedtoInteractWithBall.name,
      `Removing player from group due to ${ps.course.failedInteractAttempts} failed interactions.`,
      {
        pid,
        gid,
        main: LogOType.Player,
      },
    );

    mod.EnableUIInputMode(true, player);
    await TransitionScreenInAndOut(player, true, 0.8);

    PlayVFX(rtc.FX_Gadget_C4_Explosives_Detonation, GetPlayerPos(player));

    const flagPos = v3ToVector(GetHoleData(group.currentHole).flagPt);
    const pos = vectorToV3(GetPlayerPos(player));
    const offsetPos = v3ToVector({ x: pos.x, y: pos.y + 50, z: pos.z });

    mod.Teleport(player, offsetPos, YawTowards(offsetPos, flagPos));

    await mod.Wait(0.5);

    await RemovePlayerFromGroup(pid);

    await TransitionScreenInAndOut(player, false, 0.8);
    mod.EnableUIInputMode(false, player);
  } else {
    let commentMsg: mod.Message;

    if (ps.course.failedInteractAttempts === 1) {
      commentMsg = mod.Message(
        "FAILED_INTERACT_COMMENT_SINGLE" +
          (GetGroupLanguage(group) === "cn" ? "_C" : ""),
      );
    } else {
      commentMsg = mod.Message(
        "FAILED_INTERACT_COMMENT" +
          (GetGroupLanguage(group) === "cn" ? "_C" : ""),
        ps.course.failedInteractAttempts,
      );
    }

    await ShowNotification(
      { type: "group", id: gid },
      {
        main: mod.Message(
          "FAILED_INTERACT" + (GetGroupLanguage(group) === "cn" ? "_C" : ""),
          player,
          ps.course.failedInteractAttempts,
          MAX_FAILED_INTERACT_ATTEMPTS,
        ),
        comment: commentMsg,
      },
      NotifyPosition.Center,
      8,
      {
        displayProgressBar: true,
      },
    );

    LogEvent(
      1,
      OnPlayerFailedtoInteractWithBall.name,
      `Player failed to interact with ball. Attempt ${ps.course.failedInteractAttempts}/${MAX_FAILED_INTERACT_ATTEMPTS}.`,
      {
        pid,
        gid,
        main: LogOType.Player,
      },
    );

    SetPlayerCurrentShot(pid, GetPlayerCurrentShot(pid) + 1);
    InitializeNextShot(group);
  }
}

async function InitializeNextShot(group: CourseGroup) {
  const plist = group.players;

  if (plist.length === 0) {
    DeleteGroup(group.groupId);
    return;
  }

  if (group.currentPlayer != null) {
    group.previousPlayer = group.currentPlayer;
  }

  if (GetGroupPhase(group) === "PLAYING_TEEOFF") {
    let stillAtTee = false;

    for (const p of group.players) {
      if (BallIsAtTeeOff(group, p.player)) {
        stillAtTee = true;
        break;
      }
    }

    if (!stillAtTee) {
      SetGroupPhase(group, "PLAYING_COURSE");
    }
  }

  const nextPlayer = await SetNextPlayerInGroupTurn(group);
  const nextPid = nextPlayer ? mod.GetObjId(nextPlayer) : null;

  if (nextPlayer == null || nextPid == null || !mod.IsPlayerValid(nextPlayer)) {
    LogError(
      InitializeNextShot.name,
      `No valid next player in Group (${group.groupId}).`,
      12,
    );

    FinalizeGroupGame(group);
    return;
  } else {
    if (group.players.length > 0) {
      mod.PlayMusic(playerRoundMusic, nextPlayer);
    }

    await mod.Wait(0.1);

    const nps = GetValidPlayerState(nextPlayer);
    if (!nps) return;

    mod.DisplayHighlightedWorldLogMessage(
      mod.Message(
        "NEXT_PLAYER" + nps.general.languageSuffix,
        nextPlayer as mod.Player,
      ),
      group.team,
    );

    UpdateGameScoreboardForPlayer(nextPlayer);

    for (const p of plist) {
      if (!mod.IsPlayerValid(p.player)) continue;

      if (p.pid === nextPid) {
        const ps = GetValidPlayerState(p.player);
        if (!ps) continue;

        const distanceYd =
          group.courseMode === "FAST" ? 0 : ps.ball.lastShotDistance;
        const rawTime = Math.max(
          BALL_REACH_SECOND_MIN,
          distanceYd * BALL_REACH_SECOND_PER_YD,
        );
        let timer = Math.round(rawTime);

        if (group.phase === "PLAYING_TEEOFF") timer += TEE_OFF_EXTRA_SECONDS;

        InitTurnTimer(p.player, timer);

        const firstShot = GetPlayerCurrentShot(p.pid) === 1;

        if (firstShot) {
          ps.course.onFirstShot = true;
          if (group.currentHole === GetCourseTotalHoles()) {
            PlayVO(mod.VoiceOverEvents2D.RoundLastRound, { player: p.player });
          } else {
            PlayVO(mod.VoiceOverEvents2D.RoundStartGeneric, {
              player: p.player,
            });
          }
        } else {
          ps.course.onFirstShot = false;
        }
      }
    }

    if (GetGroupPhase(group) === "PLAYING_COURSE") {
      for (const p of plist) {
        SetupGroupPlayersUI(group, p.player);
        SetPlayerIdleCourseRestrictions(p.player);
      }

      UnspawnHolePanelForGroup(group, true);
    } else if (GetGroupPhase(group) === "PLAYING_TEEOFF") {
      for (const p of plist) {
        SetupGroupPlayersUI(group, p.player);
        if (group.courseMode === "FAST") {
          SetPlayerIdleCourseRestrictions(p.player);
        } else {
          SetPlayerSwingRestrictions(p.player);
        }
      }

      // Teleport previous player back to tee-off area
      if (group.previousPlayer && mod.IsPlayerValid(group.previousPlayer)) {
        const ppid = mod.GetObjId(group.previousPlayer);

        const pps = GetValidPlayerState(group.previousPlayer);

        if (pps && pps.course.onFirstShot && group.courseMode !== "FAST") {
          await mod.Teleport(
            group.previousPlayer,
            players[ppid].course.teeOffPoint!,
            YawTowards(
              players[ppid].course.teeOffPoint!,
              v3ToVector(GetHoleData(group.currentHole).teeOffPt),
            ),
          );
        }
      }

      SetPlayerIdleCourseRestrictions(nextPlayer);

      const spawnPos = GetHoleData(group.currentHole).teeOffPt;
      SpawnPlayerBall(nextPlayer, v3ToVector(spawnPos));
    }

    CreateBallInteractPoint(nextPlayer, group);
    SetPlayerSwingLocked(nextPid, false);
    SetPlayingBallFx(group, nextPlayer);
  }

  LogEvent(1, InitializeNextShot.name, `Next shot initialized.`, {
    gid: group.groupId,
    pid: nextPid,
    main: LogOType.Group,
  });
}

function BallIsAtTeeOff(group: CourseGroup, player: mod.Player): boolean {
  const teePos = GetHoleData(group.currentHole).teeOffPt;
  const pid = mod.GetObjId(player);
  const ballPos = players[pid].ball.lastObjectPos;
  if (!ballPos) return true;

  const dx = ballPos.x - teePos.x;
  const dz = ballPos.z - teePos.z;
  return dx * dx + dz * dz < 0.25; // within 0.5m
}

function CreateBallInteractPoint(player: mod.Player, group: CourseGroup) {
  if (!mod.IsPlayerValid(player)) return;

  const ps = players[mod.GetObjId(player)];
  const ballPos = ps.ball.object
    ? vectorToV3(mod.GetObjectPosition(ps.ball.object))
    : null;

  if (ps.ball.interactPoint != null) {
    mod.UnspawnObject(ps.ball.interactPoint);
    ps.ball.interactPoint = null;
  }

  const previousGroupPlayer = group.previousPlayer;
  if (previousGroupPlayer) {
    const previousPid = mod.GetObjId(previousGroupPlayer);
    const previousPs = players[previousPid];

    if (previousPs.ball.interactPoint != null) {
      mod.UnspawnObject(previousPs.ball.interactPoint);
      previousPs.ball.interactPoint = null;
    }
  }

  if (ballPos) {
    const intPos = {
      x: ballPos.x,
      y: ballPos.y + BALL_INTERACT_POINT_Y_OFFSET,
      z: ballPos.z,
    };

    const bip: mod.InteractPoint = mod.SpawnObject(
      rtc.InteractPoint,
      v3ToVector(intPos),
      ZERO_VEC,
    );
    ps.ball.interactPoint = bip;
  }
}

function DeleteBallInteractPoint(pid: number) {
  const ps = players[pid];
  if (!ps) return;

  if (ps.ball.interactPoint != null) {
    mod.UnspawnObject(ps.ball.interactPoint);
    ps.ball.interactPoint = null;
    LogEvent(1, DeleteBallInteractPoint.name, `Deleted ball interact point.`, {
      pid,
      main: LogOType.Player,
    });
  }
}

function SetDefaultShotsInGroup(group: CourseGroup) {
  if (!group) return;

  let resetCount: number;

  if (GetGroupPhase(group) === "LOBBY") {
    resetCount = 0;
  } else {
    resetCount = 1;
  }

  LogEvent(
    1,
    SetDefaultShotsInGroup.name,
    `Setting all shots in group to ${resetCount}.`,
    { gid: group.groupId, main: LogOType.Group },
  );

  const gp = group.players;

  for (let i = 0; i < gp.length; i++) {
    const pid = gp[i].pid;

    if (players[pid]) {
      SetPlayerCurrentShot(pid, resetCount);
    }
  }
}

/*function SetNextPlayerInGroupTurn(group: CourseGroup): mod.Player | null {
  if (!group) return null;

  const plist = group.players;
  const count = plist.length;

  // Locate current index, if any
  let currentIndex = -1;
  for (let i = 0; i < count; i++) {
    if (
      group.currentPlayer &&
      mod.GetObjId(group.currentPlayer) === plist[i].pid
    ) {
      currentIndex = i;
      break;
    }
  }

  let nextIndex = 0;

  if (currentIndex === -1) {
    // Nobody is currentTurn; select first
    nextIndex = 0;
  } else {
    // Someone is currentTurn; move to next (with wrap-around)
    nextIndex = (currentIndex + 1) % count;
  }

  // Assign next player as currentTurn
  return (group.currentPlayer = plist[nextIndex].player);
}*/

function SetNextPlayerInGroupTurn(group: CourseGroup): mod.Player | null {
  if (!group) return null;

  if (group.players.length === 0) {
    DeleteGroup(group.groupId);
    return null;
  }

  const holeData = GetHoleData(group.currentHole);
  if (!holeData) return null;

  const flagPos = v3ToVector(holeData.flagPt);

  let maxDistance = -1;
  const eps = 0.001; // meters
  let candidates: CourseGroup["players"] = [];

  const toRemove: number[] = [];

  // Compute distances
  for (const p of group.players) {
    if (!mod.IsPlayerValid(p.player)) {
      toRemove.push(p.pid);
      continue;
    }

    const thisPs = GetValidPlayerState(p.player);
    if (!thisPs) continue;

    let dist = thisPs.ball.distanceToFlag;
    if (dist == null || !isFinite(dist)) {
      dist = 0;
    }

    if (dist > maxDistance + eps) {
      maxDistance = dist;
      candidates = [p];
    } else if (Math.abs(dist - maxDistance) <= eps) {
      candidates.push(p);
    }
  }

  // Remove invalid players
  for (const pid of toRemove) {
    RemovePlayerFromGroup(pid);
    if (!group) return null;
  }

  if (candidates.length === 0) {
    group.currentPlayer = null;
    return null;
  }

  // Resolve selection
  let selected: mod.Player | null;

  const phase = GetGroupPhase(group);

  // Helper: leaders[0] if available+valid
  const leaders = GetGroupCurrentLeaders(group);
  const leader0 =
    leaders && leaders.length > 0 && mod.IsPlayerValid(leaders[0])
      ? leaders[0]
      : null;

  const prev = group.previousPlayer;
  const prevPid = prev ? mod.GetObjId(prev) : -1;
  const prevStillInGroup = group.players.some((p) => p.pid === prevPid);
  const prevValid = !!prev && prevStillInGroup && mod.IsPlayerValid(prev);

  const firstValidPlayer = (
    pred?: (gp: CourseGroup["players"][number]) => boolean,
  ) =>
    group.players.find((p) => mod.IsPlayerValid(p.player) && (!pred || pred(p)))
      ?.player ?? null;

  const isAtTee = (player: mod.Player): boolean => {
    const ps = GetValidPlayerState(player);
    if (!ps) return false;

    const ballPos = ps.ball.lastObjectPos ?? holeData.teeOffPt;
    const distToTee = DistanceBetween(
      v3ToVector(ballPos),
      v3ToVector(holeData.teeOffPt),
      DistanceType.XZ,
      DistanceUnit.Meters,
      1,
    ).wholeWithDecimals;

    return distToTee <= 1;
  };

  // selection
  if (group.players.length === 1) {
    selected = group.players[0].player;
  } else if (phase === "PLAYING_TEEOFF") {
    if (!prevValid) {
      selected = leader0 ?? firstValidPlayer();
    } else if (prevValid && isAtTee(prev!)) {
      selected = prev!;
    } else {
      selected =
        firstValidPlayer((p) => p.pid !== prevPid && isAtTee(p.player)) ??
        firstValidPlayer((p) => p.pid !== prevPid);
    }
  } else {
    // PLAYING_COURSE
    if (candidates.length === 0) {
      selected = null;
    } else if (candidates.length === 1) {
      selected = candidates[0].player;
    } else if (prevValid) {
      selected =
        candidates.find((p) => p.pid === prevPid)?.player ??
        candidates[0].player;
    } else {
      selected = candidates[0].player;
    }
  }

  if (!selected) {
    group.currentPlayer = null;
    return null;
  }

  group.currentPlayer = selected;
  return selected;
}

function AllPlayersInGroupReady(group: CourseGroup): boolean {
  const gp = group.players;

  for (let i = 0; i < gp.length; i++) {
    const pid = gp[i].pid;
    if (!GetPlayerIsReady(pid)) {
      return false;
    }
  }
  return true;
}

function TeleportGroupBetweenPoints(
  group: CourseGroup,
  pt1: mod.Vector,
  pt2: mod.Vector,
) {
  const count = group.players.length;
  if (count === 0) return;

  // extract components from pt1 and pt2
  const x1 = mod.XComponentOf(pt1);
  const y1 = mod.YComponentOf(pt1) + 1;
  const z1 = mod.ZComponentOf(pt1);

  const x2 = mod.XComponentOf(pt2);
  const y2 = mod.YComponentOf(pt2) + 1;
  const z2 = mod.ZComponentOf(pt2);

  for (let i = 0; i < count; i++) {
    const t = count === 1 ? 0 : i / (count - 1); // interpolation fraction

    const x = x1 + (x2 - x1) * t;
    const y = y1 + (y2 - y1) * t;
    const z = z1 + (z2 - z1) * t;

    const holeData = GetHoleData(group.currentHole);

    const teleportPos = mod.CreateVector(x, y, z);

    const orientationTowards =
      holeData.teeOffSpawnDirection === "TowardsTeeOff"
        ? v3ToVector(holeData.teeOffPt)
        : v3ToVector(holeData.flagPt);
    const spawnOrientation = YawTowards(teleportPos, orientationTowards);

    const player = group.players[i].player;
    const pid = group.players[i].pid;
    if (mod.IsPlayerValid(player)) {
      mod.Teleport(player, teleportPos, spawnOrientation);
      players[pid].course.teeOffPoint = teleportPos;
    }

    LogEvent(
      1,
      TeleportGroupBetweenPoints.name,
      `Player teleported to Hole ${group.currentHole} Tee-Off with orientation ${spawnOrientation}.`,
      { pid, gid: group.groupId, main: LogOType.Group },
    );
  }
}

//************************
// -/ PLAYER POSITION ON BALL STOPPED
//************************

async function HandlePlayerPosOnStopped(player: mod.Player) {
  const ps = GetValidPlayerState(player);
  if (!ps) return;

  const pid = mod.GetObjId(player);

  const group = GetGroupFromPlayer(player);
  if (!group) return;

  const groupCourseMode = GetGroupCourseMode(group);

  if (
    ps.general.holePanelWorldIconName &&
    WIM.setup().hasIcon(ps.general.holePanelWorldIconName)
  ) {
    WIM.setup().setEnabled(ps.general.holePanelWorldIconName, false, false);
  }

  while (players[pid].ball.phase !== "STOPPED" && !players[pid].ball.isInHole) {
    await mod.Wait(0.5);
    if (!mod.IsPlayerValid(player)) return;
  }

  await mod.Wait(2);

  const playerClub = GetPlayerCurrentClub(player).type;

  if (groupCourseMode === "NORMAL" && playerClub !== ClubType.PT) {
    mod.SetCameraTypeForPlayer(player, mod.Cameras.FirstPerson);
  } else if (groupCourseMode === "FAST" && playerClub !== ClubType.PT) {
    if (!ps.ball.isInHole) {
      await TransitionScreenInAndOut(player, true);

      const finalPos =
        ps.ball.lastObjectPos != null
          ? {
              x: ps.ball.lastObjectPos.x,
              y: ps.ball.lastObjectPos.y + 1,
              z: ps.ball.lastObjectPos.z,
            }
          : null;

      if (finalPos != null) {
        const yawTowardsV = GetHoleData(group.currentHole).flagPt;
        const yaw = YawTowards(v3ToVector(finalPos), v3ToVector(yawTowardsV));

        mod.Teleport(player, v3ToVector(finalPos), yaw);

        await mod.Wait(0.5);
      }

      await TransitionScreenInAndOut(player, false);
    }

    mod.SetCameraTypeForPlayer(player, mod.Cameras.FirstPerson);
  }

  if (ps.ball.currentSurface != SurfaceType.TeeBox) {
    UnspawnHolePanelWIForPlayer(pid);
  } else if (
    ps.general.holePanelWorldIconName &&
    WIM.setup().hasIcon(ps.general.holePanelWorldIconName)
  ) {
    WIM.setup().setEnabled(ps.general.holePanelWorldIconName, true, false);
  }
}

//************************
// -/ SWING LOOP
//************************

function SetPlayerSwingLocked(pid: number, locked: boolean) {
  players[pid].swing.locked = locked;
}

function SetPlayerSwingPhase(pid: number, phase: SwingState["phase"]) {
  players[pid].swing.phase = phase;
  LogEvent(1, SetPlayerSwingPhase.name, `Swing phase set to ${phase}.`, {
    pid,
    main: LogOType.Player,
  });
}

function GetPlayerSwingPhase(pid: number): SwingState["phase"] {
  return players[pid].swing.phase;
}

async function StartPlayerSwingLoop(player: mod.Player) {
  const pid = mod.GetObjId(player);
  const psui = players[pid].ui.swingUI;
  const pss = players[pid].swing;
  const club = GetPlayerCurrentClub(player);

  if (pss.running) {
    return;
  }

  mod.EnableAllInputRestrictions(player, true);

  const maxSpeed =
    club.type === ClubType.PT
      ? SWING_SPEED_MAX_PUTTER
      : SWING_SPEED_MAX_DEFAULT;
  let speedFactor = SWING_SPEED_FACTOR_DEFAULT;
  let exponentialFactor = SWING_EXPONENTIAL_FACTOR_DEFAULT;

  // Apply super focus modifier
  if (players[pid].general.activeModifiers.superFocus) {
    speedFactor *= hitModifiers.superFocus.effectFactor;
    exponentialFactor *= hitModifiers.superFocus.effectFactor / 2;
  }

  pss.swingSpeed = SWING_SPEED_START;
  pss.running = true;

  while (
    mod.IsPlayerValid(player) &&
    GetPlayerGeneralPhase(pid) === "SWING" &&
    pss.running
  ) {
    await mod.Wait(GLOBAL_TICK_RATE);

    if (!psui.marker || !psui.root) {
      pss.running = false;
      return;
    }

    const dt = GLOBAL_TICK_RATE;
    const marker = psui.marker;

    let phase = GetPlayerSwingPhase(pid);

    // Moving left 1
    if (phase === "MOVING_LEFT_1") {
      if (pss.running) {
        pss.swingSpeed = Math.min(
          maxSpeed,
          pss.swingSpeed * (1 + speedFactor * dt),
        );
      } else {
        pss.swingSpeed = 1;
      }
      pss.pos -= pss.swingSpeed * dt;

      if (pss.pos <= 0) {
        pss.pos = 0;
        pss.leftLockedPos = 0 + MARKER_WIDTH / 2;
        SetPlayerSwingPhase(pid, "MOVING_RIGHT");
        phase = "MOVING_RIGHT";
      }
      marker.setPosition({ x: pss.pos, y: 0 });

      // Moving right
    } else if (phase === "MOVING_RIGHT") {
      if (pss.running) {
        pss.swingSpeed = Math.min(
          maxSpeed,
          pss.swingSpeed * (1 + speedFactor * exponentialFactor * dt),
        );
      } else {
        pss.swingSpeed = 1;
      }
      pss.pos += pss.swingSpeed * dt;
      if (pss.pos >= SWING_WIDTH - MARKER_WIDTH) {
        pss.pos = SWING_WIDTH - MARKER_WIDTH;
        SetPlayerSwingPhase(pid, "MOVING_LEFT_2");
        phase = "MOVING_LEFT_2";
      }
      marker.setPosition({ x: pss.pos, y: 0 });

      // Moving left 2
    } else if (phase === "MOVING_LEFT_2") {
      if (pss.running) {
        pss.swingSpeed = Math.max(
          100,
          pss.swingSpeed * (1 - ((speedFactor * exponentialFactor) / 1.5) * dt),
        );
      } else {
        pss.swingSpeed = 1;
      }
      pss.pos -= pss.swingSpeed * dt;
      if (pss.pos <= SWING_MID_LINE_X + SWING_LINE_WIDTH / 2) {
        pss.pos = SWING_MID_LINE_X + SWING_LINE_WIDTH / 2;
        pss.rightLockedPos = SWING_MID_LINE_X + SWING_LINE_WIDTH / 2;
        SetPlayerSwingPhase(pid, "STOPPED_MID");
        SetPlayerSwingLocked(pid, true);
        phase = "STOPPED_MID";
      }
      marker.setPosition({ x: pss.pos, y: 0 });
    }

    if (phase === "STOPPED_MID") {
      pss.running = false;

      psui.directionBgLeft?.setBgAlpha(0.05);
      psui.directionBgRight?.setBgAlpha(0.05);
      psui.powerLineBg?.setBgAlpha(0.05);

      psui.leftText?.setTextAlpha(0.6);
      psui.leftImage?.setImageColor(UI.COLORS.WHITE);
      psui.leftText?.setTextColor(UI.COLORS.WHITE);

      psui.rightText?.setTextAlpha(0.6);
      psui.rightImage?.setImageColor(UI.COLORS.WHITE);
      psui.rightText?.setTextColor(UI.COLORS.WHITE);

      FinalizeSwing(player);
      return;
    }
  }
  // If we exit the loop without finalizing the swing, ensure we reset the state
  SetPostSwingState(player);
}

async function FinalizeSwing(player: mod.Player) {
  const pid = mod.GetObjId(player);
  const ps = players[pid];
  const pss = ps.swing;
  const group = GetGroupFromPlayer(player);

  if (!ps) return;

  pss.running = false;

  const leftMarkCenterX = SWING_LEFT_LINE_X + SWING_LINE_WIDTH / 2;
  const rightMarkCenterX = SWING_RIGHT_LINE_X + SWING_LINE_WIDTH / 2;

  let powerValue: number;
  let t: number;
  let horizSpinValue = 0;

  const club = GetPlayerCurrentClub(player);

  if (club.type === ClubType.PT) {
    // We use full bar width for putter
    const distFromRight = rightMarkCenterX - pss.rightLockedPos;
    t = 1 - distFromRight / SWING_WIDTH;
  } else {
    const distFromLeft = pss.leftLockedPos - leftMarkCenterX;

    const maxHorizontalSpin = 1; // max spin value either negative (left) or positive (right)
    horizSpinValue =
      maxHorizontalSpin * ((distFromLeft / LEFT_BUFFER_WIDTH) * 2);

    if (horizSpinValue < -maxHorizontalSpin)
      horizSpinValue = -maxHorizontalSpin;
    if (horizSpinValue > maxHorizontalSpin) horizSpinValue = maxHorizontalSpin;

    horizSpinValue = ApplySurfaceAccuracyPenalty(player, horizSpinValue);

    // We use the buffer width only for non-putter
    const distFromRight = rightMarkCenterX - pss.rightLockedPos;
    t = 1 - distFromRight / RIGHT_BUFFER_WIDTH;
  }
  const maxPower = GetPlayerPowerFactor(pid);
  const minPower = maxPower * 0.5;

  powerValue = minPower + (maxPower - minPower) * t;
  if (powerValue < minPower) powerValue = minPower;
  if (powerValue > maxPower) powerValue = maxPower;

  const powerFactor = powerValue;

  if (!group) return;

  if (ps.general.activeModifiers.powerHit) {
    PlayVFX(
      rtc.FX_CivCar_Tire_fire_S_GS,
      mod.GetObjectPosition(ps.ball.object!),
      true,
      false,
      3,
    );
  }

  const swingUiRoot = players[pid].ui.swingUI.root;

  if (swingUiRoot) {
    swingUiRoot.setPosition({ x: 0, y: 85 });
  }

  SetPlayerLastSwingQuality(player, t);

  SetPostSwingState(player);

  if (GetPlayerCurrentClub(player).type === ClubType.PT) {
    void PuttBall(player, group, powerFactor).catch((e) => {
      LogError(
        "PuttBall",
        `Unhandled error from FinalizeSwing: ${String(e)}`,
        4,
      );
    });
  } else {
    void DriveBall(player, group, club, powerFactor, horizSpinValue).catch(
      (e) => {
        LogError(
          "DriveBall",
          `Unhandled error from FinalizeSwing: ${String(e)}`,
          4,
        );
      },
    );
  }
}

function SetPlayerLastSwingQuality(player: mod.Player, t: number) {
  const ps = GetValidPlayerState(player);
  if (!ps) return;

  if (t < 0) t = 0;
  if (t > 1) t = 1;

  LogEvent(
    1,
    SetPlayerLastSwingQuality.name,
    `Player swing quality set to: ${t.toFixed(2)}.`,
    { pid: mod.GetObjId(player), main: LogOType.Player },
  );

  ps.swing.lastSwingQuality = t;
}

function GetPlayerLastSwingQuality(player: mod.Player): number | null {
  const ps = GetValidPlayerState(player);
  if (!ps) return null;

  return ps.swing.lastSwingQuality;
}

function SetPostSwingState(player: mod.Player) {
  const ps = GetValidPlayerState(player);
  if (!ps) return;

  const pss = ps.swing;
  const pid = mod.GetObjId(player);

  DeleteBallHitUI(pid);
  HideSurfaceUI(player);
  DeletePowerUI(pid);

  const playerGroup = GetGroupFromPlayer(player);
  if (playerGroup) {
    ShowAllGroupPlayerBallIcons(playerGroup);
  }

  DeletePredictedFx(pid);
  DeletePredictedWorldIcon(pid);

  SetPlayerPowerFactor(pid, 1);

  if (GetPlayerGeneralPhase(pid) !== "IDLE") SetPlayerGeneralPhase(pid, "IDLE");
  if (GetPlayerSwingPhase(pid) !== "IDLE") SetPlayerSwingPhase(pid, "IDLE");

  ps.swing.powerBoundsAndSteps = null;
  ps.swing.selectedPowerFactor = MAX_POWER_FACTOR;

  pss.pos = SWING_MID_LINE_X;
  pss.leftLockedPos = 0;
  pss.rightLockedPos = 0;
}

function ConsumeActiveHitModifiers(player: mod.Player) {
  const ps = GetValidPlayerState(player);
  if (!ps) return;

  const inventory = ps.general.inventoryModifiers;
  const active = ps.general.activeModifiers;

  const keys = Object.keys(inventory) as HitModifierKey[];

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    const inventoryValue = inventory[key];
    const isActive = active[key];

    // Only consume if:
    // - active modifier is true
    // - inventory is a number > 0
    if (
      isActive === true &&
      typeof inventoryValue === "number" &&
      inventoryValue > 0
    ) {
      inventory[key] = inventoryValue - 1;
      LogEvent(
        1,
        ConsumeActiveHitModifiers.name,
        `Consumed 1 ${key} modifier. Remaining: ${inventory[key]}.`,
        { pid: mod.GetObjId(player), main: LogOType.Player },
      );
    }

    // Deactivate after consumption
    if (isActive) {
      ps.general.activeModifiers[key] = false;

      LogEvent(
        1,
        ConsumeActiveHitModifiers.name,
        `Deactivated ${key} modifier.`,
        { pid: mod.GetObjId(player), main: LogOType.Player },
      );
    }
  }
}

function ToggleModifierForPlayer(
  player: mod.Player,
  key: HitModifierKey,
  hitModButton: UI.Button,
  hitModContainer: UI.Container,
) {
  const ps = GetValidPlayerState(player);
  if (!ps) return;

  const pid = mod.GetObjId(player);
  const wasActive = !!ps.general.activeModifiers[key];
  const activating = !wasActive;

  PlaySFX(
    activating ? sfxPowerActivating : sfxPowerDeactivating,
    ZERO_VEC,
    player,
    { amplitude: 0.5 },
  );

  if (activating) {
    PlaySFX(sfxPowerActivatingCharging, GetPlayerPos(player), undefined, {
      is3D: true,
      amplitude: 0.5,
      range: 50,
    });
  }

  if (key === "superFocus")
    mod.EnableScreenEffect(player, mod.ScreenEffects.Stealth, activating);

  ps.general.activeModifiers[key] = activating;

  LogEvent(
    1,
    ToggleModifierForPlayer.name,
    `Player ${activating ? "activated" : "deactivated"} modifier: ${key}.`,
    { pid, main: LogOType.Player },
  );

  const baseColor = activating ? UI.COLORS.GOLD_YELLOW : UI.COLORS.WHITE;
  const hoverColor = activating ? UI.COLORS.YELLOW : UI.COLORS.WHITE;
  const alphaBase = activating ? 0.4 : 0.1;

  hitModButton.setColorBase(baseColor);
  hitModButton.setColorHover(hoverColor);
  hitModButton.setColorFocused(baseColor);
  hitModButton.setAlphaBase(alphaBase);
  hitModButton.setLabelTextColor(baseColor);

  hitModContainer.setBgColor(baseColor);

  if (key !== "powerHit") return;

  ps.swing.powerBoundsAndSteps = null;

  DeletePowerUI(pid);
  InitPowerUI(player);

  // Enforce power new max after bounds shrink
  const bounds = SetPlayerPowerBoundsAndSteps(player, ps);
  const currentPower = GetPlayerPowerFactor(pid);
  SetPlayerPowerFactor(pid, Math.min(bounds.max, currentPower));

  if (ps.ui.powerUI.fillContainer) {
    ps.ui.powerUI.fillContainer.setBgColor(
      activating ? UI.COLORS.GOLD_YELLOW : UICOLORS.GOLF_GREEN,
    );
  }

  if (ps.ball.predictedWorldIconName) {
    WIM.setup().setColor(
      ps.ball.predictedWorldIconName,
      activating ? UI.COLORS.GOLD_YELLOW_DARK : UICOLORS.GOLF_GREEN_COMP,
    );
  }
}

//************************
// -/ BALL
//************************

function SetBallPhase(pid: number, phase: BallState["phase"]) {
  players[pid].ball.phase = phase;
  LogEvent(
    1,
    SetBallPhase.name,
    `Ball phase set to: ${players[pid].ball.phase}.`,
    { pid, main: LogOType.Player },
  );
}

function GetBallPhase(pid: number): BallState["phase"] {
  return players[pid].ball.phase;
}

function SpawnPlayerBall(
  player: mod.Player,
  pos: mod.Vector,
): mod.SpatialObject | null {
  const ps = GetValidPlayerState(player);
  if (!ps) return null;

  const pid = mod.GetObjId(player);

  if (ps.ball.object) UnspawnPlayerBall(pid);

  ps.ball.object = mod.SpawnObject(modelBall, pos, ZERO_VEC);
  ps.ball.lastObjectPos = vectorToV3(pos);

  if (ps.ball.object != null) {
    LogEvent(
      1,
      SpawnPlayerBall.name,
      `Spawned player ball (id: ${mod.GetObjId(
        ps.ball.object,
      )}) at position x: ${mod.XComponentOf(pos)}, z: ${mod.ZComponentOf(pos)}.`,
      { pid, main: LogOType.Player },
    );

    return ps.ball.object;
  } else {
    LogError(
      SpawnPlayerBall.name,
      `Failed to spawn player ball for Player ${pid}.`,
      3,
    );
    return null;
  }
}

// BALL FX & ICON

function SpawnBallTrailFx(
  player: mod.Player,
  pos: mod.Vector,
): { entity: mod.VFX; id: number } | null {
  const ps = GetValidPlayerState(player);
  if (!ps) return null;

  const pid = mod.GetObjId(player);
  const swingQuality = GetPlayerLastSwingQuality(player); // 0 to 1, where 1 is best

  UnspawnPlayerBallTrail(pid);

  let isFlightPhase = false;

  if (GetBallPhase(pid) === "FLIGHT") {
    isFlightPhase = true;
    LogEvent(2, SpawnBallTrailFx.name, `Ball is in FLIGHT phase.`, {
      pid,
      main: LogOType.Player,
    });
  } else {
    LogEvent(2, SpawnBallTrailFx.name, `Ball is in NON-FLIGHT phase.`, {
      pid,
      main: LogOType.Player,
    });
  }

  const activeMods = ps.general.activeModifiers;

  //POWER SHOT: mod.RuntimeSpawn_Common.FX_Grenade_Incendiary_Trail
  //POWER SHOT 2: mod.RuntimeSpawn_Common.FX_Sparks
  //SUPER POWER SHOT: mod.RuntimeSpawn_Common.FX_Gadget_Sabotage_02_SparkLoop
  //SUPER POWER SHOT2: mod.RuntimeSpawn_Common.FX_RepairTool_Sparks_1P
  //SUPER POWER SHOT3: mod.RuntimeSpawn_Common.FX_Grenade_Incendiary_Detonation

  let fxModel: mod.RuntimeSpawn_Common;

  if (isFlightPhase && swingQuality !== null) {
    if (swingQuality >= 0.98) {
      ShowNotification(
        { type: "player", id: pid },
        {
          main: mod.Message("PERFECT_SHOT_NOTIF" + ps.general.languageSuffix),
          comment: null,
        },
        NotifyPosition.Top,
        2,
      );
    } else if (swingQuality >= 0.9) {
      ShowNotification(
        { type: "player", id: pid },
        {
          main: mod.Message("GREAT_SHOT_NOTIF" + ps.general.languageSuffix),
          comment: null,
        },
        NotifyPosition.Top,
        2,
      );
    }

    if ((activeMods.powerHit as boolean) === true) {
      fxModel = vfxPowerHitFlightTrail;
      LogEvent(
        2,
        SpawnBallTrailFx.name,
        `Spawning power hit flvight trail FX.`,
        {
          pid,
          main: LogOType.Player,
        },
      );
    } else {
      fxModel = vfxDefaultFlightTrail;
      LogEvent(
        2,
        SpawnBallTrailFx.name,
        `Spawning default hit flight trail FX.`,
        {
          pid,
          main: LogOType.Player,
        },
      );
    }
  } else {
    // Base model for ground
    fxModel = vfxDefaultGroundTrail;
    LogEvent(2, SpawnBallTrailFx.name, `Spawning GROUND trail FX.`, {
      pid,
      main: LogOType.Player,
    });
  }

  const entity: mod.VFX = mod.SpawnObject(fxModel, pos, ZERO_VEC);
  const fxId = mod.GetObjId(entity);

  ps.ball.lastTrailFxPos = vectorToV3(pos);

  return { entity: entity, id: fxId };
}

function MoveBallTrailFX(posNow: V3, fx: mod.VFX): void {
  mod.MoveVFX(
    fx,
    v3ToVector(v3(posNow.x, posNow.y + 0.02, posNow.z)),
    ZERO_VEC,
  );
}

function InitializeBallWorldIcon(
  player: mod.Player,
  pos: V3,
  textEnabled: boolean,
  iconEnabled: boolean,
): string {
  const ps = GetValidPlayerState(player);
  if (!ps) return "";

  const pid = mod.GetObjId(player);
  const ballWIName = `${pid}_ballWorldIcon`;

  const group = GetGroupFromPlayer(player);
  if (!group) {
    LogError(
      InitializeBallWorldIcon.name,
      `Unable to create World Icon for Player ${pid}. No group found for player`,
      13,
    );
    RemovePlayerFromGroup(pid);
    return "";
  }
  const team = group.team;
  if (!team) {
    LogError(
      InitializeBallWorldIcon.name,
      `Unable to create World Icon for Player ${pid}. No team found for Group ${group.groupId}`,
      14,
    );
    RemovePlayerFromGroup(pid);
    return "";
  }

  WIM.setup().createIcon(ballWIName, v3ToVector(pos), {
    //text: mod.Message("BALL_WORLDICON_TEXT", player, shotDistance),
    textEnabled: textEnabled,
    icon: mod.WorldIconImages.Triangle,
    iconEnabled: iconEnabled,
    color: UICOLORS.GOLF_GREEN_COMP,
    teamOwner: team,
  });

  ps.ball.ballWorldIconName = ballWIName;

  LogEvent(1, InitializeBallWorldIcon.name, `Ball World Icon created.`, {
    pid,
    gid: group.groupId,
    main: LogOType.Group,
  });

  return ballWIName;
}

function UpdateBallWorldIcon(
  player: mod.Player,
  initialPos: V3,
  pos: V3,
  ball: mod.SpatialObject | null,
  textEnabled?: boolean,
  iconEnabled?: boolean,
) {
  const ps = GetValidPlayerState(player);
  if (!ps) return;

  let wiName = ps.ball.ballWorldIconName;
  if (!wiName) wiName = InitializeBallWorldIcon(player, pos, true, true);

  const wim = WIM.setup();

  if (!wim.hasIcon(wiName)) {
    const WIname = wiName === "" ? "UNDEFINED" : wiName;
    LogError(
      UpdateBallWorldIcon.name,
      `Unable to update World Icon for Player ${mod.GetObjId(
        player,
      )}. World Icon ${WIname} does not exist`,
      15,
    );
    return;
  }

  let iconBasePos: mod.Vector;

  if (ball) {
    // ALWAYS prefer engine-tracked position
    iconBasePos = mod.GetObjectPosition(ball);
  } else {
    // fallback only if ball not spawned yet
    iconBasePos = mod.CreateVector(pos.x, pos.y, pos.z);
  }

  const iconPos = mod.CreateVector(
    mod.XComponentOf(iconBasePos),
    mod.YComponentOf(iconBasePos) + GOLF_BALL_ICON_Y_OFFSET,
    mod.ZComponentOf(iconBasePos),
  );

  const distance = DistanceBetween(
    v3ToVector(initialPos),
    iconPos,
    DistanceType.XZ,
    DistanceUnit.Yards,
    1,
  );

  wim.setText(
    wiName,
    mod.Message(
      "BALL_WORLDICON_TEXT",
      player,
      distance.whole,
      distance.fraction,
    ),
  );

  wim.setPosition(wiName, iconPos);

  if (textEnabled !== undefined) {
    wim.setTextEnabled(wiName, textEnabled);
  }

  if (iconEnabled !== undefined) {
    wim.setIconEnabled(wiName, iconEnabled);
  }

  return distance.wholeWithDecimals;
}

function HideAllGroupPlayerBallIcons(group: CourseGroup) {
  for (const p of group.players) {
    const ps = GetValidPlayerState(p.player);
    if (!ps) continue;

    if (
      ps.ball.ballWorldIconName &&
      WIM.setup().hasIcon(ps.ball.ballWorldIconName)
    ) {
      WIM.setup().setEnabled(ps.ball.ballWorldIconName, true, false);
    }
  }
}

function ShowAllGroupPlayerBallIcons(group: CourseGroup) {
  for (const p of group.players) {
    const ps = GetValidPlayerState(p.player);
    if (!ps) continue;

    if (
      ps.ball.ballWorldIconName &&
      WIM.setup().hasIcon(ps.ball.ballWorldIconName)
    ) {
      WIM.setup().setEnabled(ps.ball.ballWorldIconName, true, true);
    }
  }
}

function SetBallWorldIconVisible(pid: number, visible: boolean) {
  const ps = players[pid];
  if (!ps) return;

  const wim = WIM.setup();

  if (ps.ball.ballWorldIconName && wim.hasIcon(ps.ball.ballWorldIconName)) {
    wim.setEnabled(ps.ball.ballWorldIconName, visible, visible);

    LogEvent(
      1,
      SetBallWorldIconVisible.name,
      `Ball World Icon visibility set to ${visible}.`,
      {
        pid,
        main: LogOType.Player,
      },
    );
  }
}

function DeleteBallWorldIcon(pid: number) {
  const ps = players[pid];
  if (!ps) return;

  const wim = WIM.setup();

  if (ps.ball.ballWorldIconName && wim.hasIcon(ps.ball.ballWorldIconName)) {
    wim.deleteIcon(ps.ball.ballWorldIconName);
    ps.ball.ballWorldIconName = null;

    LogEvent(1, DeleteBallWorldIcon.name, `Ball World Icon deleted.`, {
      pid,
      main: LogOType.Player,
    });
  }
}

function PredictLandingPointFlat(
  player: mod.Player,
  startPos: V3,
  club: Club,
  holeNumber: number,
  powerFactor: number,
  sideSpin: number,
  facingDir: V3, // player facing direction vectorToV3( mod.GetSoldierFacing(...) )
): V3 | null {
  const pid = mod.GetObjId(player);
  const p = ClubParams[club.type];

  // aerodynamic parameters
  const spin = p.backspin;
  const liftRamp = 0.2 + (1 - spin) * 0.2;

  const v0 = p.velocity * powerFactor;
  const launchAngle = (p.angle * Math.PI) / 180;

  // horizontal forward/side vectors
  const forwardH = v3Normalize(v3(facingDir.x, 0, facingDir.z));
  const rightH = v3Normalize(v3(-forwardH.z, 0, forwardH.x));

  // decompose velocity
  const v0h = v0 * Math.cos(launchAngle);
  const v0y = v0 * Math.sin(launchAngle);

  const vel: V3 = {
    x: forwardH.x * v0h,
    y: v0y,
    z: forwardH.z * v0h,
  };

  // small initial sidespin push
  if (sideSpin !== 0) {
    const initialSpinPush = sideSpin * ballPhys.initialSpinPushFactor;

    vel.x += rightH.x * initialSpinPush;
    vel.z += rightH.z * initialSpinPush;

    const forwardCost = Math.abs(initialSpinPush);
    vel.x -= forwardH.x * forwardCost;
    vel.z -= forwardH.z * forwardCost;
  }

  // Simulation mirror values
  const dt = ballPhys.dt;
  const g = ballPhys.g;

  let t = 0;
  let pos: V3 = { ...startPos };
  let lastPos: V3;

  // Simulate forward using same aero forces
  while (t < 10) {
    t += dt;

    // Gravity
    vel.y -= g * dt;

    // Drag
    const speed = Math.sqrt(vel.x * vel.x + vel.y * vel.y + vel.z * vel.z);
    const drag = 1 - ballPhys.airDecay * dt;
    vel.x *= drag;
    vel.y *= drag;
    vel.z *= drag;

    // Spin Ratio
    const spinRatio = Math.min(spin / Math.max(speed, 0.01), 1.2);

    // Lift ramp + decay
    const liftUp = Math.min(1, t / liftRamp);
    const spinDecay = Math.min(1, speed / (v0 * 0.7));

    // Magnus CL
    let CL = 0.09 * spinRatio + 0.12 * spinRatio * spinRatio;
    CL = Math.min(CL, ballPhys.liftBase);

    // Lift force
    const lift = CL * speed * speed * ballPhys.liftCoefficient;
    vel.y += lift * liftUp * spinDecay * dt;

    // Sidespin curvature
    if (sideSpin !== 0) {
      const horiz = Math.sqrt(vel.x * vel.x + vel.z * vel.z);
      if (horiz > 0.0001) {
        const sideAccel = sideSpin * horiz * ballPhys.spinForceFactor;

        vel.x += rightH.x * sideAccel;
        vel.z += rightH.z * sideAccel;

        const forwardCost = Math.abs(sideAccel);

        vel.x -= forwardH.x * forwardCost;
        vel.z -= forwardH.z * forwardCost;
      }
    }

    // Integrate position
    lastPos = { ...pos };
    pos = {
      x: pos.x + vel.x * dt,
      y: pos.y + vel.y * dt,
      z: pos.z + vel.z * dt,
    };

    const terrainY = GetTerrainHeight(holeNumber, pos);

    if (terrainY !== null && pos.y <= terrainY) {
      // interpolate exact collision point
      const dy = pos.y - lastPos.y;
      const alpha = (terrainY - lastPos.y) / (dy !== 0 ? dy : 1e-6);

      const finalPos = {
        x: lastPos.x + (pos.x - lastPos.x) * alpha,
        y: terrainY,
        z: lastPos.z + (pos.z - lastPos.z) * alpha,
      };

      players[pid].swing.predictionPosition = v3ToVector(finalPos);

      return finalPos;
    } else {
      players[pid].swing.predictionPosition = null;
    }
  }

  return null;
}

function PredictRollFromBallPos(
  player: mod.Player,
  holeNumber: number,
  powerFactor: number,
  facingDir: V3,
): V3 {
  const pid = mod.GetObjId(player);
  const ps = players[pid];

  const ballPos = ps.ball.lastObjectPos;
  if (!ballPos) return vectorToV3(ZERO_VEC);

  const terrainY = GetTerrainHeight(holeNumber, ballPos);
  if (terrainY == null) return ballPos;

  // --------------------------------------------
  // START POSITION (LOCKED TO TERRAIN)
  // --------------------------------------------
  const startPos: V3 = {
    x: ballPos.x,
    y: terrainY,
    z: ballPos.z,
  };

  // --------------------------------------------
  // DIRECTION (HORIZONTAL ONLY)
  // --------------------------------------------
  const dir = v3Normalize(v3(facingDir.x, 0, facingDir.z));
  if (Math.abs(dir.x) < 0.001 && Math.abs(dir.z) < 0.001) {
    return startPos;
  }

  // --------------------------------------------
  // INITIAL SPEED (MATCH PUTT LAUNCH)
  // --------------------------------------------
  const putterVel = ComputePutterVelocity(player, holeNumber);
  const v0 = putterVel * powerFactor;

  if (v0 <= 0) return startPos;

  // --------------------------------------------
  // ROLLING DECELERATION (TUNED TO MATCH RUNTIME)
  // --------------------------------------------
  // Use GREEN as reference since prediction is mainly for putting
  const decel = Surfaces[SurfaceType.Green].rollDecay;

  if (decel <= 0) return startPos;

  // --------------------------------------------
  // DISTANCE = v^2 / (2a)
  // --------------------------------------------
  const distance = (v0 * v0) / (2 * decel);

  // --------------------------------------------
  // FINAL POSITION
  // --------------------------------------------
  const endPos: V3 = {
    x: startPos.x + dir.x * distance,
    y: startPos.y,
    z: startPos.z + dir.z * distance,
  };

  const finalY = GetTerrainHeight(holeNumber, endPos);
  if (finalY != null) {
    endPos.y = finalY;
  }

  players[pid].swing.predictionPosition = v3ToVector(endPos);

  return endPos;
}

function ComputePutterVelocity(player: mod.Player, holeNumber: number): number {
  const ps = GetValidPlayerState(player);
  if (!ps) return 0;

  const maxVel = ClubParams[ClubType.PT].velocity;

  const ballPos = ps.ball.lastObjectPos;
  const holeData = GetHoleData(holeNumber);
  if (!ballPos || !holeData) return 0;

  const flagPos = holeData.flagPt;

  const dYdsToFlag = DistanceBetween(
    v3ToVector(ballPos),
    v3ToVector(flagPos),
    DistanceType.XZ,
    DistanceUnit.Yards,
    1,
  ).wholeWithDecimals;

  const desiredYds = dYdsToFlag + 2;
  const desiredM = desiredYds * 0.9144;

  // Use the same green friction magnitude your roll sim uses
  const dynamicFriction = Surfaces[SurfaceType.Green].rollDecay;

  // Flat-ground inverse: v0 = sqrt(2 * a * d)
  let v0 = Math.sqrt(2 * dynamicFriction * desiredM);

  // Optional: small minimum so it actually moves on tiny distances
  const minVel = maxVel * 0.05;
  if (v0 < minVel) v0 = minVel;

  if (v0 > maxVel) v0 = maxVel;
  return v0;
}

function PlayHitBallFx(player: mod.Player, pos: mod.Vector) {
  const ps = GetValidPlayerState(player);
  if (!ps) return;

  const surf = GetPlayerBallSurfaceType(player);
  const club = GetPlayerCurrentClub(player);

  switch (surf) {
    case SurfaceType.Sand:
      PlayVFX(vfxBallHitSand, pos);
      break;
    default:
      PlayVFX(vfxBallDefaultHitGround, pos);
  }

  LogEvent(
    1,
    PlayHitBallFx.name,
    `Playing FX for surface ${Surfaces[surf].key} and SFX for club type: ${club.key}.`,
    {
      pid: mod.GetObjId(player),
      main: LogOType.Player,
    },
  );

  if (club.type === ClubType.DR1 || club.type === ClubType.DR3) {
    PlaySFX(sfxWoodHit1, pos, undefined, { is3D: true, amplitude: 0.2 });
    PlaySFX(sfxWoodHit2, pos, undefined, { is3D: true });
  } else if (club.type === ClubType.PT) {
    PlaySFX(sfxPutterHit, pos, undefined, { is3D: true, amplitude: 0.3 });
  } else {
    PlaySFX(sfxIronHit1, pos, undefined, { is3D: true });
    PlaySFX(sfxIronHit2, pos, undefined, { is3D: true });
    PlaySFX(sfxIronHit3, pos, undefined, { is3D: true });
  }
}

function PlayHitGroundFx(player: mod.Player, pos: V3) {
  const ps = GetValidPlayerState(player);
  if (!ps) return;

  const group = GetGroupFromPlayer(player);
  if (!group) return;

  const surf = DetectSurfaceType(group.currentHole, { x: pos.x, z: pos.z });

  LogEvent(
    1,
    PlayHitGroundFx.name,
    `Playing FX for surface ${Surfaces[surf].key}.`,
    {
      pid: mod.GetObjId(player),
      main: LogOType.Player,
    },
  );

  const posV = v3ToVector(pos);

  switch (surf) {
    case SurfaceType.Water:
      PlayVFX(vfxBallHitWater, posV);
      break;
    case SurfaceType.Sand:
      PlayVFX(vfxBallHitSand, posV);
      break;
    default:
      if (ps.general.activeModifiers.powerHit) {
        PlayVFX(vfxBallPowerHitGround, posV);
      } else {
        PlayVFX(vfxBallDefaultHitGround, posV);
        PlaySFX(sfxIronHit3, posV, undefined, {
          is3D: true,
          amplitude: 0.5,
          range: 70,
        });
      }
  }
}

function ShotCanceled(
  player: mod.Player,
  shotToken: number,
  ballObj?: mod.SpatialObject | null,
): boolean {
  if (!mod.IsPlayerValid(player)) return true;
  if (!GetPlayerIsAlive(player)) return true;

  const ps = GetValidPlayerState(player);
  if (!ps) return true;

  if (ps.ball.token !== shotToken) return true;

  // Once the ball exists, abort if the ball got unspawned/replaced
  if (ballObj && ps.ball.object !== ballObj) return true;

  return false;
}

async function DriveBall(
  player: mod.Player,
  playerGroup: CourseGroup,
  club: Club,
  powerFactor: number,
  sideSpin: number = 0,
): Promise<void> {
  // -----------------------------
  // Inner helpers
  // -----------------------------

  const dt = ballPhys.dt;

  function applyGravityAndAirDrag(v: V3): { speed: number; drag: number } {
    v.y -= ballPhys.g * dt;

    const speed = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    const drag = 1 - ballPhys.airDecay * dt;

    v.x *= drag;
    v.y *= drag;
    v.z *= drag;

    return { speed, drag };
  }

  function moveBallByDelta(ball: mod.SpatialObject, delta: V3): void {
    mod.MoveObject(ball, v3ToVector(delta));
  }

  function clampToTerrainIfCrossing(
    ball: mod.SpatialObject,
    currentPos: V3,
    v: V3,
    terrainY: number,
  ): { clamped: boolean; newPos: V3 } {
    const nextY = currentPos.y + v.y * dt;
    if (nextY <= terrainY) {
      const adjust = terrainY - currentPos.y;
      const clampedPos = v3(currentPos.x, terrainY, currentPos.z);
      moveBallByDelta(ball, v3(0, adjust, 0));
      return { clamped: true, newPos: clampedPos };
    }
    return { clamped: false, newPos: currentPos };
  }

  async function simulateBounceArc(
    ball: mod.SpatialObject,
    playerObj: mod.Player,
    holeNumber: number,
    trailFX: { entity: mod.VFX; id: number } | null,
    sPos: V3,
    v: V3,
    dragFactor: number,
    ballWorldIconName: string,
    initialPos: V3,
    bounceNo: number,
    backSpinEnabled: boolean,
  ): Promise<{ pos: V3; vel: V3 }> {
    let posLocal = sPos;
    let velLocal = v;

    let camPosLocal: V3;

    const localPs = GetValidPlayerState(playerObj);
    if (!localPs) return { pos: sPos, vel: v };

    if (!courseGrid) {
      return { pos: sPos, vel: v };
    }

    let heightBounceDamping = 0.3;
    let lateralBounceDamping = backSpinEnabled ? 0.6 : 0.8;

    let rockBounce = false;

    const slopeInfluence = 1; // 0 = flat ground, 1 = full slope

    while (true) {
      await mod.Wait(dt);

      // Validation checks
      const psNow = GetValidPlayerState(playerObj);
      if (!psNow) return { pos: posLocal, vel: velLocal };
      if (psNow.ball.token !== shotToken)
        return { pos: posLocal, vel: velLocal };
      if (!mod.IsPlayerValid(playerObj) || !GetPlayerIsAlive(playerObj)) {
        return { pos: posLocal, vel: velLocal };
      }
      if (psNow.ball.object !== ball) return { pos: posLocal, vel: velLocal };

      // Integrate motion
      velLocal.y -= ballPhys.g * dt;
      velLocal.x *= dragFactor;
      velLocal.z *= dragFactor;

      const nextPos = v3(
        posLocal.x + velLocal.x * dt,
        posLocal.y + velLocal.y * dt,
        posLocal.z + velLocal.z * dt,
      );

      const delta = v3Sub(nextPos, posLocal);
      posLocal = nextPos;
      moveBallByDelta(ball, delta);

      if (trailFX) {
        MoveBallTrailFX(posLocal, trailFX.entity);
      }

      UpdateBallWorldIcon(playerObj, initialPos, posLocal, ball);

      // Terrain contact
      const terrainY = GetTerrainHeight(holeNumber, posLocal);
      if (terrainY == null) break;

      // Camera
      if (posLocal.y > terrainY + 3) {
        camPosLocal = v3(posLocal.x, posLocal.y + 1, posLocal.z);
      } else {
        camPosLocal = v3(posLocal.x, terrainY + 3, posLocal.z);
      }
      MoveCameraToPos(
        camPosLocal,
        { trackedPos: posLocal, trackYaw: true, trackPitch: true },
        0,
        velLocal,
      );

      if (posLocal.y <= terrainY) {
        posLocal.y = terrainY;

        // Surface detection
        const surf = DetectSurfaceType(holeNumber, {
          x: posLocal.x,
          z: posLocal.z,
        });

        if (surf === SurfaceType.Sand || surf === SurfaceType.Water) {
          heightBounceDamping *= 0.2;
          lateralBounceDamping *= 0.3;
        } else if (surf === SurfaceType.Rough && bounceNo === 1) {
          const rockBoundChance = 0.05;
          if (Math.random() < rockBoundChance) {
            heightBounceDamping *= ballPhys.rockBounceFactor;
            rockBounce = true;
            mod.DisplayHighlightedWorldLogMessage(
              mod.Message(
                "BALL_ROCK_BOUNCE" + localPs.general.languageSuffix,
                player,
              ),
              playerGroup.team,
            );
          }
        }

        // Slope-based bounce
        const slopeSample = SampleTerrainSlope_Plane(
          courseGrid,
          posLocal.x,
          posLocal.z,
        );

        if (slopeSample) {
          const slopeN = TerrainNormal(slopeSample.slopeX, slopeSample.slopeZ);
          const flatN = v3(0, 1, 0);

          // Blend toward flat normal
          let n = v3Normalize(
            v3(
              flatN.x + (slopeN.x - flatN.x) * slopeInfluence,
              flatN.y + (slopeN.y - flatN.y) * slopeInfluence,
              flatN.z + (slopeN.z - flatN.z) * slopeInfluence,
            ),
          );

          // DEBUG: normal must point upward
          if (n.y < 0) {
            // Flip to prevent bad bounce
            n = v3(-n.x, -n.y, -n.z);
          }

          const vn = velLocal.x * n.x + velLocal.y * n.y + velLocal.z * n.z;

          // Only bounce if moving INTO terrain
          if (vn < 0) {
            let vRef = ReflectVelocity(velLocal, n);

            // Safety: never reflect back into ground
            const vRefN = vRef.x * n.x + vRef.y * n.y + vRef.z * n.z;

            if (vRefN < 0) {
              vRef = v3(
                vRef.x - vRefN * n.x,
                vRef.y - vRefN * n.y,
                vRef.z - vRefN * n.z,
              );
            }

            // Bias horizontal direction toward incoming forward direction
            const forwardBias = 0.5; // 0 = slope-driven, 1 = incoming direction

            const inHx = velLocal.x;
            const inHz = velLocal.z;
            const inHL = Math.sqrt(inHx * inHx + inHz * inHz);

            const outHx = vRef.x;
            const outHz = vRef.z;
            const outHL = Math.sqrt(outHx * outHx + outHz * outHz);

            if (inHL > 1e-6 && outHL > 1e-6) {
              const inDx = inHx / inHL;
              const inDz = inHz / inHL;

              const outDx = outHx / outHL;
              const outDz = outHz / outHL;

              const bx = outDx * (1 - forwardBias) + inDx * forwardBias;
              const bz = outDz * (1 - forwardBias) + inDz * forwardBias;
              const bL = Math.sqrt(bx * bx + bz * bz);

              if (bL > 1e-6) {
                // keep reflected horizontal speed, only change direction
                vRef = v3((bx / bL) * outHL, vRef.y, (bz / bL) * outHL);
              }
            }

            velLocal = v3(
              vRef.x * lateralBounceDamping,
              Math.max(0, vRef.y) * heightBounceDamping,
              vRef.z * lateralBounceDamping,
            );
          }
        }

        if (rockBounce) {
          //rockBounce = false;

          velLocal.x += mod.RandomReal(-1, 1) * ballPhys.rockBounceFactor;
          velLocal.z += mod.RandomReal(-1, 1) * ballPhys.rockBounceFactor;
        }

        break;
      }
    }

    return { pos: posLocal, vel: velLocal };
  }

  // -----------------------------
  // Validation and setup
  // -----------------------------

  if (!mod.IsPlayerValid(player)) {
    return;
  }
  if (!GetPlayerIsAlive(player)) {
    return;
  }

  const pid = mod.GetObjId(player);
  const ps = GetValidPlayerState(player);
  if (!ps) return;

  const shotToken = ++ps.ball.token;

  const holeNumber = playerGroup.currentHole;

  const holeData = GetHoleData(holeNumber);

  const courseGrid = holeData.heightMap.grid;
  if (!courseGrid) {
    LogError(
      DriveBall.name,
      `Hole ${holeNumber} has no heightMap grid defined. Aborting`,
      16,
    );
    return;
  }

  // --------------------------------------------
  // BALL POSITIONING
  // --------------------------------------------

  LogEvent(1, DriveBall.name, `Positioning ball...`, {
    pid,
    main: LogOType.Player,
  });

  const soldierPos = GetPlayerPos(player);
  const facingVecSpawn = GetPlayerFacingDir(player);
  const facingSpawn = vectorToV3(facingVecSpawn);
  const forwardHSpawn = v3Normalize(v3(facingSpawn.x, 0, facingSpawn.z));

  let pos: V3;

  if (ps.ball.lastObjectPos) {
    pos = ps.ball.lastObjectPos;
  } else {
    pos = vectorToV3(soldierPos);
    pos = v3Add(pos, v3Scale(forwardHSpawn, 2.5));
    const terrainYSpawn = GetTerrainHeight(holeNumber, {
      x: pos.x,
      y: pos.y,
      z: pos.z,
    });
    if (terrainYSpawn !== null) {
      pos.y = terrainYSpawn;
    }
  }

  const initialPos = v3(pos.x, pos.y, pos.z);

  const ball = SpawnPlayerBall(player, v3ToVector(pos));
  if (!ball) return;

  // --------------------------------------------
  // DISABLE SCREEN EFFECT
  // --------------------------------------------

  mod.EnableScreenEffect(player, mod.ScreenEffects.Stealth, false);

  // --------------------------------------------
  // INITIALIZE BALL WORLD ICON
  // --------------------------------------------

  const ballWIName = InitializeBallWorldIcon(player, pos, false, false);

  // --------------------------------------------
  // INITIALIZE CLUB PARAMETERS AND HIT
  // --------------------------------------------

  LogEvent(1, DriveBall.name, `Initiating club parameters and hit...`, {
    pid,
    main: LogOType.Player,
  });

  const p = ClubParams[club.type];

  const spin = p.backspin;
  const liftRamp = 0.2 + (1 - p.backspin) * 0.15;

  const backspinEnabled = ps.general.activeModifiers.backSpin as boolean;

  const ballSpeed = p.velocity * powerFactor;
  const launchAngleDeg = p.angle;
  const sideAngleDeg = 0;

  const theta = (launchAngleDeg * Math.PI) / 180.0;
  const phi = (sideAngleDeg * Math.PI) / 180.0;

  const facingVec = GetPlayerFacingDir(player);
  const facing = vectorToV3(facingVec);
  const forwardH = v3Normalize(v3(facing.x, 0, facing.z));
  const rightH = v3Normalize(v3(-forwardH.z, 0, forwardH.x));

  const v0 = ballSpeed;
  const v0h = v0 * Math.cos(theta);
  const v0y = v0 * Math.sin(theta);

  const vForward = v0h * Math.cos(phi);
  const vSide = v0h * Math.sin(phi);

  let vel: V3 = v3(
    forwardH.x * vForward + rightH.x * vSide,
    v0y,
    forwardH.z * vForward + rightH.z * vSide,
  );

  if (sideSpin !== 0) {
    const initialSpinPush = sideSpin * ballPhys.initialSpinPushFactor;

    vel.x += rightH.x * initialSpinPush;
    vel.z += rightH.z * initialSpinPush;

    const forwardCost = Math.abs(initialSpinPush);
    vel.x -= forwardH.x * forwardCost;
    vel.z -= forwardH.z * forwardCost;
  }

  const dragFactor = 1 - ballPhys.airDecay * dt;

  const v = ClubParams[club.type].velocity;
  const minV = ClubParams[ClubType.SW].velocity;
  const maxV = ClubParams[ClubType.DR1].velocity;
  const multi = Math.min(1, Math.max(0, (v - minV) / (maxV - minV)));
  const distanceMultiplier = 1.0 + multi * 0.06;

  const predictedPos = PredictLandingPointFlat(
    player,
    pos,
    club,
    holeNumber,
    powerFactor * distanceMultiplier,
    sideSpin,
    vectorToV3(facingVecSpawn),
  );

  if (predictedPos !== null) {
    if (
      DistanceBetween(
        v3ToVector(predictedPos),
        v3ToVector(pos),
        DistanceType.XZ,
        DistanceUnit.Yards,
        1,
      ).whole > 75
    ) {
      //SetPlayerCameraToBall(player, predictedPos);
    } else {
      await mod.Wait(0.5);
      SetPlayerIdleCourseRestrictions(player);
      //mod.SetCameraTypeForPlayer(player, mod.Cameras.FirstPerson);
    }
  } else {
    await mod.Wait(0.5);
    SetPlayerIdleCourseRestrictions(player);
    //mod.SetCameraTypeForPlayer(player, mod.Cameras.FirstPerson);
  }

  HandlePlayerPosOnStopped(player);

  // --------------------------------------------
  // HIT + FLIGHT PHASE
  // --------------------------------------------

  LogEvent(
    1,
    DriveBall.name,
    `Ball hit with club ${club.key}.`,
    {
      pid,
      gid: GetGroupFromPlayer(player)?.groupId ?? -1,
      main: LogOType.Player,
    },
    true,
  );

  SetBallPhase(pid, "FLIGHT");

  await mod.Wait(GLOBAL_TICK_RATE);

  const ballFlightTrailFx = SpawnBallTrailFx(
    player,
    v3ToVector(v3(pos.x, pos.y + 0.02, pos.z)),
  );

  if (ballFlightTrailFx) mod.EnableVFX(ballFlightTrailFx.entity, true);

  ps.ball.object = ball;
  ps.ball.trailFXId = ballFlightTrailFx?.id ?? null;

  let ballHitTree = false;

  let camPos: V3;

  PlayHitBallFx(player, v3ToVector(pos));

  // Flight loop
  let t = 0;
  while (true) {
    await mod.Wait(dt);

    if (ShotCanceled(player, shotToken, ball)) {
      LogEvent(1, DriveBall.name, `Shot canceled.`, {
        pid,
        main: LogOType.Player,
      });
      return;
    }

    t += dt;

    const air = applyGravityAndAirDrag(vel);
    const speed = air.speed;

    const spinRatio = Math.min(spin / Math.max(speed, 0.01), 1.2);

    const liftUp = Math.min(1, t / liftRamp);
    const spinDecay = Math.min(1, speed / (v0 * 0.7));

    let CL = 0.09 * spinRatio + 0.12 * spinRatio * spinRatio;
    CL = Math.min(CL, ballPhys.liftBase);

    const lift = CL * speed * speed * ballPhys.liftCoefficient;
    vel.y += lift * liftUp * spinDecay * dt;

    if (sideSpin !== 0) {
      const horiz = Math.sqrt(vel.x * vel.x + vel.z * vel.z);
      if (horiz > 0.0001) {
        const sideAccel = sideSpin * horiz * ballPhys.spinForceFactor;

        vel.x += rightH.x * sideAccel;
        vel.z += rightH.z * sideAccel;

        const forwardCost = Math.abs(sideAccel);

        vel.x -= forwardH.x * forwardCost;
        vel.z -= forwardH.z * forwardCost;
      }
    }

    let newPos = v3(pos.x + vel.x * dt, pos.y + vel.y * dt, pos.z + vel.z * dt);

    if (
      DetectSurfaceType(holeNumber, { x: newPos.x, z: newPos.z }) ===
        SurfaceType.Trees &&
      !ballHitTree
    ) {
      const probe = 0.35;
      let nx = 0;
      let nz = 0;

      // Build an outward normal from nearby non-tree samples.
      if (
        DetectSurfaceType(holeNumber, { x: newPos.x - probe, z: newPos.z }) !==
        SurfaceType.Trees
      )
        nx += 1;
      if (
        DetectSurfaceType(holeNumber, { x: newPos.x + probe, z: newPos.z }) !==
        SurfaceType.Trees
      )
        nx -= 1;
      if (
        DetectSurfaceType(holeNumber, { x: newPos.x, z: newPos.z - probe }) !==
        SurfaceType.Trees
      )
        nz += 1;
      if (
        DetectSurfaceType(holeNumber, { x: newPos.x, z: newPos.z + probe }) !==
        SurfaceType.Trees
      )
        nz -= 1;

      const len = Math.hypot(nx, nz);
      const treeBounceDamping = 0.55;

      if (len > 1e-6) {
        nx /= len;
        nz /= len;

        const dot = vel.x * nx + vel.z * nz;

        vel = v3(
          (vel.x - 2 * dot * nx) * treeBounceDamping,
          vel.y,
          (vel.z - 2 * dot * nz) * treeBounceDamping,
        );
      } else {
        // Fallback if we can't estimate a normal.
        vel = v3(-vel.x * treeBounceDamping, vel.y, -vel.z * treeBounceDamping);
      }

      ballHitTree = true;

      PlayHitGroundFx(player, newPos);

      mod.DisplayHighlightedWorldLogMessage(
        mod.Message("BALL_HIT_TREE" + ps.general.languageSuffix, player),
        playerGroup.team,
      );

      // Don't let the ball stay inside the tree surface this frame.
      newPos = pos;
    }

    const delta = v3Sub(newPos, pos);
    moveBallByDelta(ball, delta);

    if (ballFlightTrailFx) {
      MoveBallTrailFX(newPos, ballFlightTrailFx.entity);
    }

    if (vel.y < 0) {
      UpdateBallWorldIcon(player, initialPos, newPos, ball, true, true);
    }

    pos = newPos;

    const terrainY = GetTerrainHeight(holeNumber, {
      x: pos.x,
      y: pos.y,
      z: pos.z,
    });

    if (terrainY !== null) {
      if (ps.ball.isOutOfBounds) ps.ball.isOutOfBounds = false;

      // Camera
      if (pos.y > terrainY + 3) {
        camPos = v3(pos.x, pos.y + 1, pos.z);
        MoveCameraToPos(
          camPos,
          { trackedPos: pos, trackYaw: true, trackPitch: true },
          0,
          vel,
        );
      }

      const clamped = clampToTerrainIfCrossing(ball, pos, vel, terrainY);

      if (clamped.clamped) {
        pos = clamped.newPos;

        UpdateBallWorldIcon(player, initialPos, pos, ball, true, true);
        const distance = InitializeCarryWorldIcon(player, initialPos, pos);
        mod.DisplayHighlightedWorldLogMessage(
          mod.Message(
            "BALL_GROUND_CARRY_YARDS" + ps.general.languageSuffix,
            player,
            distance.whole,
            distance.decimals,
          ),
          GetGroupFromPlayer(player)!.team,
        );
        LogEvent(1, DriveBall.name, `Ball hit ground.`, {
          pid,
          gid: GetGroupFromPlayer(player)?.groupId ?? -1,
          main: LogOType.Player,
        });
        break;
      }
    } else {
      if (!ps.ball.isOutOfBounds) {
        ps.ball.isOutOfBounds = true;
        LogEvent(1, DriveBall.name, `Ball out-of-bounds (FLIGHT).`, {
          pid,
          main: LogOType.Player,
        });
      }
    }

    if (
      ps.ball.isOutOfBounds &&
      pos.y < mod.YComponentOf(GetPlayerPos(player)) - 1
    ) {
      SetBallWorldIconVisible(pid, false);
    }

    const timeoutSeconds = 10;
    if (t >= timeoutSeconds) {
      LogEvent(
        1,
        DriveBall.name,
        `Ball flight timeout reached. Forcing to ground.`,
        { pid, main: LogOType.Player },
      );
      break;
    }
  }

  if (!ps.ball.isOutOfBounds) {
    SetBallWorldIconVisible(pid, true);
  }

  PlayHitGroundFx(player, pos);

  //------------------------------------------------------------
  // BOUNCE PHASE
  //------------------------------------------------------------

  SetBallPhase(pid, "BOUNCE");

  //TODO IN A FUNCT
  const ballGroundtTrailFx = SpawnBallTrailFx(
    player,
    mod.GetObjectPosition(ball),
  );
  if (ballGroundtTrailFx) mod.EnableVFX(ballGroundtTrailFx.entity, true);
  ps.ball.trailFXId = ballGroundtTrailFx?.id ?? null;

  const minBounceSpeed = 1.0;

  for (let i = 1; i <= 3; i++) {
    if (Math.abs(vel.y) < minBounceSpeed) break;

    const bounceResult = await simulateBounceArc(
      ball,
      player,
      holeNumber,
      ballGroundtTrailFx,
      pos,
      vel,
      dragFactor,
      ballWIName,
      initialPos,
      i,
      backspinEnabled,
    );

    pos = bounceResult.pos;
    vel = bounceResult.vel;
  }

  const rollTerrainY = GetTerrainHeight(holeNumber, {
    x: pos.x,
    y: pos.y,
    z: pos.z,
  });

  if (rollTerrainY !== null) {
    // Snap sim position
    pos.y = rollTerrainY;

    // Kill vertical velocity before roll
    vel.y = 0;

    // Snap object to same grounded Y
    const objVec = mod.GetObjectPosition(ball);
    const objY = mod.YComponentOf(objVec);
    const groundedY = rollTerrainY + 0.02;
    const dy = groundedY - objY;

    if (Math.abs(dy) > 0.001) {
      mod.MoveObject(ball, v3ToVector(v3(0, dy, 0)));
    }
  }

  SetBallPhase(pid, "ROLL");

  await SimulateRollPhase(
    player,
    holeData,
    holeNumber,
    courseGrid,
    ball,
    ballGroundtTrailFx,
    vel,
    pos,
    initialPos,
    shotToken,
    {
      enabled: ps.general.activeModifiers.backSpin as boolean,
      flightDirection: vectorToV3(facingVec),
    },
  );

  if (ps.ball.isInHole) {
    ResetSwingUIState(player);
    await FinalizeHoledBall(player, holeData, ball);
  } else {
    ResetSwingUIState(player);
    await FinalizeStoppedBall(player, initialPos, ball);
  }

  ConsumeActiveHitModifiers(player);
}

async function PuttBall(
  player: mod.Player,
  playerGroup: CourseGroup,
  powerFactor: number,
): Promise<void> {
  // -----------------------------
  // Validation
  // -----------------------------

  if (!mod.IsPlayerValid(player)) return;
  if (!GetPlayerIsAlive(player)) return;

  const ps = GetValidPlayerState(player);
  if (!ps) return;

  const pid = mod.GetObjId(player);

  const shotToken = ++ps.ball.token;

  const holeNumber = playerGroup.currentHole;
  const holeData = GetHoleData(holeNumber);
  const courseGrid = holeData.heightMap.grid;

  if (!courseGrid) {
    LogError(
      PuttBall.name,
      `Hole ${holeNumber} has no heightMap grid defined. Aborting`,
      17,
    );
    return;
  }

  // -----------------------------
  // Ball positioning
  // -----------------------------

  let pos: V3;

  if (ps.ball.lastObjectPos) {
    pos = ps.ball.lastObjectPos;
  } else {
    const soldierPos = GetPlayerPos(player);
    const facingVec = GetPlayerFacingDir(player);
    const facing = vectorToV3(facingVec);
    const forwardH = v3Normalize(v3(facing.x, 0, facing.z));

    pos = v3Add(vectorToV3(soldierPos), v3Scale(forwardH, 2.0));

    const terrainY = GetTerrainHeight(holeNumber, {
      x: pos.x,
      y: pos.y,
      z: pos.z,
    });

    if (terrainY !== null) pos.y = terrainY;
  }

  const initialPos = pos;

  const ball = SpawnPlayerBall(player, v3ToVector(pos));
  if (!ball) return;

  // -----------------------------
  // World icon
  // -----------------------------

  InitializeBallWorldIcon(player, pos, false, false);

  UpdateBallWorldIcon(player, initialPos, pos, ball, true, true);

  // -----------------------------
  // Initial roll velocity
  // -----------------------------

  const facingVec = GetPlayerFacingDir(player);
  const facing = vectorToV3(facingVec);
  const forwardH = v3Normalize(v3(facing.x, 0, facing.z));

  const puttSpeed = ComputePutterVelocity(player, holeNumber) * powerFactor;

  const vel: V3 = v3(forwardH.x * puttSpeed, 0, forwardH.z * puttSpeed);

  // -----------------------------
  // Ground trail FX & SFX
  // -----------------------------

  const ballGroundTrailFx = SpawnBallTrailFx(
    player,
    mod.GetObjectPosition(ball),
  );

  if (ballGroundTrailFx) mod.EnableVFX(ballGroundTrailFx.entity, true);
  ps.ball.trailFXId = ballGroundTrailFx?.id ?? null;

  PlayHitBallFx(player, v3ToVector(pos));

  // -----------------------------
  // Roll phase only
  // -----------------------------

  SetBallPhase(pid, "ROLL");

  HandlePlayerPosOnStopped(player);

  await SimulateRollPhase(
    player,
    holeData,
    holeNumber,
    courseGrid,
    ball,
    ballGroundTrailFx,
    vel,
    pos,
    initialPos,
    shotToken,
  );

  // -----------------------------
  // Finalization
  // -----------------------------

  SetPlayerIdleCourseRestrictions(player);

  if (ps.ball.isInHole) {
    ResetSwingUIState(player);
    await FinalizeHoledBall(player, holeData, ball);
  } else {
    ResetSwingUIState(player);
    await FinalizeStoppedBall(player, initialPos, ball);
  }

  const root = ps.ui.swingUI.root;
  if (root) root.hide();

  ConsumeActiveHitModifiers(player);
}

async function SimulateRollPhase(
  player: mod.Player,
  holeData: HoleData,
  holeNumber: number,
  courseGrid: HeightGrid,
  ball: mod.SpatialObject,
  ballGroundTrailFx: { entity: mod.VFX; id: number } | null,
  vel: V3,
  pos: V3,
  initialPos: V3,
  shotToken: number,
  backSpinParams?: { enabled: boolean; flightDirection: V3 },
): Promise<void> {
  function RollbackEase(t: number): number {
    if (t < 0) t = 0;
    if (t > 1) t = 1;

    if (t < 0.2) {
      return 0.5 + 0.5 * (t / 0.2);
    }

    const u = (t - 0.2) / 0.8;

    const curved = 1 - Math.pow(u, 4);
    const linear = 1 - u;

    // blend factor: 0 = linear, 1 = curved
    return 0.7 * curved + 0.3 * linear;
  }

  const pid = mod.GetObjId(player);
  const ps = players[pid];

  const dt = ballPhys.dt;
  const g = ballPhys.g;

  // 2D horizontal velocity
  let v = v3(vel.x, 0, vel.z);

  let backSpinFrame = 0;

  const clubBackSpinFactor =
    ClubParams[GetPlayerCurrentClub(player).type].backspin;

  const backSpinBrakeFrames = 12; // 0.4s at dt=0.033
  const backSpinPullFrames = 22; // 1.0s at dt=0.033
  const backSpinTotalFrames = backSpinBrakeFrames + backSpinPullFrames;

  const backSpinBrakeAccel = 20.0 * clubBackSpinFactor; // m/s^2
  const backSpinPullAccel = 18.0 * clubBackSpinFactor; // m/s^2

  const backSpin = backSpinParams ?? {
    enabled: false,
    flightDirection: v3(0, 0, 0),
  };

  const initialDir = backSpin.flightDirection;

  let rollbackFrame = 0;
  let rollBackEngaged = false;

  const rollbackFramesTotal = 280; // about 9 seconds at dt=0.033
  const rollbackFactor = 3.2; // higher = stronger rollback effect

  // ---------------------------
  // Roll timeout
  // ---------------------------
  let rollTime = 0;
  const maxRollTime = 18.0;

  const playerGroup = GetGroupFromPlayer(player);

  while (rollTime < maxRollTime) {
    await mod.Wait(dt);

    if (ShotCanceled(player, shotToken, ball)) {
      LogEvent(1, PuttBall.name, `Shot canceled.`, {
        pid,
        main: LogOType.Player,
      });
      return;
    }

    SetFlagFxVisibility(playerGroup, ps.ball.lastObjectPos);

    rollTime += dt;

    // ------------------------------------------------
    // CURRENT SPEED
    // ------------------------------------------------
    let speed = Math.sqrt(v.x * v.x + v.z * v.z);

    // ------------------------------------------------
    // OUT OF BOUNDS / HOLE CHECK
    // ------------------------------------------------
    const dir = speed > 0.0001 ? v3Normalize(v) : v3(0, 0, 0);

    if (IsBallOutOfBounds(player, holeNumber, pos, dir)) {
      ps.ball.isOutOfBounds = true;
      LogEvent(1, SimulateRollPhase.name, `Ball out-of-bounds (ROLL).`, {
        pid,
        main: LogOType.Player,
      });
      break;
    }

    if (BallIsInHole(player, ball, holeData)) {
      LogEvent(
        1,
        SimulateRollPhase.name,
        `Player holed their ball at Hole ${holeNumber}.`,
        {
          pid,
          gid: GetGroupFromPlayer(player)?.groupId ?? -1,
          main: LogOType.Player,
        },
      );
      break;
    }

    // ------------------------------------------------
    // TERRAIN SAMPLE
    // ------------------------------------------------
    const slope = SampleTerrainSlope_Plane(courseGrid, pos.x, pos.z);
    if (!slope) break;

    let downhill = ComputeDownhillFromSlope(slope.slopeX, slope.slopeZ); // normalized

    const slopeMag = Math.sqrt(
      slope.slopeX * slope.slopeX + slope.slopeZ * slope.slopeZ,
    );

    // ------------------------------------------------
    // STATIC vs DYNAMIC FRICTION
    // ------------------------------------------------
    const rollSurface = DetectSurfaceType(holeNumber, { x: pos.x, z: pos.z });

    let dynamicFriction: number;
    let staticFriction: number;

    switch (rollSurface) {
      case SurfaceType.Green:
        dynamicFriction = Surfaces[SurfaceType.Green].rollDecay;
        staticFriction = dynamicFriction * 0.2;
        break;
      case SurfaceType.Rough:
        dynamicFriction = Surfaces[SurfaceType.Rough].rollDecay;
        staticFriction = dynamicFriction * 0.1;
        break;
      case SurfaceType.Sand:
        dynamicFriction = Surfaces[SurfaceType.Sand].rollDecay;
        staticFriction = dynamicFriction * 0.1;
        break;
      default:
        dynamicFriction = Surfaces[SurfaceType.Fairway].rollDecay;
        staticFriction = dynamicFriction * 0.1;
        break;
    }

    // ------------------------------------------------
    // PHYSICS ACCELERATIONS (2D)
    // ------------------------------------------------
    const speedFactor = Math.min(1, speed / 1.5);

    // NEW: minimum slope influence (tweak this)
    const slopeFloor = 0.7; // lower = slope matters less at high speed
    let slopeAccelScale = 0.9; // higher = more slope effect

    if (rollBackEngaged) {
      const t = rollbackFrame / rollbackFramesTotal;
      const ease = RollbackEase(t);
      slopeAccelScale *= rollbackFactor * ease;
    }

    const slopeWeight = slopeFloor + (1 - slopeFloor) * (1 - speedFactor);

    const slopeMagClamped = Math.min(1.0, slopeMag);
    const aSlopeEffMag = g * slopeMagClamped * slopeAccelScale * slopeWeight;

    const aSlope = v3(downhill.x * aSlopeEffMag, 0, downhill.z * aSlopeEffMag);

    let aFriction =
      speed > 0
        ? v3(
            (-v.x / speed) * dynamicFriction,
            0,
            (-v.z / speed) * dynamicFriction,
          )
        : { x: 0, y: 0, z: 0 };

    const backspinActive =
      backSpin.enabled && backSpinFrame < backSpinTotalFrames;

    // If stopped but slope is strong enough = nudge to start rollback
    if (
      speed < ballPhys.minRollSpeed &&
      aSlopeEffMag >= staticFriction &&
      !backspinActive &&
      !rollBackEngaged
    ) {
      const nudge = ballPhys.minRollSpeed * 2; // tweak 0.15-0.4
      v = v3(downhill.x * nudge, 0, downhill.z * nudge);
      speed = nudge;
      rollBackEngaged = true;
    } else if (speed < ballPhys.minRollSpeed * 1.2 && !backspinActive) {
      break;
    }

    if (rollBackEngaged) {
      // speed already set; recompute friction using the nudged v/speed
      aFriction =
        speed > 0
          ? v3(
              (-v.x / speed) * dynamicFriction,
              0,
              (-v.z / speed) * dynamicFriction,
            )
          : { x: 0, y: 0, z: 0 };

      rollbackFrame++;

      if (rollbackFrame >= rollbackFramesTotal) {
        rollBackEngaged = false;
      }
    }

    // ------------------------------------------------
    // BACKSPIN (simple 2-phase)
    // ------------------------------------------------
    let aBackSpin = v3(0, 0, 0);

    if (backspinActive) {
      backSpinFrame++;

      if (backSpinFrame <= backSpinBrakeFrames) {
        // Phase 1: brake opposite current motion (check hard)
        if (speed > 0.001) {
          const dir = v3Normalize(v);
          aBackSpin = v3(
            -dir.x * backSpinBrakeAccel,
            0,
            -dir.z * backSpinBrakeAccel,
          );
        }
      } else if (clubBackSpinFactor >= ClubParams[ClubType.I6].backspin) {
        // Phase 2: pull back opposite initial direction (force rollback)
        aBackSpin = v3(
          -initialDir.x * backSpinPullAccel,
          0,
          -initialDir.z * backSpinPullAccel,
        );
      }
    }

    // ------------------------------------------------
    // MICRO BUMPS (GREEN ONLY)
    // ------------------------------------------------
    let bumpLoss = 0;
    if (rollSurface === SurfaceType.Green && !backspinActive) {
      const bump = mod.RandomReal(-1, 1) * 0.002; // meters
      bumpLoss = Math.abs(bump) * 3.0;
    }

    // ------------------------------------------------
    // INTEGRATE VELOCITY
    // ------------------------------------------------
    v = v3(
      v.x + (aSlope.x + aFriction.x + aBackSpin.x) * dt,
      0,
      v.z + (aSlope.z + aFriction.z + aBackSpin.z) * dt,
    );

    let newSpeed = Math.sqrt(v.x * v.x + v.z * v.z);
    newSpeed = Math.max(0, newSpeed - bumpLoss);

    if (newSpeed > 0) {
      const n = v3Normalize(v);
      v = v3(n.x * newSpeed, 0, n.z * newSpeed);
    } else {
      v = { x: 0, y: 0, z: 0 };
    }

    // ------------------------------------------------
    // MOVE BALL
    // ------------------------------------------------
    const prevPos = v3(pos.x, pos.y, pos.z);

    const candPos = v3(pos.x + v.x * dt, pos.y, pos.z + v.z * dt);

    const nextSlope = SampleTerrainSlope_Plane(
      courseGrid,
      candPos.x,
      candPos.z,
    );

    if (nextSlope) {
      const dy = nextSlope.h - prevPos.y;
      pos = v3(
        candPos.x,
        prevPos.y + Math.max(-0.05, Math.min(0.05, dy)),
        candPos.z,
      );
    } else {
      pos = candPos;
    }

    mod.MoveObject(ball, v3ToVector(v3Sub(pos, prevPos)));

    if (ballGroundTrailFx) {
      MoveBallTrailFX(pos, ballGroundTrailFx.entity);
    }

    UpdateBallWorldIcon(player, initialPos, pos, ball);

    // Camera
    if (GetPlayerCurrentClub(player).type !== ClubType.PT) {
      const camPos = v3(pos.x, pos.y + 3, pos.z);
      MoveCameraToPos(
        camPos,
        { trackedPos: pos, trackYaw: true, trackPitch: true },
        0,
        vel,
      );
    }
  }

  // ------------------------------------------------
  // FINAL SNAP
  // ------------------------------------------------
  const finalY = GetTerrainHeight(holeNumber, pos);
  if (finalY !== null) {
    const groundedY = finalY + 0.02;
    const objY = mod.YComponentOf(mod.GetObjectPosition(ball));
    mod.MoveObject(ball, v3ToVector(v3(0, groundedY - objY, 0)));
    pos.y = groundedY;
  }

  SetBallPhase(pid, "STOPPED");
}

async function FinalizeHoledBall(
  player: mod.Player,
  holeData: HoleData,
  ball: mod.SpatialObject,
) {
  const ps = GetValidPlayerState(player);
  if (!ps) return false;

  if (ball == null) return false;

  const group = GetGroupFromPlayer(player);
  if (!group) return;

  const pid = mod.GetObjId(player);
  const gid = group.groupId;

  UpdatePlayerHoleStrokes(pid, group.currentHole, ScoreUpdateType.HoleComplete);
  UpdateGameScoreboardForPlayer(player);

  UnspawnPlayerBall(pid);

  for (const p of group.players) {
    SetupGroupPlayersUI(group, p.player);
  }

  let mainMessage: mod.Message;
  let commentMessage: mod.Message | null = null;
  let messageDelay = 6;

  const sparksPos = {
    x: holeData.flagPt.x,
    y: holeData.flagPt.y,
    z: holeData.flagPt.z,
  };

  PlaySFX(sfxBallInHoleOneShot, ZERO_VEC, player);

  const sparksFx = await PlayVFX(
    vfxSparks,
    v3ToVector(sparksPos),
    true,
    false,
    8,
  );

  mod.SetVFXScale(sparksFx, 3);

  mod.SetVFXColor(sparksFx, UI.COLORS.GOLD_YELLOW);

  if (GetPlayerCurrentShot(pid) === 1) {
    mainMessage = mod.Message(
      "BALL_IN_H_IN_ONE" + ps.general.languageSuffix,
      player,
    );

    PlaySFX(
      sfxBallInHoleCrowd,
      v3ToVector(holeData.teeOffPlayerPts[0]),
      undefined,
      {
        is3D: true,
        duration: 8,
        amplitude: 0.3,
        range: 1000,
      },
    );

    PlaySFX(
      sfxBallInHoleCrowd,
      v3ToVector(holeData.teeOffPlayerPts[1]),
      undefined,
      {
        is3D: true,
        duration: 8,
        amplitude: 0.3,
        range: 1000,
      },
    );
  } else {
    const holeMessages = GetHoleResultMessages(player, holeData.par);
    mainMessage = holeMessages.main;
    commentMessage = holeMessages.comment;
    messageDelay = 5;
  }

  /*for (const r of [
    mod.CreateVector(180, 0, 0),
    mod.CreateVector(0, 180, 0),
    mod.CreateVector(0, 0, 180), // THIS IS DOWN
  ]) {
    await mod.MoveVFX(sparksFx, v3ToVector(sparksPos), r);
    await mod.Wait(2);
  }*/

  if (GetPlayerCurrentShot(pid) <= holeData.par) {
    PlaySFX(sfxBallInHoleCrowd, v3ToVector(holeData.flagPt), undefined, {
      is3D: true,
      duration: 8,
      amplitude: 0.5,
      range: GetPlayerCurrentShot(pid) === 1 ? 1000 : 400,
    });
  }

  const messages = commentMessage
    ? { main: mainMessage, comment: commentMessage }
    : { main: mainMessage, comment: null };

  await ShowNotification(
    { type: "group", id: gid },
    messages,
    NotifyPosition.Top,
    messageDelay,
    {
      displayProgressBar: true,
    },
  );

  if (AllGroupBallsInHole(group)) {
    LogEvent(
      1,
      FinalizeHoledBall.name,
      `All players in group have holed their ball. Moving to next hole.`,
      { gid, main: LogOType.Group },
    );
    InitializeGroupNextHole(group);
  } else {
    InitializeNextShot(group);
  }
}

function GetHoleResultMessages(
  player: mod.Player,
  holePar: number,
): { main: mod.Message; comment: mod.Message } {
  const pid = mod.GetObjId(player);
  const strokes = GetPlayerCurrentShot(pid);
  const diff = strokes - holePar;

  const ps = GetValidPlayerState(player);
  if (!ps) return { main: mod.Message(""), comment: mod.Message("") };

  let baseKey: string;

  if (diff <= -3) {
    baseKey = "BALL_IN_H_ALBATROSS";
  } else if (diff === -2) {
    baseKey = "BALL_IN_H_EAGLE";
  } else if (diff === -1) {
    baseKey = "BALL_IN_H_BIRDIE";
  } else if (diff === 0) {
    baseKey = "BALL_IN_H_PAR";
  } else if (diff === 1) {
    baseKey = "BALL_IN_H_BOGEY";
  } else if (diff === 2) {
    baseKey = "BALL_IN_H_DOUBLE_BOGEY";
  } else if (diff === 3) {
    baseKey = "BALL_IN_H_TRIPLE_BOGEY";
  } else if (diff === 4) {
    baseKey = "BALL_IN_H_QUADRUPLE_BOGEY";
  } else {
    baseKey = "BALL_IN_H_OVER_PAR";
  }

  // MAIN message key
  const msg1 = baseKey + "_MAIN";

  // Random key
  const keyIndex = 1 + Math.floor(Math.random() * 4);
  const msg2 = baseKey + "_KEY" + keyIndex;

  return {
    main: mod.Message(
      msg1 + ps.general.languageSuffix,
      player,
      strokes,
      holePar,
    ),
    comment: mod.Message(msg2 + ps.general.languageSuffix),
  };
}

async function FinalizeStoppedBall(
  player: mod.Player,
  initialBallPos: V3,
  ball: mod.SpatialObject,
) {
  if (!mod.IsPlayerValid(player) || ball == null) return false;

  const pid = mod.GetObjId(player);
  const group = GetGroupFromPlayer(player);
  const ps = players[pid];

  if (!group || !GroupIsValid(group.groupId)) return false;

  let message = mod.Message("");

  UpdatePlayerHoleStrokes(pid, group.currentHole, ScoreUpdateType.MidHole);

  UpdateGameScoreboardForPlayer(player);

  SetPlayerCurrentShot(pid, GetPlayerCurrentShot(pid) + 1);

  UnspawnPlayerBallTrail(pid);

  const ballSurface =
    DetectSurfaceType(group.currentHole, {
      x: mod.XComponentOf(mod.GetObjectPosition(ball)),
      z: mod.ZComponentOf(mod.GetObjectPosition(ball)),
    }) ?? null;

  if (
    ps.ball.isOutOfBounds ||
    (ballSurface != null && ballSurface === SurfaceType.Water) ||
    (ballSurface != null && ballSurface === SurfaceType.OutOfBounds)
  ) {
    UnspawnPlayerBall(pid);

    if (ballSurface === SurfaceType.Water) {
      LogEvent(
        1,
        FinalizeStoppedBall.name,
        `Ball stopped in WATER.`,
        { pid, main: LogOType.Player },
        true,
      );
      message = mod.Message("BALL_STOPPED_WATER" + ps.general.languageSuffix);
      PlaySFX(sfxWaterOneShot, ZERO_VEC, player);
    } else {
      LogEvent(
        1,
        FinalizeStoppedBall.name,
        `Ball is OUT OF BOUNDS.`,
        { pid, main: LogOType.Player },
        true,
      );
      message = mod.Message(
        "BALL_STOPPED_OUT_OF_BOUNDS" + ps.general.languageSuffix,
      );
      PlaySFX(sfxOutOfBoundsOneShot, ZERO_VEC, player);
    }

    const newBall = SpawnPlayerBall(player, v3ToVector(initialBallPos));
    if (!newBall) return false;

    ps.ball.lastShotDistance = 0;

    const flagPt = GetHoleData(group.currentHole).flagPt;

    const distToFlag = DistanceBetween(
      v3ToVector(ps.ball.lastObjectPos ?? flagPt),
      v3ToVector(flagPt),
      DistanceType.XZ,
      DistanceUnit.Yards,
      1,
    );
    ps.ball.distanceToFlag = distToFlag.wholeWithDecimals;

    const lbl = group.ui.groupPlayersUI.distanceToFlagLabels?.[pid];
    if (lbl) {
      lbl.setMessage(
        mod.Message(
          "DISTANCE_YARDS" + ps.general.languageSuffix,
          distToFlag.whole,
          distToFlag.fraction,
        ),
      );
    }

    // (optional but usually correct) also clear the OB latch if you use one
    ps.ball.isOutOfBounds = false;
  } else {
    ps.ball.lastShotDistance = DistanceBetween(
      v3ToVector(initialBallPos),
      mod.GetObjectPosition(ball),
      DistanceType.XZ,
      DistanceUnit.Yards,
      1,
    ).wholeWithDecimals;

    ps.ball.lastObjectPos = vectorToV3(mod.GetObjectPosition(ball));

    const distToFlag = DistanceBetween(
      v3ToVector(ps.ball.lastObjectPos),
      v3ToVector(GetHoleData(group.currentHole).flagPt),
      DistanceType.XZ,
      DistanceUnit.Yards,
      1,
    );

    ps.ball.distanceToFlag = distToFlag.wholeWithDecimals;

    const lbl = group.ui.groupPlayersUI.distanceToFlagLabels?.[pid];
    if (lbl) {
      lbl.setMessage(
        mod.Message(
          "DISTANCE_YARDS" + ps.general.languageSuffix,
          distToFlag.whole,
          distToFlag.fraction,
        ),
      );
    }

    switch (ballSurface) {
      case SurfaceType.TeeBox:
        LogEvent(
          1,
          FinalizeStoppedBall.name,
          `Ball stopped on TEE BOX.`,
          { pid, main: LogOType.Player },
          true,
        );
        message = mod.Message(
          "BALL_STOPPED_TEEBOX" + ps.general.languageSuffix,
        );
        break;
      case SurfaceType.Green:
        LogEvent(
          1,
          FinalizeStoppedBall.name,
          `Ball stopped on GREEN.`,
          { pid, main: LogOType.Player },
          true,
        );
        message = mod.Message("BALL_STOPPED_GREEN" + ps.general.languageSuffix);
        break;
      case SurfaceType.Fringe:
        LogEvent(
          1,
          FinalizeStoppedBall.name,
          `Ball stopped on FRINGE.`,
          { pid, main: LogOType.Player },
          true,
        );
        message = mod.Message(
          "BALL_STOPPED_FRINGE" + ps.general.languageSuffix,
        );
        break;
      case SurfaceType.Sand:
        LogEvent(
          1,
          FinalizeStoppedBall.name,
          `Ball stopped on SAND.`,
          { pid, main: LogOType.Player },
          true,
        );
        message = mod.Message("BALL_STOPPED_SAND" + ps.general.languageSuffix);
        break;
      case SurfaceType.Fairway:
        LogEvent(
          1,
          FinalizeStoppedBall.name,
          `Ball stopped on FAIRWAY.`,
          { pid, main: LogOType.Player },
          true,
        );
        message = mod.Message(
          "BALL_STOPPED_FAIRWAY" + ps.general.languageSuffix,
        );
        break;
      case SurfaceType.Rough:
        LogEvent(
          1,
          FinalizeStoppedBall.name,
          `Ball stopped on ROUGH.`,
          { pid, main: LogOType.Player },
          true,
        );
        message = mod.Message("BALL_STOPPED_ROUGH" + ps.general.languageSuffix);
        break;
      case null:
        LogEvent(
          1,
          FinalizeStoppedBall.name,
          `Ball stopped on NULL SurfaceType. Defaulting to ROUGH.`,
          { pid, main: LogOType.Player },
          true,
        );
        message = mod.Message("BALL_STOPPED_ROUGH" + ps.general.languageSuffix);
        break;
    }

    SetPlayerBallSurfaceType(player, ballSurface ?? SurfaceType.Rough);

    LogEvent(
      1,
      FinalizeStoppedBall.name,
      `Last ball position : x: ${ps.ball.lastObjectPos.x.toFixed(
        2,
      )} y: ${ps.ball.lastObjectPos.y.toFixed(
        2,
      )} z: ${ps.ball.lastObjectPos.z.toFixed(2)}`,
      { pid, main: LogOType.Player },
    );
  }

  // Disable screen effect
  mod.EnableScreenEffect(player, mod.ScreenEffects.Stealth, false);

  await ShowNotification(
    { type: "player", id: pid },
    { main: message, comment: null },
    NotifyPosition.Top,
    3,
  );

  if (group && GroupIsValid(group.groupId)) {
    InitializeNextShot(group);
  }

  return true;
}

function IsBallOutOfBounds(
  player: mod.Player,
  holeNumber: number,
  ballPos: V3,
  ballVel: V3,
): boolean {
  const courseGrid = CourseData[holeNumber].heightMap.grid;
  if (!courseGrid) return true;

  // Horizontal speed (used for gating edge cases)
  const horizSpeedSq = ballVel.x * ballVel.x + ballVel.z * ballVel.z;

  // World to grid indices
  const gx = Math.floor((ballPos.x - courseGrid.minX) / courseGrid.step);
  const gz = Math.floor((ballPos.z - courseGrid.minZ) / courseGrid.step);

  // Level 1: Outside grid entirely
  if (
    gx < 0 ||
    gz < 0 ||
    gx + 1 >= courseGrid.h.length ||
    gz + 1 >= courseGrid.h[0].length
  ) {
    LogEvent(
      2,
      IsBallOutOfBounds.name,
      `Ball is OUT OF BOUNDS (Level 1 check: outside grid).`,
      { pid: mod.GetObjId(player), main: LogOType.Player },
    );
    return true;
  }

  // 4 nearest grid samples
  const h00 = courseGrid.h[gx][gz];
  const h10 = courseGrid.h[gx + 1][gz];
  const h01 = courseGrid.h[gx][gz + 1];
  const h11 = courseGrid.h[gx + 1][gz + 1];

  let nullCount = 0;
  if (h00 == null) nullCount++;
  if (h10 == null) nullCount++;
  if (h01 == null) nullCount++;
  if (h11 == null) nullCount++;

  // Level 2: Inside grid but majority Y values are null (account for concave course/grid)
  if (nullCount >= 3) {
    LogEvent(
      2,
      IsBallOutOfBounds.name,
      `Ball is OUT OF BOUNDS (Level 2 check: majority null).`,
      { pid: mod.GetObjId(player), main: LogOType.Player },
    );
    return true;
  }

  // Level 3: ambiguous edge (2 nulls) + outward motion; gated by low speed to avoid noise
  if (nullCount === 2 && horizSpeedSq < 0.04) {
    // Approximate outward normal from null distribution
    let nx = 0;
    let nz = 0;

    if (h00 == null) {
      nx -= 1;
      nz -= 1;
    }
    if (h10 == null) {
      nx += 1;
      nz -= 1;
    }
    if (h01 == null) {
      nx -= 1;
      nz += 1;
    }
    if (h11 == null) {
      nx += 1;
      nz += 1;
    }

    const len = Math.hypot(nx, nz);
    if (len > 0) {
      nx /= len;
      nz /= len;

      // Horizontal velocity dot outward normal
      const dot = ballVel.x * nx + ballVel.z * nz;
      if (dot > 0) {
        LogEvent(
          2,
          IsBallOutOfBounds.name,
          `Ball is OUT OF BOUNDS (Level 3 check: ambiguous edge, outward motion).`,
          { pid: mod.GetObjId(player), main: LogOType.Player },
        );
        return true;
      }
    }
  }

  if (DEBUG_MODE_LEVEL > 0)
    LogEvent(
      2,
      IsBallOutOfBounds.name,
      `Ball is IN bounds (Fallback: inside grid).`,
      { pid: mod.GetObjId(player), main: LogOType.Player },
    );
  return false;
}

function BallIsInHole(
  player: mod.Player,
  ball: mod.SpatialObject,
  holeData: HoleData,
): boolean {
  if (!mod.IsPlayerValid(player) || ball == null || holeData == null)
    return false;

  const ps = GetValidPlayerState(player);
  if (!ps) return false;

  const ballPos = mod.GetObjectPosition(ball);
  const pinPos = v3ToVector(holeData.flagPt);

  let result: boolean;

  if (
    DistanceBetween(ballPos, pinPos, DistanceType.XZ, DistanceUnit.Meters, 3)
      .wholeWithDecimals < FLAG_CUP_RADIUS
  ) {
    result = true;
  } else {
    result = false;
  }

  ps.ball.isInHole = result;
  ps.ball.lastObjectPos = null;
  ps.ball.distanceToFlag = null;

  return result;
}

function AllGroupBallsInHole(group: CourseGroup): boolean {
  let allBallsInHole = true;

  for (const p of group.players) {
    const ps = GetValidPlayerState(p.player);
    if (!ps) return false;
    if (!ps.ball.isInHole) {
      allBallsInHole = false;
      break;
    }
  }
  return allBallsInHole;
}

function UnspawnPlayerBall(pid: number) {
  const ps = players[pid];
  if (!ps) return;

  if (ps.ball.object != null) {
    LogEvent(
      1,
      UnspawnPlayerBall.name,
      `Ball unspawned (ball id: ${mod.GetObjId(ps.ball.object)}).`,
      { pid, main: LogOType.Player },
    );
    mod.UnspawnObject(ps.ball.object);

    ps.ball.object = null;
    ps.ball.lastObjectPos = null;
    ps.ball.distanceToFlag = null;
  }

  UnspawnPlayerBallTrail(pid);
  DeleteBallWorldIcon(pid);
}

function UnspawnPlayerBallTrail(pid: number): void {
  const ps = players[pid];
  if (!ps) return;

  if (ps.ball.trailFXId != null) {
    const fxObj = mod.GetSpatialObject(ps.ball.trailFXId);
    if (fxObj != null)
      try {
        mod.UnspawnObject(fxObj);
      } catch (e) {
        LogEvent(
          3,
          UnspawnPlayerBallTrail.name,
          `Error unspawning ball trail FX: ${e}`,
          { pid, main: LogOType.Player },
        );
      }
    ps.ball.trailFXId = null;
    LogEvent(1, UnspawnPlayerBallTrail.name, `Ball trail FX unspawned.`, {
      pid,
      main: LogOType.Player,
    });
  }
}
