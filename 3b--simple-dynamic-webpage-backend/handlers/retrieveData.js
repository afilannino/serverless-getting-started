'use strict';

let myData = [
	{
		players: ["player1","player2","player3","player4"],
		timestamp: "2018/10/20-13:40"
	},{
		players: ["Angelo","Daniel","Andrea","Mimmo"],
		timestamp: "2018/10/20-14:00"
	},{
		players: ["Marco","Mirco","Merco","Morca"],
		timestamp: "2018/10/20-14:30"
	},{
		players: ["Legacy","Code","Will","Die"],
		timestamp: "2018/10/20-15:00"
	},{
		players: ["Sergio","Gabriel","Wanda","Sara"],
		timestamp: "2018/10/20-16:00"
	},{
		players: ["Massimo","Michele","Stefano","Matteo"],
		timestamp: "2018/10/20-17:00"
	}  
]

module.exports.getData = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(myData),
  };
}
