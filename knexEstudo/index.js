const { innerJoin, where } = require('./database');
var database = require('./database');

// INSERT
// var dados = [
//    {
//       nome: 'The last of us',
//       preco: 100.67,
//    },
//    {
//       nome: 'GTA',
//       preco: 100.67,
//    },
//    {
//       nome: 'Titanfall',
//       preco: 100.67,
//    },
// ]

// database.insert(dados).into('games').then(data => {
//    console.log(data)
// }).catch(err => {
//    console.log(err);
// });

// SELECT
// database.select(['id', 'preco']).table('games').then(data => {
//    console.log(data);
// }).catch(err =>{
//    console.log(err);
// })

// NESTED QUERIES
// database.insert({nome: 'Hulk', preco: 45.89}).into('games').then(data => {
//    console.log(data)

//    database.select(['id', 'preco']).table('games').then(data => {
//       console.log(data);
//    }).catch(err =>{
//       console.log(err);
//    })
// }).catch(err => {
//    console.log(err);
// });

// WHERE
// database.where({ nome: 'GTA' })
//    .where({id: 4})
//    .orWhere({ id: 1 })
//    .table('games').then(data => {
//       console.log(data);
//    }).catch(err => {
//       console.log(err);
//    })

// database
//    .whereRaw("nome='Assassins cred' OR preco > 70")
//    .table('games').then(data => {
//       console.log(data);
//    }).catch(err => {
//       console.log(err);
//    })

// RAW
// database.raw("SELECT * FROM games").then(data => {
//    console.log(data);
// }).catch(err => {
//    console.log(err);
// });

// DELETE
// database.where({ id:3 })
//    .table('games')
//    .delete()
//    .then(data => {
//       console.log(data);
//    }).catch(err => {
//       console.log(err);
//    });

// UPDATE
// database.where({ id: 4 })
//    .update({
//       preco: 68.56,
//    })
//    .table('games')
//    .then(data => {
//       console.log(data);
//    }).catch(err => {
//       console.log(err);
//    });

// ORDER BY
// database
//    .select()
//    .table('games')
//    .orderBy('nome', 'asc')
//    .then(data => {
//       console.log(data);
//    }).catch(err => {
//       console.log(err);
//    });

// ASSOCIATED INSERT
// database.insert({
//       nome: 'Blizzard',
//       game_id: 5,
//    })
//    .table('estudios')
//    .then(data => {
//       console.log(data);
//    }).catch(err => {
//       console.log(err);
//    });

// INNER JOIN 1 para 1
// database.select(['games.*', 'estudios.nome as estudio_nome'])
//    .table('games')
//    .innerJoin('estudios', 'estudios.game_id', 'games.id')
//    .then(data => {
//       console.log(data);
//    }).catch(err => {
//       console.log(err);
//    });

// INNER JOIN 1 para 1 com WHERE
// database.select(['games.*', 'estudios.nome as estudio_nome'])
//    .table('games')
//    .innerJoin('estudios', 'estudios.game_id', 'games.id')
//    .where('games.id', 5)
//    .then(data => {
//       console.log(data);
//    }).catch(err => {
//       console.log(err);
//    });

// INNER JOIN 1 para N
// database.select(['games.*', 'estudios.nome as estudio_nome'])
//    .table('games')
//    .innerJoin('estudios', 'estudios.game_id', 'games.id')
//    .then(data => {

//       var estudiosGamesArray = data;

//       var game = {
//          id: 0,
//          nome: '',
//          estudios: [],
//       }

//       game.id = data[0].id;
//       game.nome = data[0].nome;

//       data.forEach(estudio => {
//          game.estudios.push({ nome: estudio.estudio_nome });
//       });

//       console.log(game);
//    }).catch(err => {
//       console.log(err);
//    });


// INNER JOIN N para N
// database.select([
//       'games_estudios.id as games_estudios_id',
//       'games.id as game_id',
//       'games.nome as game_nome',
//       'games.preco as game_preco',
//       'estudios.id as estudio_id',
//       'estudios.nome as estudio_nome',
//    ])
//    .table('games_estudios')
//    .innerJoin('games', 'games.id', 'games_estudios.game_id')
//    .innerJoin('estudios', 'estudios.id', 'games_estudios.estudio_id')
//    .then(data => {
//       console.log(data);
//    }).catch(err => {
//       console.log(err);
//    }); 

async function testeTransacao() {
   try {
      await database.transaction(async trans => {
         await database.insert({ nome: 'EA Games' }).table('estudios');
         await database.insert({ nome: 'Mojang' }).table('estudios');
         await database.insert({ nome: 'Gearbox' }).table('estudios');
      });
   } catch (error) {
      console.log(error);
   }
}

testeTransacao()