---
title: "OpenTradeInfra M1: Market Data and FIX Gateway"
summary: "First milestone recap for OpenTradeInfra — a working QuickFIX acceptor/initiator, synthetic order flow, and end-to-end message handling."
pubDatetime: 2025-11-18T12:40:00Z
tags:
  - opentradeinfra
  - trading-infrastructure
  - fix
  - projects
  - milestones
draft: false
timezone: "Europe/Paris"
---
---
This is the first milestone update for **OpenTradeInfra**, my personal project to build a transparent trading infrastructure using open-source tools and synthetic data.

Milestone **M1 — Market Data + FIX Gateway** is now complete. The goal of this milestone was simple: get a basic but realistic FIX flow up and running end-to-end, with a clear separation between client and gateway, and full visibility into the messages.

## What M1 Covers

From the project plan, M1 includes:

- A **QuickFIX Acceptor** acting as the exchange side  
- A **QuickFIX Initiator** acting as the client  
- A **synthetic order flow generator**  
- Basic **validation and message handling** around NewOrderSingle and ExecutionReport

This is the foundation layer for everything that comes next.

## What’s Working Right Now

### 1. FIX Acceptor Online

The acceptor runs from the `make run-acceptor` target and loads the `acceptor.cfg` configuration.

It:

- Starts a FIX 4.4 session (`EXCHANGE -> CLIENT`)  
- Logs **onCreate**, **onLogon**, and **onLogout** events  
- Receives application messages and prints the FIX `MsgType` (e.g. `D` for `NewOrderSingle`)

![OpenTradeInfra M1 – FIX Acceptor running](</public/assets/opentradeinfra/m1/m1-acceptor.png>)

### 2. Initiator Sending Orders and Receiving Execution Reports

On the client side, the initiator runs via:

```bash
make run-initiator ARGS="--orders 2 --interval 1"
```
It:

- Starts the CLIENT -> EXCHANGE session
- Sends synthetic NewOrderSingle messages with randomised instruments, quantities, and prices
- Receives ExecutionReport messages for each order (Accepted / Filled)

This gives us a full round-trip from client → gateway → response, all visible in the logs.

![OpenTradeInfra M1 – FIX Initiator running](</public/assets/opentradeinfra/m1/m1-initiator.png>)

### 3. Raw FIX Messages Logged

QuickFIX logs the raw FIX traffic to file, including headers and all relevant tags:

- 8=FIX.4.4 (BeginString)
- 35=D / 35=8 (NewOrderSingle / ExecutionReport)
- 49= / 56= (SenderCompID / TargetCompID)
- 55= (Symbol)
- 54= (Side)
- 38= (OrderQty)
- 44= (Price)

![OpenTradeInfra M1 – raw FIX message log](</public/assets/opentradeinfra/m1/m1-log.png>)

This is important because later milestones (trade capture, risk, monitoring) will consume and interpret exactly these messages.

### 4. GitHub Repo Structure

Project structure in GitHub.

![OpenTradeInfra M1 – GitHub Repo Structure](</public/assets/opentradeinfra/m1/m1-github-repo.png>)

## How I Built This

M1 is not about writing a “perfect” gateway. It’s about getting something real working:
- I used QuickFIX for the protocol engine
- Python for the application logic around events
- A simple Makefile to hide long commands and keep the workflow repeatable
- And heavily used AI to help with planning, debugging, and structuring the code

This is a learning project, not a claim of expertise. The whole point is to understand the moving parts by building them step by step.

## What’s Next (M2 Preview)

Next milestone (M2 — Trade Capture DB) will:

- Design a PostgreSQL schema for trades and positions
- Parse FIX logs
- Persist trades into a proper database

From there, we’ll have a durable record of executions and can start building a risk engine and monitoring on top.
