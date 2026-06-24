prefix=$1
echo "Running benchmark 2.0 and 2.1 with prefix: $prefix"
./benchmark_2_0.sh $prefix
./benchmark_2_1.sh $prefix
./chart.sh $prefix