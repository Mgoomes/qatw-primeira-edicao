import { test, expect } from '@playwright/test';
import { obterCodigo2FA } from '../support/db';
import { LoginPage } from '../pages/LoginPage';
import { DashPage} from '../pages/DashPage';
import { cleanJobs, getJob } from '../support/redis';

test('Não deve logar quando o código de autenticação e inválido', async ({ page }) => {
  
  const loginPage = new LoginPage(page);

  const usuario = {
    cpf: '00000014141',
    senha:'147258'
  }
  
  await loginPage.acessaPagina();
  await loginPage.informaCPF(usuario.cpf);
  await loginPage.informaSenha(usuario.senha);
  await loginPage.informa2FA("123456");
  await expect(page.locator('span')).toContainText('Código inválido. Por favor, tente novamente.');

});

test('Deve acessar a conta do usuário', async ({ page }) => {
  
  // Objeto Page é o contexto do Playwright para executarmos ele em tudo
  // Criando uma constante e uma nova instáncia dessa página (LoginPage), seria como  ativar essa classe dentro do objeto loginPage
  // Obtendo todas as caracteriscas dessa classe

  const loginPage = new LoginPage(page);
  const dashPage = new DashPage(page);

  const usuario = {
    cpf: '00000014141',
    senha:'147258'
  }

  await cleanJobs();
  
  await loginPage.acessaPagina();
  await loginPage.informaCPF(usuario.cpf);
  await loginPage.informaSenha(usuario.senha);

  // Checkpoint
  // Com esse código esperamos a transição da próxima informação da tela evitando erros
  await page.getByRole('heading', {name: 'Verificação em duas etapas'})
    .waitFor({timeout: 3000});

  // const codigo = await obterCodigo2FA(usuario.cpf);
  const codigo = await getJob();

  await loginPage.informa2FA(codigo);

  // o Locator serve para identificar css, xpath, class
  await expect(await dashPage.obterSaldo()).toHaveText('R$ 5.000,00');
});