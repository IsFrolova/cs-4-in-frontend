const instructions = {
    'SET A': 0,
    'PRINT A': 1,
    'IFN A': 2,
    'RET': 3,
    'DEC A': 4,
    'JMP': 5
};

const program = [
    // Ставим значения аккумулятора
    instructions['SET A'],
    // В 10
    10,
    
    // Выводим значение на экран
    instructions['PRINT A'],
    
    // Если A равно 0
    instructions['IFN A'],
    
    // Программа завершается
    instructions['RET'],

    // И возвращает 0
    0,
    
    // Уменьшаем A на 1
    instructions['DEC A'],
    
    // Устанавливаем курсор выполняемой инструкции
    instructions['JMP'],
    
    // В значение 2
    2
];

function execute(program) {
    let registerValue = 0;
    let currentPosition = 0;

    while (currentPosition < program.length) {
        const instr = program[currentPosition];

        switch (instr) {
            case instructions['SET A']:
                registerValue = program[currentPosition + 1]; //Записываем значение в регистр
                currentPosition += 2;
                break;

            case instructions['PRINT A']:
                console.log(registerValue); // Выводим значение регистра
                currentPosition += 1;
                break;

            case instructions['IFN A']:
                // Если регистр не равен нулю — пропускаем следующую инструкцию
                // Если равен нулю — выполняем её
                if (registerValue !== 0) {
                    const nextInstr = program[currentPosition + 1];
                    currentPosition += 2;
                    // Если инструкция имеет аргумент, пропускаем его
                    if (nextInstr === instructions['SET A'] ||
                        nextInstr === instructions['RET'] ||
                        nextInstr === instructions['JMP']) {
                        currentPosition++;
                    }
                } else {
                    currentPosition += 1;
                }
                break;

            case instructions['RET']:
                // Завершение программы с возвратом значения
                return program[currentPosition + 1];

            case instructions['DEC A']:
                registerValue--;
                currentPosition += 1;
                break;

            case instructions['JMP']:
                // Переход на указанную инструкцию
                currentPosition = program[currentPosition + 1];
                break;

            default:
                throw new Error(`Ошибка: ${instr} на позиции ${currentPosition}`);
        }
    }

    return 0; // Если программа завершилась без RET
}

// Выведет в консоль
// 10
// 9
// 8
// 7
// 6
// 5
// 4
// 3
// 2
// 1
// 0
// И вернет 0
execute(program);
