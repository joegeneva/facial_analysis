# face_emotions
Joseph Geneva

Detect emotions through facial recognition, work in progess

This project explores a method of detecting basic emotions based on facial expressions. This was done using a client server architecture, where a client, such as a laptop, talks to a server in the cloud. A webcam captures the image, and the computer sends the data to the server, which sends back the emotion it identified. This achieved some limited success, able to react to data but unable to reliably classify emotions. It does provide a foundation for improving the results in the future.

This project is based on node.js and generated with express. It makes use of the following:

https://github.com/auduno/clmtrackr
https://github.com/cazala/synaptic/
https://github.com/expressjs/express
https://github.com/harthur/brain
https://github.com/nodejs/node

To run project, clone or download and initialize npm. Start the project with 'DEBUG=myapp:* npm start' from the command line. Open the default page at localhost that it tells you in a web browser and you can start workiing with it.

The project is able to store data server side now, so after intially collecting it, the neural network can be trained and tested with the stored data. This is done in run.js.

This could allow someome with a good background in machine learning to quickly find an algorithm that works well.

The main javascript file for the client side may need to be manually edited to use the correct route. The index route may need to be edited for the filepath.
