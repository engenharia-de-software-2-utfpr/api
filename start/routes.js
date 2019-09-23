'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


/* POST /occurrence - Criar ocorrência 

Exemplo chamada:

{
	"coordinates": {
		"latitude": "-48.0389848",
		"longitude": "-52.3754754"
	},
	"category_id": "fire",
	"resources": {
        "photos": ["https://www.photo1.com"],
        "video": "https://www.video.com",
        "audio": "https://www.audio.com"
	},
	"description": "lorem ipsum",
	"criticity_level": 3
}

Respostas:

Coordenadas inválidas: { success: false, message: "invalid coordinates", data: null }
Sucesso: { success: true, message: "occurrence created", data: occurrence }
*/
Route.post('/occurrence', 'OccurrenceController.create').validator('CreateOccurrence')

/* GET /occurrence/near - Lista ocorrências da região

Exemplo chamada: GET /occurrence/near?latitude=-48.0389848&longitude=-52.3754754

Respostas:

Coordenadas inválidas: { success: false, message: "invalid coordinates", data: null }
Sucesso: { success: true, message: "occurrences found", data: occurrences }
*/
Route.get('/occurrence/near', 'OccurrenceController.near')

/* GET /occurrence/:id - Detalhes de uma ocorrência

Exemplo chamada: GET /occurrence/1

Respostas:

Ocorrência não encontrada: { success: false, message: "occurrence not found", data: null }
Sucesso: { success: true, message: "occurrence found", data: occurrence }
*/
Route.get('/occurrence/:id', 'OccurrenceController.details')

/* PUT /occurrence-admin/:id/status - Atualiza status ocorrência

Exemplo chamada: PUT /occurrence-admin/1/status

{
    status: "approved"
}

Respostas:

{ success: true, message: 'status updated', data }
*/
Route.put('/occurrence-admin/:id/status', 'OccurrenceAdminController.updateStatus')

/* GET /occurrence-admin - Retorna ocorrências (com ou sem filtro) 

Exemplo chamada: GET /occurrence-admin
Exemplo chamada: GET /occurrence/admin?status=approved

Respostas:

Sem filtro: { success: true, message: 'all occurrences', data }
Com filtro: { success: true, message: 'occurrences by status', data }
*/
Route.get('/occurrence-admin', 'OccurrenceAdminController.index')


/* POST /admin/signin - Login administrador

Exemplo chamada:

{
	"email": "admin@admin.com",
	"password": "122345678"
}

Respostas:

Sucesso: { success: true, message: 'authenticated', data: token }
Senha errada: {
  "success": false,
  "message": "PasswordMisMatchException: E_PASSWORD_MISMATCH: Cannot verify user password",
  "data": null
}
Email não cadastrado: {
  "success": false,
  "message": "UserNotFoundException: E_USER_NOT_FOUND: Cannot find user with email as admi2n@admin.com",
  "data": null
}
*/
Route.post('/admin/signin', 'AdminController.signin')
