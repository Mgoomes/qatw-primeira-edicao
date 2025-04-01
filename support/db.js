import pgPromise from "pg-promise"; //função pra conectar no banco

const pgp = pgPromise();
const db = pgp('postgresql://dba:dba@paybank-db:5432/UserDB'); // String de conexão, usuário, senha, nome do container

//Colocando o export na frente da função podemos usar ela em outros códigos
export async function obterCodigo2FA() {
    const query = `
        SELECT t.code
	    FROM public."TwoFactorCode" t
		JOIN public."User" u ON u."id" = t."userId"
		WHERE u."cpf" = '00000014141'
	    ORDER BY t.id DESC
	    LIMIT 1;
    `
    const result = await db.oneOrNone(query); //Essa função executa a query e retorna um registro ou então nulo
    return result.code
};