FROM apache/bookkeeper:4.7.2

COPY entrypoint.sh /opt/bookkeeper/scripts/
COPY apply-config-from-env.py /opt/bookkeeper/scripts/
ENTRYPOINT ["/bin/bash","/opt/bookkeeper/scripts/entrypoint.sh" ]
