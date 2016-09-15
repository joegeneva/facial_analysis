# face_emotions
Joseph Geneva

Detect emotions through facial recognition, work in progess.

This project explores a method of detecting basic emotions based on facial expressions. This was done using a client server architecture, where a client, such as a laptop, talks to a server in the cloud. A webcam captures the image, and the computer sends the data to the server, which sends back the emotion it identified. This achieved some limited success, able to react to data but unable to reliably classify emotions. It does provide a foundation for improving the results in the future.

![Interface](img/testingemot.png?raw=true "Active")
![Interface](img/activeemot.png?raw=true "Active")

This project is based on node.js and generated with express. It makes use of the following:

https://github.com/auduno/clmtrackr
https://github.com/cazala/synaptic/
https://github.com/expressjs/express
https://github.com/harthur/brain
https://github.com/nodejs/node

To run project, clone or download and initialize npm. Start the project with 'npm start' from the command line. Open the default page at localhost:3000 that it tells you in a web browser and you can start workiing with it.

There is some detail currently logged in the UI, but most of it is in the client console. Open this with ctrl + shift + i.
The Network training data can only be seen in the server side console currently.

index.js contains basic functions, nnetwork.js has routes that run the network, and main.js in the public js files contains the jquery code to communicate with the server.
Webcam.js in the public files works with the data captured from the webcam.

The project is able to store data server side, so after intially collecting it, the neural network can be trained and tested with the stored data. This can be done in run.js, using node run.js from the command line.

This could allow someome with a good background in machine learning to quickly find an algorithm that works well.
This project may be implemented in python in the future to handle the network code.