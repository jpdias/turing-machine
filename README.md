# tmsim -  Turing Machine

This project is web-based Turing Machine. It is able to interpret a pre-defined language for turing machines, compile and execute it.

## DEALING WITH SYNTACTIC ERRORS

The tool is able to hold syntactic errors, ending and returning the line with the error, and, in general, a description of its type.

## SEMANTIC ANALYSIS

Checking whether there is agreement between the alphabet of the tape and the alphabet of the machine and verifying whether the final states and the initial state belong to the set of machine states.

## OVERVIEW

For the development of the tool the JavaScript web programming language was used, and several additional libraries (bootstrap, vis.js, jquery) were used to facilitate the development. 

At the structure level of the system it is divided between the logic of the Turing machine and the interpreter of the defined language. In the part of the logic of the machine of Turing were developed algorithms capable of executing the same one. On the interpreter side, algorithms have been implemented capable of both lexical and syntactic analyzes and also, although not totally, semantic analysis. 

The entire user interface was based on the BootStrap library and the presentation of transitions graphs was done using the vis.js library.

## TESTSUITE AND TEST INFRASTRUCTURE

The approach used to optimize the tests was to take advantage of several files with different Turing machines (3 examples) and test whenever any functionality was modified or added. 

These tests are available in the GUI to automate their use.

## PROS

Fácil utilização, grande nível de interatividade e apresentação gráfica de informação que de outra forma era dificilmente compreendida, e é baseada em tecnologias web, sendo capaz de ser executada em qualquer browser.
- [Available here.](http://jpdias.github.io/comp)

## CONS

Errors are sometimes quite generic because of the difficulty in covering all kinds of errors that may exist.

## Authors

- [Gil Rocha](https://github.com/jpdias)
- [João Sá](https://github.com/Joao-Sa)
- [João Pedro Dias](https://github.com/GilRocha)
