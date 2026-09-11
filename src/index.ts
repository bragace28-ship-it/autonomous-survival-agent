import {lifeState} from "./core/life.js";
import {sweepable} from "./core/treasury.js";
import {rank} from "./revenue/registry.js";

const balance=Number(process.env.SIM_BALANCE_USDC??"10");
const reserve=Number(process.env.RESERVA_OPERACIONAL_USDC??"5");
const cloneReserve=Number(process.env.COTA_CLONAGEM_USDC??"2");
const minSweep=Number(process.env.SWEEP_MIN_USDC??"1");
const opportunities=rank([
 {id:"micro-saas-001",type:"micro_saas",expectedRevenueUsd:8,costUsd:.15,risk:2,speed:8},
 {id:"api-001",type:"api",expectedRevenueUsd:3,costUsd:.05,risk:1,speed:9},
 {id:"dex-001",type:"dex",expectedRevenueUsd:.20,costUsd:.08,risk:8,speed:6},
 {id:"prediction-001",type:"prediction",expectedRevenueUsd:.30,costUsd:.10,risk:9,speed:5}
]);
console.log("STATE:",lifeState(balance,reserve));
console.log("BALANCE:",balance,"USDC");
console.log("TOP OPPORTUNITIES:",opportunities);
console.log("SWEEPABLE:",sweepable(balance,reserve,cloneReserve,minSweep),"USDC");
console.log("DRY_RUN:",process.env.DRY_RUN??"true");
console.log("No real-money transaction is executed by this simulation.");
