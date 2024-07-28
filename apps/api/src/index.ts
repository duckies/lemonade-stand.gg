import { http } from "@repo/common";

const request = await http("https://jsonplaceholder.typicode.com/todos/1").arrayBuffer();

console.log(request);
// import { WarcraftLogs } from "@repo/warcraftlogs";

// const api = new WarcraftLogs({
//   clientId: process.env.WARCRAFTLOGS_CLIENT_ID as string,
//   clientSecret: process.env.WARCRAFTLOGS_SECRET_KEY as string,
// });

// const response = await api.query(`{
//   reportData {
// 		reports(guildName: "TBD", guildServerSlug: "illidan", guildServerRegion: "us") {
// 			data {
// 				code,
// 				title,
// 				zone {
// 					id,
// 					name
// 				}
// 			}
// 		}
// 	}
// }`);

// api.log(await response.json());
