import { fastifyCors } from "@fastify/cors";
import { fastify } from "fastify";
import {
	type ZodTypeProvider,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { env } from "./env.ts";
import { createRoomsRoute } from "./http/routes/create-rooms.ts";
import { getRoomQuestionsRoute } from "./http/routes/get-room-questions.ts";
import { getRoomsRoute } from "./http/routes/get-rooms.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, { origin: "http://localhost:5173" });

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(getRoomsRoute);
app.register(createRoomsRoute);
app.register(getRoomQuestionsRoute);

app.listen({ port: env.PORT }).then(() => {
	console.log(`🖥️  Server is running on port ${env.PORT} !!!`);
});
