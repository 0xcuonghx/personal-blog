---
title: "[Ethereum Networking] Part 1: The Execution Layer"
date: "2023-07-10T10:48:04.377Z"
description: "Ethereum is a peer-to-peer network with thousands of nodes that must be able to communicate with one another using standardized protocols. The "networking layer" is the stack of protocols that allow those nodes to find each other and exchange information."
---
# Overview
A Peer To Peer (p2p) network is an overlay network build on top of public internet
There are two parts to the client software:

- <strong>Execution clients</strong> 
- <strong>Consensus clients</strong>

Each with its own distinct networking stack. As well as communicating with other Ethereum nodes, the execution and consensus clients have to communicate with each other.

The Execution Layer includes some tasks:
- Node Discovery: nodes to discover and locate other Ethereum nodes in the network
- Peer-to-Peer Communication: enables nodes to establish direct communication channels with other peers in the network. It supports both encrypted and unencrypted communication, ensuring secure data exchange between trusted peers

# The Execution layer

Ethereum 1.0 and The Execution layer in Ethereum 2.0 Execution Layer nodes speak other through a framework of network protocol called `devp2p` - that composed of:
- the RLPx framework: `discovery` and `wire protocol`
- Sub-protocols: ETHv63, SHHv1, LESv1, etc

![devp2p](./figures/devp2p.png)

## RLPx discovery

### Bootstrapping
This is bootstrapped using a small set of bootnodes (nodes whose addresses are hardcoded into the client so they can be found immediately and connect the client to peers)

> #### Bootnode
> is node only implement network discovery, only exist to introduce a new node to a set of peer, they do not participate in normal client tasks like syncing the chain

### Bonding 

![discovery](./figures/discovery.png)

#### PING-PONG
- This PING includes hashed information about the new node, the bootnode and an expiry time-stamp
- The bootnode receives the PING and returns a PONG containing the PING hash
- If the PING and PONG hashes match then the connection between the new node and bootnode is verified and they are said to have "bonded"

#### FIND-NEIGHBOURS
-  If the nodes are not bonded, the FIND-NEIGHBOURS request will fail, so the new node will not be able to enter the network

RLPx handles peer discovery via a Kademlia DHT-based on UDP protocol. It's bootstrap a seed nodes and performs iterative lookups on the network, filling up a k-bucket peer routing table where nodes take up positions based on their the XOR distance metric.