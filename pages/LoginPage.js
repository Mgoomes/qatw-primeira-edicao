//Export pra deixar a classe exportável
export class LoginPage {

    //Função executada automáticamente quando ativada a classe dentro de um novo objeto
    constructor(page) {
        this.page = page
    }

    async acessaPagina() {
        await this.page.goto('http://paybank-mf-auth:3000/');
    }

    async informaCPF(cpf) {
        await this.page.getByRole('textbox', { name: 'Digite seu CPF' }).fill(cpf);
        await this.page.getByRole('button', { name: 'Continuar' }).click();
    }

    async informaSenha(senha) {
        for (const digito of senha) {
            await this.page.getByRole('button', { name: digito }).click();
          }
            await this.page.getByRole('button', { name: 'Continuar' }).click();
    }

    async informa2FA(codigo) {
        await this.page.getByRole('textbox', { name: '000000' }).fill(codigo);
        await this.page.getByRole('button', { name: 'Verificar' }).click();
    }

};