
import '@how-much-do-i-make/misc-types'
import dayjs from 'dayjs'


class Data {
	public seconds: number = 0
}

class WeekData extends Data {
}


export default class TeamworkProvider implements Provider {

	// What we put here doesn't really matter, it must be atleast one character long
	private static readonly PASSWORD: string = 'how-much-do-i-make'

	private readonly authorizationCredentials: string


	constructor(private apiToken: string) {
		this.authorizationCredentials = btoa(this.apiToken + ':' + TeamworkProvider.PASSWORD)
	}


	getTime(): Promise<{ date: string, seconds: number }[]> {
		return fetch('https://cors-anywhere.herokuapp.com/https://team.abuco.cz/projects/api/v3/time.json?orderMode=desc', {
			headers: {
				"authorization": "Basic " + this.authorizationCredentials,
			}
		})
			.then(res => res.json())
			.then(timeData => timeData.timelogs.map(timeTransformer))
	}

	getMyTimers(): Promise<{ date: string, seconds: number }[]> {
		return fetch('https://cors-anywhere.herokuapp.com/https://team.abuco.cz/projects/api/v3/me/timers.json', {
			headers: {
				"authorization": "Basic " + this.authorizationCredentials,
			}
		})
			.then(res => res.json())
			.then(myTimerData => myTimerData.timers.map(myTimerTransformer))
	}

	getWeekData(): Promise<WeekData> {
		return new Promise(resolve => {
			const weekData = new WeekData
			const weekStart = dayjs(getMonday(new Date()))

			Promise.all([
				this.getTime(),
				this.getMyTimers()
			])
				.then(timelogs => timelogs.reduce((acc, curr) => [...acc, ...curr], []))
				.then((timelogs: { date: string, seconds: number }[]) => {
					// const weekTimelogs = []

					for (const timelog of timelogs) {
						const timeLogged = dayjs(timelog.date)

						if (timeLogged.isAfter(weekStart)) {
							// weekTimelogs.push(timelog)
							weekData.seconds += timelog.seconds
						}
					}

					resolve(weekData)
				})
		})
	}

}


function timeTransformer(timelog: { timeLogged: string, minutes: number }): { date: string, seconds: number } {
	return { date: timelog.timeLogged, seconds: timelog.minutes * 60 }
}

function myTimerTransformer(timelog: { updatedAt: string, duration: number }): { date: string, seconds: number } {
	return { date: timelog.updatedAt, seconds: timelog.duration }
}


function getMonday(fromDate: Date): Date {
	// length of one day i milliseconds
	var dayLength = 24 * 60 * 60 * 1000;

	// Get the current date (without time)
	var currentDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());

	// Get the current date's millisecond for this week
	var currentWeekDayMillisecond = ((currentDate.getDay()) * dayLength);

	// subtract the current date with the current date's millisecond for this week
	var monday = new Date(currentDate.getTime() - currentWeekDayMillisecond + dayLength);

	if (monday > currentDate) {
		// It is sunday, so we need to go back further
		monday = new Date(monday.getTime() - (dayLength * 7));
	}

	return monday;
}
