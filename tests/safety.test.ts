import assert from "node:assert/strict";
import {approveTrade} from "../src/risk/policy.js";
import {sweepable} from "../src/core/treasury.js";
import {lifeState} from "../src/core/life.js";

assert.equal(lifeState(0,5),"DEAD");
assert.equal(lifeState(4,5),"DEGRADED");
assert.equal(lifeState(10,5),"ALIVE");
assert.equal(sweepable(10,5,2,1),3);
assert.equal(sweepable(7,5,2,1),0);
assert.equal(approveTrade(10,.5,5,.5,0,1).allowed,true);
assert.equal(approveTrade(5,.5,5,.5,0,1).allowed,false);
assert.equal(approveTrade(10,2,5,.5,0,1).allowed,false);
assert.equal(approveTrade(10,.5,5,.5,.8,1).allowed,false);
console.log("All safety tests passed.");
