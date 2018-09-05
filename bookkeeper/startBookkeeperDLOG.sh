/opt/bookkeeper/bin/dlog admin bind  -l /ledgers -s ${BK_zkServers} -c distributedlog://${BK_zkServers}/pigeon40namespace
/opt/bookkeeper/scripts/entrypoint.sh bookie