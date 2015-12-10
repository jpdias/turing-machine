##PROJECT TITLE: tmsim -  Turing Machine

####GROUP: T04G02

NAME1: Gil Filipe da Rocha, NR1: 201100629, GRADE1: 18, CONTRIBUTION: 1/3

NAME2: João Carlos Teixeira de Sá, NR2: 201107925, GRADE2: 18, CONTRIBUTION: 1/3

NAME3: João Pedro Matos Teixeira Dias, NR3: 201106781, GRADE3: 18, CONTRIBUTION: 1/3

### SUMMARY

A ferramenta desenvolvida é capaz de interpretar uma linguagem pré-definida para máquinas de turing, compilar e executar a mesma.

### DEALING WITH SYNTACTIC ERRORS
A ferramenta é capaz de deter erros sintáticos, terminando e devolvendo a linha com o erro, e, de forma geral, uma descrição do seu tipo.

### SEMANTIC ANALYSIS

Verificação se existe concordância entre o alfabeto da fita e do alfabeto da máquina e verificação se os estados finais e o estado inicial pertencem ao conjuto de estados da máquina.

### OVERVIEW

Para o desenvolvimento da ferramenta foi utilizada a linguagem de programação
web JavaScript, sendo que, auxiliarmente foram utilizadas várias bibliotecas adicionais
(bootstrap, vis.js, jquery) que facilitaram o desenvolvimento. A nível da estruturação o 
sistema encontra-se dividido entre lógica da máquina de Turing e o interpretador da linguagem
defenida. Na parte da lógica da máquina de Turing foram foram desenvolvidos algoritmos capazes
de executar a mesma. Do lado do interpretador foram implementados algoritmos capazes de fazer
tanto análises lexical e sintática e também, apesar de não totalmente, análise semântica. 
Toda a interface de utilização foi baseada na biblioteca BootStrap e a apresentação de grafos 
de transições foi feita utilizando a biblioteca vis.js .

### TESTSUITE AND TEST INFRASTRUCTURE

 A aproximação utilizada para otimização dos testes foi
tirar partido de vários ficheiros com diferentes máquinas de Turing (3 exemplos) e testando sempre
que era modificada ou acrescentada alguma funcionalidade. Estes testes foram colocados na interface
gráfica para automatizar a sua utilização.

### PROS
 Fácil utilização, grande nível de interatividade e apresentação gráfica de informação que de outra forma era
dificilmente compreendida, e é baseada em tecnologias web, sendo capaz de ser executada em qualquer browser.
(http://jpdias.github.io/comp)

### CONS

 Os erros por vezes são bastante genéricos devido a dificuldade para fazer cobertura de todos os tipos de erros
que possam existir. 
