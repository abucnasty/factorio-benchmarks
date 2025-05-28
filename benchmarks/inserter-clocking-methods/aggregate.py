import pandas as pd
import matplotlib.pyplot as plt

# Load CSV data from the user input
from io import StringIO

csv_data = """
map_name,run_index,startup_time,end_time,avg_ms,min_ms,max_ms,ticks,execution_time,effective_UPS,factorio_version,platform
inserter_bm_enable_clocked.zip,1,6.990,18.380,0.693,0.386,3.245,10000,6934.880,1441.99,2.0.47,WindowsStandalone
inserter_bm_enable_clocked_split_side.zip,1,5.967,16.715,0.658,0.381,2.066,10000,6580.176,1519.72,2.0.47,WindowsStandalone
inserter_bm_filter_clocked.zip,1,5.731,16.311,0.654,0.437,3.000,10000,6541.708,1528.65,2.0.47,WindowsStandalone
inserter_bm_filter_clocked_split_side.zip,1,6.054,16.741,0.664,0.414,2.226,10000,6638.210,1506.43,2.0.47,WindowsStandalone
inserter_bm_threshold.zip,1,6.027,17.538,0.646,0.508,2.308,10000,6457.566,1548.57,2.0.47,WindowsStandalone
inserter_bm_threshold_guarded.zip,1,7.558,18.971,0.690,0.492,3.282,10000,6897.848,1449.73,2.0.47,WindowsStandalone
inserter_bm_wake_list_only.zip,1,6.050,17.489,0.736,0.513,2.554,10000,7361.627,1358.4,2.0.47,WindowsStandalone
inserter_bm_enable_clocked.zip,2,6.080,16.843,0.645,0.385,2.485,10000,6452.603,1549.76,2.0.47,WindowsStandalone
inserter_bm_enable_clocked_split_side.zip,2,6.048,17.049,0.677,0.368,2.498,10000,6766.678,1477.83,2.0.47,WindowsStandalone
inserter_bm_filter_clocked.zip,2,6.089,17.302,0.704,0.446,2.611,10000,7040.464,1420.36,2.0.47,WindowsStandalone
inserter_bm_filter_clocked_split_side.zip,2,5.859,17.193,0.705,0.430,2.871,10000,7046.796,1419.08,2.0.47,WindowsStandalone
inserter_bm_threshold.zip,2,5.989,17.065,0.674,0.493,3.843,10000,6736.817,1484.38,2.0.47,WindowsStandalone
inserter_bm_threshold_guarded.zip,2,6.142,18.642,0.730,0.512,2.410,10000,7296.121,1370.59,2.0.47,WindowsStandalone
inserter_bm_wake_list_only.zip,2,5.730,16.962,0.721,0.507,2.318,10000,7212.758,1386.43,2.0.47,WindowsStandalone
inserter_bm_enable_clocked.zip,3,5.819,17.000,0.681,0.416,2.191,10000,6814.095,1467.55,2.0.47,WindowsStandalone
inserter_bm_enable_clocked_split_side.zip,3,5.922,17.111,0.692,0.408,2.411,10000,6920.828,1444.91,2.0.47,WindowsStandalone
inserter_bm_filter_clocked.zip,3,5.971,17.033,0.698,0.440,2.206,10000,6977.356,1433.21,2.0.47,WindowsStandalone
inserter_bm_filter_clocked_split_side.zip,3,6.023,17.141,0.687,0.428,3.600,10000,6868.120,1456,2.0.47,WindowsStandalone
inserter_bm_threshold.zip,3,6.062,17.168,0.677,0.518,3.226,10000,6770.313,1477.04,2.0.47,WindowsStandalone
inserter_bm_threshold_guarded.zip,3,6.132,18.376,0.737,0.518,4.579,10000,7368.633,1357.1,2.0.47,WindowsStandalone
inserter_bm_wake_list_only.zip,3,5.866,17.332,0.745,0.520,2.750,10000,7447.215,1342.78,2.0.47,WindowsStandalone
inserter_bm_enable_clocked.zip,4,6.040,17.089,0.675,0.410,2.720,10000,6746.657,1482.22,2.0.47,WindowsStandalone
inserter_bm_enable_clocked_split_side.zip,4,6.046,17.221,0.689,0.393,2.251,10000,6887.746,1451.85,2.0.47,WindowsStandalone
inserter_bm_filter_clocked.zip,4,5.974,17.100,0.702,0.426,2.119,10000,7024.064,1423.68,2.0.47,WindowsStandalone
inserter_bm_filter_clocked_split_side.zip,4,6.029,18.091,0.736,0.429,3.473,10000,7361.261,1358.46,2.0.47,WindowsStandalone
inserter_bm_threshold.zip,4,6.323,17.461,0.675,0.520,2.498,10000,6752.143,1481.01,2.0.47,WindowsStandalone
inserter_bm_threshold_guarded.zip,4,6.295,17.915,0.718,0.497,2.494,10000,7175.420,1393.65,2.0.47,WindowsStandalone
inserter_bm_wake_list_only.zip,4,5.857,17.330,0.746,0.499,2.446,10000,7463.317,1339.89,2.0.47,WindowsStandalone
inserter_bm_enable_clocked.zip,5,6.142,17.199,0.678,0.418,2.881,10000,6782.863,1474.3,2.0.47,WindowsStandalone
inserter_bm_enable_clocked_split_side.zip,5,6.042,17.050,0.677,0.399,2.222,10000,6766.350,1477.9,2.0.47,WindowsStandalone
inserter_bm_filter_clocked.zip,5,5.877,16.765,0.692,0.418,2.352,10000,6915.014,1446.13,2.0.47,WindowsStandalone
inserter_bm_filter_clocked_split_side.zip,5,5.972,16.795,0.672,0.408,3.949,10000,6716.024,1488.98,2.0.47,WindowsStandalone
inserter_bm_threshold.zip,5,6.099,17.120,0.662,0.514,2.080,10000,6620.143,1510.54,2.0.47,WindowsStandalone
inserter_bm_threshold_guarded.zip,5,6.185,17.520,0.694,0.499,2.605,10000,6942.151,1440.48,2.0.47,WindowsStandalone
inserter_bm_wake_list_only.zip,5,5.859,16.931,0.713,0.511,2.083,10000,7126.793,1403.16,2.0.47,WindowsStandalone
"""

df = pd.read_csv(StringIO(csv_data))

# Compute statistics of interest grouped by map_name
stats = df.groupby('map_name')[['effective_UPS', 'avg_ms', 'min_ms', 'max_ms']].agg(['mean', 'std', 'min', 'max'])

stats.reset_index(inplace=True)
stats.columns = ['_'.join(col).strip('_') for col in stats.columns.values]

stats.sort_values(by='effective_UPS_mean', ascending=False, inplace=True)

stats.head(10)