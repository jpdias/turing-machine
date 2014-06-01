**PROJECT TITLE: tmsim -  Turing Machine

**GROUP: T04G02

NAME1: Gil Filipe da Rocha, NR1: 201100629, GRADE1: 18, CONTRIBUTION: 30%

NAME2: João Carlos Teixeira de Sá, NR2: 201107925, GRADE2: 18, CONTRIBUTION: 30%

NAME3: João Pedro Matos Teixeira Dias, NR3: 201106781, GRADE3: 18, CONTRIBUTION: 30%

** SUMMARY: A ferramenta desenvolvida é capaz de interpretar uma linguagem 
pré-definida para máquinas de turing, compilar e executar a mesma.

**DEALING WITH SYNTACTIC ERRORS: A ferramenta é capaz de deter erros sintáticos, terminando e
 devolvendo a linha com o erro, e, de forma geral, uma descrição do seu tipo.

**SEMANTIC ANALYSIS: (Refer the possible semantic rules implemented by your tool.)

**OVERVIEW: Para o desenvolvimento da ferramenta foi utilizada a linguagem de programação
web JavaScript, sendo que, auxiliarmente foram utilizadas várias bibliotecas adicionais
(bootstrap, vis.js, jquery) que facilitaram o desenvolvimento. A nível da estruturação o 
sistema encontra-se dividido entre lógica da máquina de Turing e o interpretador da linguagem
defenida. Na parte da lógica da máquina de Turing foram foram desenvolvidos algoritmos capazes
de executar a mesma. Do lado do interpretador foram implementados algoritmos capazes de fazer
tanto análises lexical e sintática e também, apesar de não totalmente, análise semântica. 
Toda a interface de utilização foi baseada na biblioteca BootStrap e a apresentação de grafos 
de transições foi feita utilizando a biblioteca vis.js .

**TESTSUITE AND TEST INFRASTRUCTURE: A aproximação utilizada para otimização dos testes foi
tirar partido de vários ficheiros com diferentes máquinas de Turing (3 exemplos) e testando sempre
que era modificada ou acrescentada alguma funcionalidade. Estes testes foram colocados na interface
gráfica para automatizar a sua utilização.

**TASK DISTRIBUTION: Inicialmente a interface gráfica e a automatização de testes ficou atribuida a João Dias, 
a lógica da máquina de Turing a Gil Rocha e a análise léxical e sintática a João Sá. Após esta divisão de 
tarefas ao nível que iam surgindo novas ou bugs para correção este foram divididos por todos, para todos os
membros terem de igual forma conhecimento da parte desenvolvida um pelos outros. Acrescentando, numa fase 
posteiror João Dias ficou responsável pela apresentação gráfica da execução da máquina de Turing, João Sá pela
apresentação gráfica do grafo de transições e Gil Rocha pela estruturação de uma linguagem de programação, esta
mais estável e com semelhanças para outras linguagem de programação, para a máquina e ajustamento do interpretador
da mesma a esta nova linguagem.

**PROS: Fácil utilização, grande nível de interatividade e apresentação gráfica de informação que de outra forma era
dificilmente compreendida, e é baseada em tecnologias web, sendo capaz de ser executada em qualquer browser.

**CONS: Os erros por vezes são bastante genéricos devido a dificuldade para fazer cobertura de todos os tipos de erros
que possam existir. 
