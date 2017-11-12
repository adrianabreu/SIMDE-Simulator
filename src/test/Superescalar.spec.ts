import { test } from 'ava';
import { Superescalar } from '../core/Superescalar/Superescalar';
import { SuperescalarStatus } from '../core/Superescalar/SuperescalarEnums';

import { Code } from '../core/Common/Code';

let superescalar = new Superescalar();
let code;

test.beforeEach('Setup machine', () => {
	superescalar = new Superescalar();
	superescalar.init(true);
	code = new Code();
});


test('Code 10 is executed properly', t => {
	const input = `7
ADDI R2 R0 #3
BGT R0 R2 ET1
ADDI R3 R0 #2
ET1:
SUB R4 R3 R2
BGT R2 R3 ET2
SUB R5 R2 R3
ET2:
SUB R6 R2 R3
    `;
	code.load(input);
	superescalar.code = code;
	while (superescalar.tic() !== SuperescalarStatus.SUPER_ENDEXE) { }
	t.deepEqual(superescalar.status.cycle, 14);
});
