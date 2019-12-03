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
Route.post('/occurrence', 'OccurrenceController.create').validator('CreateOccurrence').middleware('userAuth')

/* GET /occurrence/near - Lista ocorrências da região

Exemplo chamada: GET /occurrence/near?latitude=-48.0389848&longitude=-52.3754754

Respostas:

Coordenadas inválidas: { success: false, message: "invalid coordinates", data: null }
Sucesso: { success: true, message: "occurrences found", data: occurrences }
*/
Route.get('/occurrence/near', 'OccurrenceController.near').middleware('userAuth')

/* GET /occurrence/:id - Detalhes de uma ocorrência

Exemplo chamada: GET /occurrence/1

Respostas:

Ocorrência não encontrada: { success: false, message: "occurrence not found", data: null }
Sucesso: { success: true, message: "occurrence found", data: occurrence }
*/
Route.get('/occurrence/:id', 'OccurrenceController.details').middleware('userAuth')


/* GET /form - Lista os formulários ativos

Exemplo chamada: GET /form

Resposta:
Sucesso: { success: true, message: "forms found", data: forms }
*/
Route.get('/form', 'FormController.actived').middleware('userAuth')





/* GET /occurrence-admin/:id - Detalhes de uma ocorrência para o administrador

Exemplo chamada: GET /occurrence-admin/1

Respostas:

Ocorrência não encontrada: { success: false, message: "occurrence not found", data: null }
Sucesso: { success: true, message: "occurrence found", data: occurrence }
*/
Route.get('/occurrence-admin/:id', 'OccurrenceAdminController.details').middleware('adminAuth')

/* PUT /occurrence-admin/:id/status - Atualiza status ocorrência

Exemplo chamada: PUT /occurrence-admin/1/status

{
    status: "approved"
}

Respostas:

{ success: true, message: 'status updated', data }
*/
/*Route.put('/occurrence-admin/:id/status', 'OccurrenceAdminController.updateStatus')*/
Route.put('/occurrence-admin/:id/status', 'OccurrenceAdminController.updateStatus').middleware('adminAuth')

/* GET /occurrence-admin - Retorna ocorrências (com ou sem filtro) 

Exemplo chamada: GET /occurrence-admin
Exemplo chamada: GET /occurrence/admin?status=approved

Respostas:

Sem filtro: { success: true, message: 'all occurrences', data }
Com filtro: { success: true, message: 'occurrences by status', data }
*/
/*Route.get('/occurrence-admin', 'OccurrenceAdminController.index')*/
Route.get('/occurrence-admin', 'OccurrenceAdminController.index').middleware('adminAuth')

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


/* POST /user/signup - Cadastro usuário

Obs.: Sempre chamar essa rota ao clicar no botão de login (por enquanto só Facebook).
Se o usuário já existir, o mesmo será retornado.

Exemplo chamada:

{
	"token": "token retornado pelo firebase"
}

Respostas:

Sucesso: { success: true, message: "user returned", data: user }
Token inválido (401): { success: false, message: "error decoding token", data: null }
 */
Route.post('/user/signup', 'UserController.signup')


Route.get('/occurrence-category', 'OccurrenceCategoryController.index')



/* POST /form - Cadastra um novo formulário

Exemplo chamada:

{
	"title": "Descrição do formulário"
	"url": "URL do formulário"
}

Resposta:

Sucesso: { success: true, message: "form created", data: form }
*/
Route.post('/form', 'FormController.create').middleware('adminAuth')

/* PUT /form - Atualiza as informações de um formulário

Exemplo chamada:

{
	"id": id
	"title": "Nova descrição do formulário"
	"url": "novo URL do formulário"
	"active": [true/false]
}

Respostas:

Sucesso: { success: true, message: "form updated", data: form }
Caso o form não exista: { success: false, message: "form not updated", data: null }

*/
Route.put('/form', 'FormController.update').middleware('adminAuth')

/* GET /form/all - Todos os formulários

Exemplo chamada: GET /form/all

Resposta:
Sucesso: { success: true, message: "forms found", data: [form] }

*/
Route.get('/form/all', 'FormController.list').middleware('adminAuth')

/* GET /form/:id - Retorna todos os formulários

Exemplo chamada: GET /form/2

Resposta:
Sucesso: { success: true, message: "forms found", data: form }
Erro: { success: false, message: "form not found", data: null }

*/
Route.get('/form/:id', 'FormController.retrieve').middleware('adminAuth')

/* DELETE /form/:id - Remove um formulário

Exemplo chamada: DELETE /form/2

Resposta:
Sucesso: { success: true, message: "form removed", data: form }
Erro: { success: false, message: "form not removed", data: null }


*/
Route.delete('/form/:id', 'FormController.delete').middleware('adminAuth')

