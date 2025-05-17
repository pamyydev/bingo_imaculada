import React, { useState } from "react";

const NotasBlocoMini: React.FC = () => {
  const [rodada, setRodada] = useState("");
  const [turno, setTurno] = useState("");

  return (
    <div className="fixed top-5 left-10 z-50 bg-white/90 rounded-xl shadow-lg p-4 flex flex-col items-center w-72 border-2 border-paroquia-blue/40">
      <label className="text-2xl font-bold text-paroquia-blue mb-3 select-none">Rodada</label>
      <input
        type="text"
        value={rodada}
        onChange={e => setRodada(e.target.value)}
        className="w-full text-center text-5xl font-mono font-bold bg-transparent border-2 border-paroquia-blue/40 rounded mb-5 py-3 px-3 focus:outline-none focus:border-paroquia-blue transition text-paroquia-blue placeholder:text-paroquia-blue/30"
        placeholder="Rodada"
        maxLength={10}
        autoComplete="off"
      />
      <label className="text-2xl font-bold text-paroquia-blue mb-3 select-none">Turno</label>
      <input
        type="text"
        value={turno}
        onChange={e => setTurno(e.target.value)}
        className="w-full text-center text-5xl font-mono font-bold bg-transparent border-2 border-paroquia-blue/40 rounded py-3 px-3 focus:outline-none focus:border-paroquia-blue transition text-paroquia-blue placeholder:text-paroquia-blue/30"
        placeholder="Turno"
        maxLength={10}
        autoComplete="off"
      />
    </div>
  );
};

export default NotasBlocoMini;
