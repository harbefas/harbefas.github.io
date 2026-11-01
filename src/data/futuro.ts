export type Lang = 'pt' | 'en'

interface Card {
  title: string
  body: string
  href?: string
}

interface Copy {
  switchTo: { label: string; href: string }
  eyebrow: string
  title: string
  lede: string[]
  feel: { title: string; cards: Card[]; closing: string }
  where: { title: string; body: string[] }
  exists: { title: string; intro: string; cards: Card[]; closing: string }
  could: { title: string; body: string[] }
  join: { title: string; cards: Card[] }
  name: {
    title: string
    intro: string
    quote: string
    cite: string
    body: string
    links: { label: string; href: string }[]
  }
}

/** Written for people who do not write code. The argument runs from what they
 *  already feel to what already exists, and only names Marx at the end: the
 *  page should be agreed with before it is labelled. Every factual claim here
 *  was checked against the source linked from /learn/#commons. */
export const copy: Record<Lang, Copy> = {
  pt: {
    switchTo: { label: 'English', href: '/future/' },
    eyebrow: 'O futuro',
    title: 'Trabalhamos mais do que nunca. Produzimos mais do que nunca. Pra onde foi a diferença?',
    lede: [
      'Em 1930, o economista John Maynard Keynes fez uma previsão: com o avanço da técnica, os netos da geração dele trabalhariam umas quinze horas por semana.',
      'A técnica cumpriu a parte dela. Uma hora de trabalho hoje produz várias vezes o que produzia em 1930. A semana de quinze horas nunca chegou.',
    ],
    feel: {
      title: 'O que você já sente',
      cards: [
        {
          title: 'Assinatura do que era seu',
          body: 'O programa, a música, o filme: antes você comprava uma vez. Agora paga todo mês, e no dia em que para de pagar, perde tudo.',
        },
        {
          title: 'Celular que morre de propósito',
          body: 'O aparelho ainda funciona, mas para de receber atualização e o app do banco deixa de abrir. Não é desgaste. É modelo de negócio.',
        },
        {
          title: 'Um feed que escolhe por você',
          body: 'O que você lê, vê e ouve é decidido por quem lucra com o seu tempo de tela, não por você.',
        },
        {
          title: 'Salário que não acompanha',
          body: 'Você produz mais a cada ano. O seu salário não cresce na mesma proporção, e a sua jornada não diminui.',
        },
      ],
      closing: 'Não é azar. É projeto.',
    },
    where: {
      title: 'Pra onde vai',
      body: [
        'Cada hora de trabalho gera mais riqueza do que custa pagar quem trabalhou. Essa diferença não volta pra quem trabalhou, nem vira tempo livre pra todo mundo. Ela se acumula com quem é dono: da fábrica, da plataforma, do servidor, da licença.',
        'E não se acumula pra ser usada. Se acumula pra acumular mais. Nenhuma fortuna para de crescer por já ser grande o bastante; a conta é feita assim. Por isso a produtividade sobe e a jornada não cai: o ganho já tem dono antes de chegar até você.',
      ],
    },
    exists: {
      title: 'Isso já existe',
      intro: 'Parece utopia até você perceber que já usa. Estas coisas são feitas em comum, ninguém é dono delas, e funcionam:',
      cards: [
        {
          title: 'Wikipédia',
          body: 'A maior enciclopédia da história. Escrita por voluntários, sem acionistas e sem anúncio.',
          href: 'https://pt.wikipedia.org',
        },
        {
          title: 'Linux',
          body: 'Roda a maior parte dos servidores da internet e todos os 500 supercomputadores mais rápidos do mundo. Escrito por milhares de pessoas, livre pra quem quiser usar.',
          href: 'https://kernel.org',
        },
        {
          title: 'OpenStreetMap',
          body: 'Mapas do mundo inteiro, feitos por quem mora nos lugares. Livres pra qualquer um usar.',
          href: 'https://www.openstreetmap.org',
        },
        {
          title: 'Lichess',
          body: 'Xadrez pra milhões de pessoas, sem anúncio e sem plano pago, mantido por uma organização sem fins lucrativos.',
          href: 'https://lichess.org',
        },
      ],
      closing: 'Nenhum deles é perfeito. Todos provam a mesma coisa: quando o trabalho fica em comum, o resultado é de todo mundo.',
    },
    could: {
      title: 'O que a gente poderia ser',
      body: [
        'Se o ganho de produtividade virasse tempo, e não acúmulo, sobraria vida. Tempo pra estudar o que dá vontade, criar sem precisar vender, cuidar de quem a gente ama, consertar o bairro, aprender um instrumento aos cinquenta anos.',
        'Não é preguiça. É o contrário: é a chance de cada pessoa se desenvolver por inteiro, e não só na parte que dá lucro pra alguém. Como indivíduos e como espécie, ainda não sabemos do que somos capazes, porque quase ninguém teve tempo de descobrir.',
      ],
    },
    join: {
      title: 'Como participar, sem precisar programar',
      cards: [
        {
          title: 'Troque uma ferramenta',
          body: 'Uma só. O navegador, o app de mapa, o lugar onde você ouve música. Cada pessoa que sai deixa a alternativa mais forte.',
          href: '/#projects',
        },
        {
          title: 'Traduza',
          body: 'A maioria dos projetos livres precisa de gente que escreva bem em português. Não exige código.',
          href: 'https://translate.codeberg.org',
        },
        {
          title: 'Teste e conte o que deu errado',
          body: 'Achou um erro? Explicar direito o que aconteceu já é contribuição de verdade.',
          href: '/learn/#method',
        },
        {
          title: 'Ensine alguém',
          body: 'Sua mãe, um colega, a turma da escola. A alternativa só vence quando outras pessoas sabem usar.',
        },
        {
          title: 'Financie em conjunto',
          body: 'Um pouco por mês, de muita gente, sustenta quem mantém o código. Sem empresa no meio.',
          href: '/#fund',
        },
      ],
    },
    name: {
      title: 'O nome disso',
      intro: 'Se você chegou até aqui concordando, não está sozinho, nem é o primeiro. Há mais de 150 anos alguém chegou à mesma conclusão:',
      quote: 'O reino da liberdade só começa, de fato, onde cessa o trabalho determinado pela necessidade e por finalidades externas. […] A redução da jornada de trabalho é a sua condição básica.',
      cite: 'Karl Marx, O Capital, Livro III, cap. 48 (1894). Tradução livre.',
      body: 'Marx não escreveu sobre software, mas descreveu exatamente isto: a riqueza produzida em conjunto, apropriada por poucos, e a liberdade que viria de devolvê-la a quem produz. O software livre é um pedaço pequeno e concreto dessa ideia funcionando hoje.',
      links: [
        { label: 'Ler o capítulo inteiro (em inglês)', href: 'https://www.marxists.org/archive/marx/works/1894-c3/ch48.htm' },
        { label: 'Leituras: trabalho, tempo e o que é comum', href: '/learn/#commons' },
      ],
    },
  },
  en: {
    switchTo: { label: 'Português', href: '/futuro/' },
    eyebrow: 'The future',
    title: 'We work more than ever. We produce more than ever. Where did the difference go?',
    lede: [
      'In 1930 the economist John Maynard Keynes made a prediction: as technique advanced, his generation’s grandchildren would work about fifteen hours a week.',
      'Technique kept its side of the bargain. An hour of work today produces several times what it did in 1930. The fifteen-hour week never came.',
    ],
    feel: {
      title: 'What you already feel',
      cards: [
        {
          title: 'A subscription to what used to be yours',
          body: 'The software, the music, the film: you used to buy it once. Now you pay every month, and the day you stop paying, you lose all of it.',
        },
        {
          title: 'A phone that dies on purpose',
          body: 'It still works, but the updates stop and the banking app stops opening. That is not wear. It is a business model.',
        },
        {
          title: 'A feed that chooses for you',
          body: 'What you read, watch and hear is decided by whoever profits from your screen time, not by you.',
        },
        {
          title: 'A wage that does not keep up',
          body: 'You produce more every year. Your pay does not grow in proportion, and your working week does not shrink.',
        },
      ],
      closing: 'It is not bad luck. It is design.',
    },
    where: {
      title: 'Where it goes',
      body: [
        'Every hour of work creates more wealth than it costs to pay the person who did it. That difference does not go back to them, and it does not become free time for everyone. It piles up with whoever owns things: the factory, the platform, the server, the licence.',
        'And it does not pile up to be used. It piles up to pile up more. No fortune stops growing because it is big enough; that is how the sum is done. So productivity rises and the working week does not fall: the gain already has an owner before it reaches you.',
      ],
    },
    exists: {
      title: 'It already exists',
      intro: 'It sounds like utopia until you notice you already use it. These are made in common, nobody owns them, and they work:',
      cards: [
        {
          title: 'Wikipedia',
          body: 'The largest encyclopedia in history. Written by volunteers, with no shareholders and no ads.',
          href: 'https://en.wikipedia.org',
        },
        {
          title: 'Linux',
          body: 'Runs most of the servers on the internet and every one of the 500 fastest supercomputers in the world. Written by thousands of people, free for anyone to use.',
          href: 'https://kernel.org',
        },
        {
          title: 'OpenStreetMap',
          body: 'Maps of the whole world, made by the people who live in each place. Free for anyone to use.',
          href: 'https://www.openstreetmap.org',
        },
        {
          title: 'Lichess',
          body: 'Chess for millions of people, with no ads and no paid tier, run by a non-profit.',
          href: 'https://lichess.org',
        },
      ],
      closing: 'None of them is perfect. All of them prove the same thing: when the work stays in common, the result belongs to everyone.',
    },
    could: {
      title: 'What we could be',
      body: [
        'If the gain in productivity became time instead of accumulation, there would be life left over. Time to study what you want, to make things without having to sell them, to care for the people you love, to fix up the neighbourhood, to learn an instrument at fifty.',
        'That is not laziness. It is the opposite: the chance for each person to develop as a whole, and not only in the part that turns a profit for someone else. As individuals and as a species we still do not know what we are capable of, because almost nobody has had the time to find out.',
      ],
    },
    join: {
      title: 'How to take part, without writing code',
      cards: [
        {
          title: 'Switch one tool',
          body: 'Just one. The browser, the maps app, the place you listen to music. Every person who leaves makes the alternative stronger.',
          href: '/#projects',
        },
        {
          title: 'Translate',
          body: 'Most free projects need people who write well in a language other than English. No code involved.',
          href: 'https://translate.codeberg.org',
        },
        {
          title: 'Test, and say what broke',
          body: 'Found a bug? Explaining clearly what happened is a real contribution.',
          href: '/learn/#method',
        },
        {
          title: 'Teach someone',
          body: 'Your mother, a colleague, a class. The alternative only wins when other people know how to use it.',
        },
        {
          title: 'Fund it together',
          body: 'A little each month, from many people, keeps the people who maintain the code going. No company in the middle.',
          href: '/#fund',
        },
      ],
    },
    name: {
      title: 'The name for this',
      intro: 'If you got this far agreeing, you are not alone, and you are not the first. More than 150 years ago someone reached the same conclusion:',
      quote: 'The realm of freedom actually begins only where labour which is determined by necessity and mundane considerations ceases. […] The shortening of the working-day is its basic prerequisite.',
      cite: 'Karl Marx, Capital, Volume III, Chapter 48 (1894).',
      body: 'Marx did not write about software, but he described exactly this: wealth made together, taken by a few, and the freedom that would come from giving it back to the people who make it. Free software is one small, concrete piece of that idea working today.',
      links: [
        { label: 'Read the whole chapter', href: 'https://www.marxists.org/archive/marx/works/1894-c3/ch48.htm' },
        { label: 'Reading: work, time and the commons', href: '/learn/#commons' },
      ],
    },
  },
}
