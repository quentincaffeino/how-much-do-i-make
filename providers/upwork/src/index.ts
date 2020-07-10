
import '@how-much-do-i-make/misc-types'


// export default class UpworkProvider implements Provider {

// 	// What we put here doesn't really matter, it must be atleast one character long
// 	private static readonly PASSWORD: string = 'how-much-do-i-make'

// 	private readonly authorizationCredentials: string


// 	constructor(private apiToken: string) {
// 		this.authorizationCredentials = btoa(this.apiToken + ':' + UpworkProvider.PASSWORD)
// 	}


// 	getData(): Promise<Object> {
// 		return fetch('https://cors-anywhere.herokuapp.com/https://team.abuco.cz/projects/api/v3/time.json?orderMode=desc', {
// 			headers: {
// 				"authorization": "Basic " + this.authorizationCredentials,
// 			}
// 		})
// 			.then(res => res.json())
// 	}

// }

const UpworkProvider = {}
export default UpworkProvider
