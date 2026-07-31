import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: 'Política de Cookies da Ganesha Ink — como utilizamos cookies no nosso website.',
};

export default function PoliticaCookiesPage() {
  const updated = '14 de maio de 2026';

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="font-display text-4xl font-bold mb-2">
          Política de <span className="text-gold-gradient">Cookies</span>
        </h1>
        <p className="text-text-secondary text-sm mb-10">Última atualização: {updated}</p>

        <div className="prose prose-invert max-w-none space-y-8 text-text-secondary leading-relaxed">

          <section>
            <h2 className="font-display text-xl font-semibold text-text-primary mb-3">1. O que são Cookies?</h2>
            <p>
              Cookies são pequenos ficheiros de texto que um website coloca no seu dispositivo (computador, telemóvel
              ou tablet) quando o visita. Permitem que o website reconheça o seu dispositivo em visitas futuras e
              melhore a sua experiência de navegação.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-text-primary mb-3">2. Cookies que Utilizamos</h2>

            <div className="space-y-4">
              <div className="bg-bg-card border border-gold-border/30 rounded-lg p-4">
                <h3 className="font-semibold text-text-primary mb-1">Cookies Estritamente Necessários</h3>
                <p className="text-sm">
                  Essenciais para o funcionamento do website. Sem estes cookies, funcionalidades como o sistema
                  de marcações não funcionariam corretamente. Não podem ser desativados.
                </p>
                <p className="text-xs text-text-muted mt-2">Exemplos: sessão de navegação, preferências de idioma.</p>
              </div>

              <div className="bg-bg-card border border-gold-border/30 rounded-lg p-4">
                <h3 className="font-semibold text-text-primary mb-1">Cookies de Desempenho</h3>
                <p className="text-sm">
                  Recolhem informações anónimas sobre a forma como os visitantes utilizam o website, com o objetivo
                  de melhorar o seu funcionamento. Todos os dados são anónimos e agregados.
                </p>
              </div>

              <div className="bg-bg-card border border-gold-border/30 rounded-lg p-4">
                <h3 className="font-semibold text-text-primary mb-1">Cookies de Funcionalidade</h3>
                <p className="text-sm">
                  Permitem que o website memorize as suas preferências (por exemplo, idioma ou região) e ofereça
                  uma experiência mais personalizada.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-text-primary mb-3">3. Cookies de Terceiros</h2>
            <p>
              O nosso website poderá utilizar serviços de terceiros que instalam os seus próprios cookies, tais como:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Google Analytics — análise de tráfego (dados anónimos)</li>
              <li>Redes sociais — botões de partilha do Instagram e outras plataformas</li>
            </ul>
            <p className="mt-2">
              Não temos controlo sobre os cookies instalados por terceiros. Recomendamos que consulte as respetivas
              políticas de privacidade.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-text-primary mb-3">4. Como Gerir os Cookies</h2>
            <p>
              Pode configurar o seu browser para recusar todos ou alguns cookies, ou para ser alertado quando um
              website tenta colocar um cookie no seu dispositivo. Se desativar ou recusar cookies, algumas partes
              do website poderão ficar inacessíveis ou não funcionar corretamente.
            </p>
            <p className="mt-2">Instruções para os principais browsers:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
                  Google Chrome
                </a>
              </li>
              <li>
                <a href="https://support.mozilla.org/pt-PT/kb/ativar-desativar-cookies" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a href="https://support.apple.com/pt-pt/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
                  Safari
                </a>
              </li>
              <li>
                <a href="https://support.microsoft.com/pt-pt/microsoft-edge/eliminar-cookies-no-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
                  Microsoft Edge
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-text-primary mb-3">5. Alterações a Esta Política</h2>
            <p>
              Reservamo-nos o direito de atualizar esta política sempre que necessário. A versão mais recente
              estará sempre disponível nesta página, com indicação da data de última atualização.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-text-primary mb-3">6. Contacto</h2>
            <p>
              Para qualquer questão relacionada com a nossa utilização de cookies, contacte-nos em{' '}
              <a href="mailto:ricardo.vieira@ganeshaink.pt" className="text-gold hover:underline">
                ricardo.vieira@ganeshaink.pt
              </a>.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
