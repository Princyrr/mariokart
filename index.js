const personagens = {
  Mario: { velocidade: 4, manobrabilidade: 3, poder: 3 },
  Peach: { velocidade: 3, manobrabilidade: 4, poder: 2 },
  Yoshi: { velocidade: 2, manobrabilidade: 4, poder: 3 },
  Bowser: { velocidade: 5, manobrabilidade: 2, poder: 5 },
  Luigi: { velocidade: 3, manobrabilidade: 4, poder: 4 },
  'Donkey Kong': { velocidade: 2, manobrabilidade: 2, poder: 5 }
};

function rolarDado() {
  return Math.floor(Math.random() * 6) + 1;
}

function sorteiaTrecho() {
  const trechos = ['RETA', 'CURVA', 'CONFRONTO'];
  const sorteado = trechos[Math.floor(Math.random() * trechos.length)];
  console.log(`🏁 Trecho sorteado: ${sorteado}`);
  return sorteado;
}

function calculaResultado(trecho, dado, atributo) {
  return dado + atributo;
}

function atualizaPontuacao(trecho, resultado1, resultado2, jogador1, jogador2) {
  if (trecho === 'CONFRONTO') {
    if (resultado1 > resultado2) {
      jogador2.pontos = Math.max(0, jogador2.pontos - 1);
      console.log(`💥 ${jogador1.nome} venceu o confronto! ${jogador2.nome} perde 1 ponto.`);
    } else if (resultado2 > resultado1) {
      jogador1.pontos = Math.max(0, jogador1.pontos - 1);
      console.log(`💥 ${jogador2.nome} venceu o confronto! ${jogador1.nome} perde 1 ponto.`);
    } else {
      console.log(`⚔️ Empate no confronto! Ninguém perde ponto.`);
    }
  } else {
    if (resultado1 > resultado2) {
      jogador1.pontos++;
      console.log(`✅ ${jogador1.nome} vence a rodada e ganha 1 ponto.`);
    } else if (resultado2 > resultado1) {
      jogador2.pontos++;
      console.log(`✅ ${jogador2.nome} vence a rodada e ganha 1 ponto.`);
    } else {
      console.log(`⚖️ Empate! Ninguém pontua.`);
    }
  }
}

function validarJogadores(nome1, nome2) {
  if (!personagens[nome1] || !personagens[nome2]) {
    console.log("Erro: personagem inválido! Escolha entre:", Object.keys(personagens).join(', '));
    return false;
  }
  return true;
}

function correr(jogador1Nome, jogador2Nome) {
  if (!validarJogadores(jogador1Nome, jogador2Nome)) return;

  const j1 = { nome: jogador1Nome, ...personagens[jogador1Nome], pontos: 0 };
  const j2 = { nome: jogador2Nome, ...personagens[jogador2Nome], pontos: 0 };

  console.log(`🏎️ Corrida entre ${j1.nome} e ${j2.nome} começa!\n`);

  for (let rodada = 1; rodada <= 5; rodada++) {
    console.log(`--- Rodada ${rodada} ---`);
    const trecho = sorteiaTrecho();

    const dado1 = rolarDado();
    const dado2 = rolarDado();

    let resultado1 = 0;
    let resultado2 = 0;

    if (trecho === 'RETA') {
      resultado1 = calculaResultado(trecho, dado1, j1.velocidade);
      resultado2 = calculaResultado(trecho, dado2, j2.velocidade);
    } else if (trecho === 'CURVA') {
      resultado1 = calculaResultado(trecho, dado1, j1.manobrabilidade);
      resultado2 = calculaResultado(trecho, dado2, j2.manobrabilidade);
    } else if (trecho === 'CONFRONTO') {
      resultado1 = calculaResultado(trecho, dado1, j1.poder);
      resultado2 = calculaResultado(trecho, dado2, j2.poder);
    }

    console.log(`${j1.nome} tirou ${dado1} + atributo = ${resultado1}`);
    console.log(`${j2.nome} tirou ${dado2} + atributo = ${resultado2}`);

    atualizaPontuacao(trecho, resultado1, resultado2, j1, j2);

    console.log(`Pontuação parcial: ${j1.nome}: ${j1.pontos} | ${j2.nome}: ${j2.pontos}\n`);
  }

  console.log(`🏁 Corrida finalizada!`);
  console.log(`🔢 Pontuação final: ${j1.nome}: ${j1.pontos} | ${j2.nome}: ${j2.pontos}`);

  if (j1.pontos > j2.pontos) {
    console.log(`🎉 ${j1.nome} venceu a corrida!`);
    return j1.nome;
  } else if (j2.pontos > j1.pontos) {
    console.log(`🎉 ${j2.nome} venceu a corrida!`);
    return j2.nome;
  } else {
    console.log(`🤝 Empate! Que corrida acirrada!`);
    return null;
  }
}


correr('Mario', 'Bowser');
