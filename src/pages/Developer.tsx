import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  GitHubLogoIcon,
  HeartFilledIcon,
} from "@radix-ui/react-icons";

const Developer = () => {
  return (
    <Layout title="Sobre o Desenvolvedor">
      <Card>
        <CardContent className="space-y-6 pt-5 ">
          <div className="space-y-2">
            <p>
              Olá! 👋 Meu nome é <strong>Lameck Fernandes</strong>, engenheiro de software
              especializado em soluções tecnológicas para <strong>smart buildings</strong> e automação.
              Trabalho como desenvolvedor <strong>Full Stack</strong>, utilizando <strong>React</strong>, <strong>TypeScript</strong>, <strong>Laravel</strong> e <strong>Python</strong>, sempre focado em entregar sistemas robustos e escaláveis.
            </p>
            <p>
              Este app foi criado para ajudar pessoas a monitorar sua alimentação diária de forma simples e eficiente.
              Além disso, também atuo criando conteúdos e livros sobre tecnologia e programação para compartilhar conhecimento com a comunidade. 🚀
            </p>
            <p>
            Se este app está sendo útil para você, peço humildemente que me ofereça um café ☕. 
            Sua contribuição me ajudará a continuar criando e compartilhando conteúdo de qualidade na internet, agregando valor à vida de mais pessoas. 
            Muito obrigado pelo apoio!
            </p>
          </div>          

          <div>
            <h3 className="font-semibold text-lg mb-2">🔗 Links</h3>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="w-full flex items-center gap-2"
                asChild
              >
                <a
                  href="https://github.com/EuFreela"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubLogoIcon className="h-4 w-4" />
                  GitHub
                </a>
              </Button>

              <Button
                variant="outline"
                className="w-full flex items-center gap-2"
                asChild
              >
                <a
                  href="https://www.paypal.com/donate/?hosted_button_id=TU5PDUQBT7E8Y"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <HeartFilledIcon className="h-4 w-4 text-pink-500" />
                  Apoie 💖
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Developer;
