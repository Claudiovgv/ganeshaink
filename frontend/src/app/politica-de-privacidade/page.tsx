import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Política de Privacidade da Ganesha Ink — como tratamos os seus dados pessoais.',
};

export default function PoliticaPrivacidadePage() {
  const updated = '14 de maio de 2026';

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="font-display text-4xl font-bold mb-2">
          Política de <span className="text-gold-gradient">Privacidade</span>
        </h1>
        <p className="text-text-secondary text-sm mb-10">Última atualização: {updated}</p>

        <div className="prose prose-invert max-w-none space-y-8 text-text-secondary leading-relaxed">

          <section>
            <h2 className="font-display text-xl font-semibold text-text-primary mb-3">1. Responsável pelo Tratamento</h2>
            <p>
              Ganesha Ink, com sede em Vale de Cambra, Portugal, é o responsável pelo tratamento dos dados pessoais recolhidos
              através do website <strong className="text-text-primary">ganeshaink.pt</strong> e dos serviços associados.
            </p>
            <p className="mt-2">
              Contacto do responsável:{' '}
              <a href="mailto:ricardo.vieira@ganeshaink.pt" className="text-gold hover:underline">
                ricardo.vieira@ganeshaink.pt
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-text-primary mb-3">2. Dados Recolhidos</h2>
            <p>Recolhemos os seguintes dados pessoais, exclusivamente quando fornecidos pelo próprio utilizador:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Nome completo</li>
              <li>Endereço de correio eletrónico</li>
              <li>Número de telemóvel</li>
              <li>Informações sobre os serviços solicitados (marcações, pedidos de consulta)</li>
              <li>Notas ou observações introduzidas voluntariamente pelo utilizador</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-text-primary mb-3">3. Finalidade do Tratamento</h2>
            <p>Os dados recolhidos são utilizados para:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Gestão e confirmação de marcações e pedidos de consulta</li>
              <li>Comunicação relacionada com os serviços prestados</li>
              <li>Envio de confirmações e lembretes por correio eletrónico ou SMS</li>
              <li>Cumprimento de obrigações legais</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-text-primary mb-3">4. Base Legal</h2>
            <p>
              O tratamento dos dados baseia-se no consentimento do titular (artigo 6.º, n.º 1, alínea a) do RGPD)
              e na execução de um contrato ou diligências pré-contratuais (artigo 6.º, n.º 1, alínea b) do RGPD).
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-text-primary mb-3">5. Conservação dos Dados</h2>
            <p>
              Os dados são conservados pelo período estritamente necessário à prestação dos serviços e ao cumprimento
              das obrigações legais aplicáveis, não excedendo 5 anos após a última interação com o utilizador.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-text-primary mb-3">6. Partilha de Dados</h2>
            <p>
              A Ganesha Ink não vende, cede nem partilha os seus dados pessoais com terceiros para fins comerciais.
              Os dados poderão ser partilhados com prestadores de serviços tecnológicos estritamente necessários ao
              funcionamento da plataforma (ex.: envio de emails), sempre sujeitos a acordos de confidencialidade.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-text-primary mb-3">7. Direitos do Titular</h2>
            <p>Nos termos do RGPD, o utilizador tem direito a:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Aceder aos seus dados pessoais</li>
              <li>Retificar dados incorretos ou incompletos</li>
              <li>Solicitar o apagamento dos seus dados («direito a ser esquecido»)</li>
              <li>Opor-se ao tratamento ou solicitar a sua limitação</li>
              <li>Portabilidade dos dados</li>
              <li>Retirar o consentimento a qualquer momento, sem prejuízo da licitude do tratamento anterior</li>
            </ul>
            <p className="mt-2">
              Para exercer os seus direitos, contacte-nos em{' '}
              <a href="mailto:ricardo.vieira@ganeshaink.pt" className="text-gold hover:underline">
                ricardo.vieira@ganeshaink.pt
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-text-primary mb-3">8. Reclamações</h2>
            <p>
              Caso considere que o tratamento dos seus dados viola o RGPD, tem o direito de apresentar reclamação
              à autoridade de controlo competente — em Portugal, a{' '}
              <a
                href="https://www.cnpd.pt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:underline"
              >
                Comissão Nacional de Proteção de Dados (CNPD)
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-text-primary mb-3">9. Alterações a Esta Política</h2>
            <p>
              Reservamo-nos o direito de atualizar esta política sempre que necessário. A versão mais recente estará
              sempre disponível nesta página, com indicação da data de última atualização.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
