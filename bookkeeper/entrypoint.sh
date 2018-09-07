#!/usr/bin/env bash
#
#/**
# * Copyright 2007 The Apache Software Foundation
# *
# * Licensed to the Apache Software Foundation (ASF) under one
# * or more contributor license agreements.  See the NOTICE file
# * distributed with this work for additional information
# * regarding copyright ownership.  The ASF licenses this file
# * to you under the Apache License, Version 2.0 (the
# * "License"); you may not use this file except in compliance
# * with the License.  You may obtain a copy of the License at
# *
# *     http://www.apache.org/licenses/LICENSE-2.0
# *
# * Unless required by applicable law or agreed to in writing, software
# * distributed under the License is distributed on an "AS IS" BASIS,
# * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# * See the License for the specific language governing permissions and
# * limitations under the License.
# */

source /opt/bookkeeper/scripts/common.sh

function wait_for_zookeeper() {
    echo "wait for zookeeper"
    until /opt/bookkeeper/bin/bookkeeper org.apache.zookeeper.ZooKeeperMain -server ${BK_zkServers} ls /; do sleep 5; done
}

function create_zk_root() {
    echo "create the zk root dir for bookkeeper"
    /opt/bookkeeper/bin/bookkeeper org.apache.zookeeper.ZooKeeperMain -server ${BK_zkServers} create ${BK_CLUSTER_ROOT_PATH}
}

# Init the cluster if required znodes not exist in Zookeeper.
# Use ephemeral zk node as lock to keep initialize atomic.
function init_cluster() {
    echo "init_cluster"
    /opt/bookkeeper/bin/bookkeeper shell initnewcluster
    echo "init_cluster result"
    echo $?
}

# Create default dlog namespace
# Use ephemeral zk node as lock to keep initialize atomic.
function create_dlog_namespace() {
    echo "create dlog namespace /opt/bookkeeper/bin/dlog admin bind -l ${BK_zkLedgersRootPath} -s ${BK_zkServers} -c distributedlog://${BK_zkServers}${BK_dlogRootPath}"
   /opt/bookkeeper/bin/dlog admin bind -l ${BK_zkLedgersRootPath} -s ${BK_zkServers} -c distributedlog://${BK_zkServers}${BK_dlogRootPath}
}

function init_bookie() {

    # create dirs if they don't exist
    #create_bookie_dirs

    # wait zookeeper to run
    wait_for_zookeeper

    # create zookeeper root
    create_zk_root

    # init the cluster
    init_cluster

    # create dlog namespace
    create_dlog_namespace

}

init_bookie

/opt/bookkeeper/bin/bookkeeper bookie
