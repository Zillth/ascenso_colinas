## Algoritmo de Ascenso de Colina

Este programa esta hecho en angular y representa un algoritmo de eficiencia llamado ascenso de colina,
este algoritmo tiene como proposito tomar valores mas altos hasta llegar a un máximo local o global.

## Ejecución

Hacer un git clone del directorio o en su defecto descargar el archivo comprimido, ir a una terminal y en la
misma ruta del directorio ejecutar los comandos 'npm i' para instalar los node_modules correspondientes, y
'npm start' para ejecutar angular.

El puerto es el predeterminado para angular '4200'.

## Manual de usuario

La ventana principal es un mapa con celdas donde puedes colocar punto inicial, punto objetivo y obstaculos, en esta
ventana deberás colocar cada punto haciendo click primero en la opción que deseas colocar y después en la cuadricula,
cuando le des a calcular, calculará la heuristica de cada celda y eligira el camino basandose en el valor máximo.

La segunda ventana de función tendras 3 inputs, punto inicial, a y b; el punto inicial es el valor con el que va a partir
la evaluación de la función, deberás de llenar este input con el punto inicial en x, seguido por una coma para posterior seguir
con el valor de y, ej: '-1,2', evitar espacios. Los demás puntos, a y b solo funcionan para la función de Rosenbrock.

Cabe aclarar que este programa utiliza el algoritmo básico de ascenso de colinas, por lo que los valores obtenidos pueden no 
necesariamente ser los máximos globales, en su defecto podrian ser máximos locales.