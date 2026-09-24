export interface Reading {
  title: string
  author: string
  url: string
  /** Why this one, in the words of someone who read it. Never a blurb. */
  note?: string
  kind?: 'paper' | 'lecture notes' | 'spec'
  pages?: string
}

export interface Shelf {
  id: string
  title: string
  blurb: string
  items: Reading[]
}

/** Every entry is legally free to read at the URL given, and every URL was
 *  checked before publishing. Books that are only free as a sample, or free
 *  on a site that does not hold the rights, are not here. */
export const shelves: Shelf[] = [
  {
    id: 'core',
    title: 'The core',
    blurb: 'Four short pieces that change how you look at everything after them. A weekend, together.',
    items: [
      {
        title: 'Out of the Tar Pit',
        author: 'Moseley & Marks',
        url: 'https://curtclifton.net/papers/MoseleyMarks06a.pdf',
        note: 'Essential complexity against the accidental kind. The distinction most architecture arguments are missing.',
        kind: 'paper',
        pages: '66 pp',
      },
      {
        title: 'Programming as Theory Building',
        author: 'Peter Naur',
        url: 'https://pages.cs.wisc.edu/~remzi/Naur.pdf',
        note: 'The code is the residue. The theory lives in the heads of the people who wrote it, and dies when they leave.',
        kind: 'paper',
        pages: '10 pp',
      },
      {
        title: 'No Silver Bullet',
        author: 'Fred Brooks',
        url: 'https://worrydream.com/refs/Brooks_1986_-_No_Silver_Bullet.pdf',
        note: 'Why no tool has ever delivered an order-of-magnitude gain, and why the next one will not either.',
        kind: 'paper',
      },
      {
        title: 'The Cathedral and the Bazaar',
        author: 'Eric Raymond',
        url: 'http://www.catb.org/~esr/writings/cathedral-bazaar/',
        note: 'The argument for open development, written while it was still an argument.',
      },
    ],
  },
  {
    id: 'unix',
    title: 'Unix, and open source as a practice',
    blurb: 'Where the shape of these tools came from, and what maintaining them actually involves.',
    items: [
      {
        title: 'The Art of Unix Programming',
        author: 'Eric Raymond',
        url: 'http://www.catb.org/~esr/writings/taoup/html/',
        note: 'Unix philosophy written down as design doctrine rather than nostalgia.',
      },
      {
        title: 'Producing Open Source Software',
        author: 'Karl Fogel',
        url: 'https://producingoss.com/',
        note: 'How a project is actually run: review, conflict, governance, releases. Read it before your first pull request, not after.',
      },
      {
        title: 'Free as in Freedom',
        author: 'Sam Williams',
        url: 'https://static.fsf.org/nosvn/faif-2.0.pdf',
        note: 'Stallman, and where the licence you are about to choose came from.',
      },
    ],
  },
  {
    id: 'systems',
    title: 'Systems — the floor',
    blurb: 'The layers under whatever you are writing. These are the ones worth years, not evenings.',
    items: [
      {
        title: 'Structure and Interpretation of Computer Programs',
        author: 'Abelson & Sussman',
        url: 'https://mitp-content-server.mit.edu/books/content/sectbyfn/books_pres_0/6515/sicp.zip/index.html',
        note: 'Abstraction as the single subject of the field.',
      },
      {
        title: 'Operating Systems: Three Easy Pieces',
        author: 'Arpaci-Dusseau',
        url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/',
        note: 'Virtualisation, concurrency, persistence. The best operating systems book there is, and it is free.',
      },
      {
        title: 'Crafting Interpreters',
        author: 'Robert Nystrom',
        url: 'https://craftinginterpreters.com/',
        note: 'Two complete interpreters, built in front of you. The most fun on this page.',
      },
      {
        title: 'What Every Programmer Should Know About Memory',
        author: 'Ulrich Drepper',
        url: 'https://people.freebsd.org/~lstewart/articles/cpumemory.pdf',
        note: 'Cache and NUMA, from the person who maintained glibc. Explains performance mysteries you have already met.',
        kind: 'paper',
        pages: '114 pp',
      },
      {
        title: 'Hypermedia Systems',
        author: 'Gross, Stepinski & Akşimşek',
        url: 'https://hypermedia.systems/',
        note: 'Why the original REST is not a JSON API. Reframes the web you thought you knew.',
      },
    ],
  },
  {
    id: 'distributed',
    title: 'Distributed systems',
    blurb: 'The founding papers are short, free, and more readable than the textbooks written about them.',
    items: [
      {
        title: 'Time, Clocks, and the Ordering of Events',
        author: 'Leslie Lamport',
        url: 'https://lamport.azurewebsites.net/pubs/time-clocks.pdf',
        note: 'The founding paper. Start here.',
        kind: 'paper',
      },
      {
        title: 'Paxos Made Simple',
        author: 'Leslie Lamport',
        url: 'https://lamport.azurewebsites.net/pubs/paxos-simple.pdf',
        kind: 'paper',
        pages: '14 pp',
      },
      {
        title: 'In Search of an Understandable Consensus Algorithm (Raft)',
        author: 'Ongaro & Ousterhout',
        url: 'https://raft.github.io/raft.pdf',
        note: 'Consensus explained so it fits in your head. The paper that made Paxos optional.',
        kind: 'paper',
      },
      {
        title: 'Sagas',
        author: 'Garcia-Molina & Salem',
        url: 'https://www.cs.cornell.edu/andru/cs711/2002fa/reading/sagas.pdf',
        note: 'Semantic compensation — the pattern under every long-running action that cannot hold a transaction.',
        kind: 'paper',
      },
      {
        title: 'Practical Byzantine Fault Tolerance',
        author: 'Castro & Liskov',
        url: 'https://www.scs.stanford.edu/nyu/03sp/sched/bfs.pdf',
        kind: 'paper',
      },
      {
        title: 'Distributed Systems',
        author: 'van Steen & Tanenbaum',
        url: 'https://www.distributed-systems.net/index.php/books/ds4/',
        note: 'The textbook that belongs under those papers.',
      },
    ],
  },
  {
    id: 'networks',
    title: 'Networks',
    blurb: 'From a socket in your hand down to the equipment carrying the packet.',
    items: [
      {
        title: "Beej's Guide to Network Programming",
        author: 'Brian Hall',
        url: 'https://beej.us/guide/bgnet/',
        note: 'Short, funny, and the reason a generation understands sockets.',
      },
      {
        title: 'Computer Networks: A Systems Approach',
        author: 'Peterson & Davie',
        url: 'https://book.systemsapproach.org/',
        note: 'Closer to the equipment than the usual top-down course.',
      },
    ],
  },
  {
    id: 'math',
    title: 'The maths underneath',
    blurb: 'Not a separate track: the foundation that machine learning, quantum, control and cryptography were all assuming you had.',
    items: [
      {
        title: 'Mathematics for Machine Learning',
        author: 'Deisenroth, Faisal & Ong',
        url: 'https://mml-book.github.io/',
        note: 'Linear algebra, calculus, probability and optimisation at the level the field actually uses.',
      },
      {
        title: 'Convex Optimization',
        author: 'Boyd & Vandenberghe',
        url: 'https://web.stanford.edu/~boyd/cvxbook/',
        note: 'The shared language of optimisation. A bridge to machine learning, control and cryptography at once.',
      },
      {
        title: 'Causal Inference: The Mixtape',
        author: 'Scott Cunningham',
        url: 'https://mixtape.scunning.com/',
        note: 'Statistics defends a number; causality defends an intervention. This is how you show a change caused the improvement.',
      },
      {
        title: 'Monte Carlo Theory, Methods and Examples',
        author: 'Art Owen',
        url: 'https://artowen.su.domains/mc/',
        note: 'Variance and importance sampling, properly.',
      },
    ],
  },
  {
    id: 'ml',
    title: 'Machine learning',
    blurb: 'The current standard texts are free, and better than the paid ones they replaced.',
    items: [
      {
        title: 'Understanding Deep Learning',
        author: 'Simon Prince',
        url: 'https://udlbook.github.io/udlbook/',
        note: 'The official PDF is free. It replaced Goodfellow as the one to read first.',
      },
      {
        title: 'Probabilistic Machine Learning: An Introduction',
        author: 'Kevin Murphy',
        url: 'https://probml.github.io/pml-book/book1.html',
        note: 'The statistical floor under everything else in this shelf.',
      },
      {
        title: 'Reinforcement Learning: An Introduction',
        author: 'Sutton & Barto',
        url: 'http://incompleteideas.net/book/the-book-2nd.html',
      },
      {
        title: 'Deep Learning',
        author: 'Goodfellow, Bengio & Courville',
        url: 'https://www.deeplearningbook.org/',
        note: 'Still the reference for the theory; the practical half has aged.',
      },
    ],
  },
  {
    id: 'crypto',
    title: 'Cryptography and consensus',
    blurb: 'The canonical texts in this area are, unusually, all free.',
    items: [
      {
        title: 'A Graduate Course in Applied Cryptography',
        author: 'Boneh & Shoup',
        url: 'https://toc.cryptobook.us/',
        note: 'Goes far past the introductions, and never charges for it.',
      },
      {
        title: 'Proofs, Arguments, and Zero-Knowledge',
        author: 'Justin Thaler',
        url: 'https://people.cs.georgetown.edu/jthaler/ProofsArgsAndZK.html',
        note: 'The canonical zero-knowledge text.',
      },
      {
        title: 'NIST post-quantum standards (FIPS 203/204/205)',
        author: 'NIST',
        url: 'https://csrc.nist.gov/pubs/fips/203/final',
        note: 'ML-KEM, ML-DSA, SLH-DSA. Read as a migration spec, not a tutorial.',
        kind: 'spec',
      },
      {
        title: 'Flash Boys 2.0',
        author: 'Daian et al.',
        url: 'https://arxiv.org/abs/1904.05234',
        note: 'Adversarial economics inside a block. The MEV paper.',
        kind: 'paper',
      },
    ],
  },
  {
    id: 'quantum',
    title: 'Quantum',
    blurb: 'A field whose entire canon is lecture notes on university servers.',
    items: [
      {
        title: 'Lecture Notes Ph219',
        author: 'John Preskill',
        url: 'https://www.preskill.caltech.edu/ph219/',
        kind: 'lecture notes',
      },
      {
        title: 'Lecture Notes on Quantum Algorithms',
        author: 'Andrew Childs',
        url: 'https://www.cs.umd.edu/~amchilds/qa/',
        note: 'The modern canonical course. Goes well past Shor and Grover.',
        kind: 'lecture notes',
      },
      {
        title: 'The Theory of Quantum Information',
        author: 'John Watrous',
        url: 'https://cs.uwaterloo.ca/~watrous/TQI/',
        note: 'Channels, SDP, distinguishability. The heavy formalism.',
      },
      {
        title: 'From Classical to Quantum Shannon Theory',
        author: 'Mark Wilde',
        url: 'https://arxiv.org/abs/1106.1445',
        note: 'Quantum information theory, complete.',
      },
      {
        title: "A Quantum Engineer's Guide to Superconducting Qubits",
        author: 'Krantz et al.',
        url: 'https://arxiv.org/abs/1904.06560',
        note: 'Where the error rates every decoder assumes actually come from.',
        kind: 'paper',
      },
    ],
  },
  {
    id: 'craft',
    title: 'Craft',
    blurb: 'Written by people who were very good at something, about the thing they were good at.',
    items: [
      {
        title: 'Site Reliability Engineering',
        author: 'Google',
        url: 'https://sre.google/sre-book/table-of-contents/',
        note: 'Running things, from the people who had to.',
      },
      {
        title: 'Graphics Programming Black Book',
        author: 'Michael Abrash',
        url: 'https://www.jagregory.com/abrash-black-book/',
        note: 'Assembly optimisation inside Quake. Still the best writing about making code fast.',
      },
      {
        title: 'Game Programming Patterns',
        author: 'Robert Nystrom',
        url: 'https://gameprogrammingpatterns.com/',
        note: 'Design, not engines. Useful far outside games.',
      },
      {
        title: 'Reverse Engineering for Beginners',
        author: 'Dennis Yurichev',
        url: 'https://beginners.re/',
        note: 'About a thousand pages, free, on reading what the compiler produced.',
      },
      {
        title: 'ffmpeg-libav-tutorial',
        author: 'Leandro Moreira',
        url: 'https://github.com/leandromoreira/ffmpeg-libav-tutorial',
        note: 'The best practical material on libav, in a field with no good book. There is a pt-BR version.',
      },
      {
        title: "Paul Graham's essays",
        author: 'Paul Graham',
        url: 'https://paulgraham.com/articles.html',
      },
    ],
  },
]
