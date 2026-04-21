import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const COLORS = {
  gold: '#c9a84c',
  cosmic: 'rgba(100,60,180,0.6)',
  hpPlayer: '#27ae60',
  hpEnemy: '#c0392b',
  mana: '#7a4acc',
  nord: '#5588cc',
  sud: '#cc4422',
  est: '#44aa66',
  ovest: '#8844aa',
  centro: '#aaaaaa',
};

const nemici = [
  { nome: 'Drago', costo: 4, atk: 3, hp: 4, fazione: COLORS.sud },
  { nome: 'Lupo', costo: 2, atk: 2, hp: 2, fazione: COLORS.est },
];

const tuoi = [
  { nome: 'Guerriero', costo: 2, atk: 2, hp: 3, fazione: COLORS.nord },
  { nome: 'Mago', costo: 3, atk: 1, hp: 2, fazione: COLORS.ovest },
  { nome: 'Spia', costo: 1, atk: 1, hp: 1, fazione: COLORS.centro },
];

const mano = [
  { nome: 'Fuoco', costo: 2, atk: 3, hp: 1, fazione: COLORS.sud },
  { nome: 'Scudo', costo: 1, atk: 0, hp: 4, fazione: COLORS.nord },
  { nome: 'Druido', costo: 3, atk: 2, hp: 3, fazione: COLORS.est },
  { nome: 'Ombra', costo: 4, atk: 4, hp: 2, fazione: COLORS.ovest },
];

function Carta({ carta }) {
  return (
    <View style={[styles.carta, { borderColor: carta.fazione, shadowColor: carta.fazione }]}>
      <View style={styles.cartaTop}>
        <View style={[styles.costo, { backgroundColor: COLORS.mana }]}>
          <Text style={styles.costoTxt}>{carta.costo}</Text>
        </View>
        <View style={[styles.dot, { backgroundColor: carta.fazione }]} />
      </View>
      <Text style={styles.nome} numberOfLines={1}>{carta.nome}</Text>
      <View style={styles.stats}>
        <Text style={styles.statTxt}>⚔ {carta.atk}</Text>
        <Text style={styles.statTxt}>♥ {carta.hp}</Text>
      </View>
    </View>
  );
}

function SlotVuoto() {
  return <View style={styles.slotVuoto} />;
}

function Barra({ value, color }) {
  return (
    <View style={styles.barraBg}>
      <View style={[styles.barraFill, { backgroundColor: color, width: `${value * 100}%` }]} />
    </View>
  );
}

function Mana({ value, max }) {
  return (
    <View style={styles.manaRow}>
      {Array.from({ length: max }).map((_, i) => (
        <View
          key={i}
          style={[styles.manaOrb, { backgroundColor: i < value ? COLORS.mana : '#000' }]}
        />
      ))}
    </View>
  );
}

function Avatar({ nome, hp, hpMax, mana, manaMax, hpColor }) {
  return (
    <View style={styles.avatarRow}>
      <View style={styles.avatarCircle} />
      <View>
        <Text style={styles.avatarNome}>{nome}</Text>
        <Barra value={hp / hpMax} color={hpColor} />
        <Mana value={mana} max={manaMax} />
      </View>
    </View>
  );
}

function Campo({ creature }) {
  const slotsVuoti = Math.max(0, 4 - creature.length);
  return (
    <View style={styles.campo}>
      {creature.map((c, i) => <Carta key={i} carta={c} />)}
      {Array.from({ length: slotsVuoti }).map((_, i) => <SlotVuoto key={`v${i}`} />)}
    </View>
  );
}

export default function App() {
  return (
    <LinearGradient colors={['#050508', '#0c0618']} style={styles.root}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <Avatar nome="Lord Vex" hp={18} hpMax={25} mana={0} manaMax={4} hpColor={COLORS.hpEnemy} />
          <View style={styles.turno}>
            <Text style={styles.turnoTxt}>TURNO 4</Text>
          </View>
        </View>

        <View style={styles.center}>
          <Campo creature={nemici} />
          <View style={styles.divisore}>
            <View style={styles.divLine} />
            <Text style={styles.divDot}>◆</Text>
            <View style={styles.divLine} />
          </View>
          <Campo creature={tuoi} />
        </View>

        <View style={styles.footer}>
          <View style={styles.leader}>
            <View style={[styles.dot, { backgroundColor: COLORS.est }]} />
            <Text style={styles.leaderTxt}>Lyra · Est</Text>
          </View>
          <Avatar nome="Tu" hp={22} hpMax={25} mana={3} manaMax={4} hpColor={COLORS.hpPlayer} />
        </View>

        <View style={styles.manoRow}>
          {mano.map((c, i) => (
            <View
              key={i}
              style={{
                transform: [{ rotate: `${(i - mano.length / 2) * 4}deg` }],
                marginHorizontal: -10,
              }}
            >
              <Carta carta={c} />
            </View>
          ))}
        </View>

        <StatusBar style="light" />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1, paddingHorizontal: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8 },
  center: { flex: 1, justifyContent: 'center' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 8 },

  turno: {
    borderWidth: 1, borderColor: COLORS.gold, borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 6, backgroundColor: 'rgba(0,0,0,0.5)',
  },
  turnoTxt: { color: COLORS.gold, fontSize: 11, fontWeight: 'bold', letterSpacing: 1.5 },

  leader: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    borderWidth: 1, borderColor: 'rgba(201,168,76,0.6)', borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 6, backgroundColor: 'rgba(0,0,0,0.5)',
  },
  leaderTxt: { color: COLORS.gold, fontSize: 12, fontWeight: '600' },

  avatarRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  avatarCircle: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#1a1108', borderWidth: 1.5, borderColor: COLORS.gold,
  },
  avatarNome: { color: COLORS.gold, fontSize: 11, fontWeight: 'bold', marginBottom: 3 },

  barraBg: { width: 90, height: 6, backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: 3, overflow: 'hidden' },
  barraFill: { height: '100%', borderRadius: 3 },

  manaRow: { flexDirection: 'row', gap: 3, marginTop: 3 },
  manaOrb: { width: 10, height: 10, borderRadius: 5, borderWidth: 1, borderColor: 'rgba(122,74,204,0.8)' },

  campo: { flexDirection: 'row', justifyContent: 'center', gap: 8, paddingVertical: 8 },

  divisore: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 6 },
  divLine: { flex: 1, height: 1, backgroundColor: COLORS.gold, opacity: 0.7 },
  divDot: { color: COLORS.gold, fontSize: 12 },

  slotVuoto: {
    width: 75, height: 100, borderRadius: 8,
    borderWidth: 1, borderColor: 'rgba(201,168,76,0.25)', borderStyle: 'dashed',
  },

  carta: {
    width: 75, height: 100, borderRadius: 8, padding: 6,
    backgroundColor: 'rgba(0,0,0,0.8)', borderWidth: 1.5,
    shadowOpacity: 0.6, shadowRadius: 6, shadowOffset: { width: 0, height: 0 },
  },
  cartaTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  costo: { width: 18, height: 18, borderRadius: 9, justifyContent: 'center', alignItems: 'center' },
  costoTxt: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
  dot: { width: 8, height: 8, borderRadius: 4 },
  nome: { color: COLORS.gold, fontSize: 10, fontWeight: '600', marginTop: 'auto' },
  stats: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 2 },
  statTxt: { color: '#fff', fontSize: 10, fontWeight: 'bold' },

  manoRow: { flexDirection: 'row', justifyContent: 'center', paddingBottom: 20 },
});
