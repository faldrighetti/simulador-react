import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Penalties.css';

const REGULATION_KICKS = 5;
const LINEUP_SIZE = 11;

interface PenaltyRound {
  teamA: boolean | null;
  teamB: boolean | null;
}

type TeamKey = keyof PenaltyRound;

type Team = {
  name: string;
  logo: string;
  media: number;
};

const Penalties: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navigationState = location.state as { local?: Team; visitante?: Team };
  const positions = 6;
  const possibilities = 20;

  const [interval, setInterval] = useState<number>(3000);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [matchResult, setMatchResult] = useState<string>('');
  const [teamA] = useState<string>(navigationState?.local?.name ?? "River");
  const [teamB] = useState<string>(navigationState?.visitante?.name ?? "San Lorenzo");
  const [penaltyRounds, setPenaltyRounds] = useState<PenaltyRound[]>([]);
  const [score, setScore] = useState({ teamA: 0, teamB: 0 });
  const [currentRound, setCurrentRound] = useState<number>(0);

  const [userWillShoot, setUserWillShoot] = useState<boolean>(false);
  const [userTeam, setUserTeam] = useState<TeamKey>("teamA");
  const [userRound, setUserRound] = useState<number | 'random'>(1);
  const [userShotOptions, setUserShotOptions] = useState<boolean>(false);
  const pendingUserShotRef = useRef<((position: number) => void) | null>(null);
  const timeoutIdRef = useRef<number | null>(null);

  const clearPendingActions = useCallback(() => {
    if (timeoutIdRef.current !== null) {
      window.clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
    pendingUserShotRef.current = null;
  }, []);

  useEffect(() => clearPendingActions, [clearPendingActions]);

  const resetShootout = () => {
    clearPendingActions();
    setIsRunning(false);
    setIsFinished(false);
    setPenaltyRounds([]);
    setScore({ teamA: 0, teamB: 0 });
    setCurrentRound(0);
    setUserShotOptions(false);
    setMatchResult('');
  };

  const shoot = (): number => Math.floor(Math.random() * positions) + 1;
  const shootOnGoal = (): boolean => Math.floor(Math.random() * possibilities) + 1 <= 17;

  const dive = (): number => {
    const divePosition = Math.floor(Math.random() * positions) + 1;
    // Las posiciones 2 y 5 son equivalentes porque el arquero se queda parado en el medio.
    return divePosition === 5 ? 2 : divePosition;
  };

  const penaltyShot = (shotPosition = shoot()): boolean => {
    const onGoal = shotPosition === 5 || shootOnGoal();
    const goalkeeperPosition = dive();

    if (!onGoal) {
      return false;
    }

    const target = shotPosition === 5 ? 2 : shotPosition;
    return goalkeeperPosition !== target || Math.floor(Math.random() * possibilities) + 1 > 18;
  };

  const updatePenaltyResult = (team: TeamKey, scored: boolean, round: number) => {
    setPenaltyRounds(previousRounds => {
      const rounds = [...previousRounds];
      const index = round - 1;
      const attempt = rounds[index] ?? { teamA: null, teamB: null };
      rounds[index] = { ...attempt, [team]: scored };
      return rounds;
    });
  };

  const handleUserShot = (position: number) => {
    const playShot = pendingUserShotRef.current;
    if (playShot === null) {
      return;
    }

    pendingUserShotRef.current = null;
    setUserShotOptions(false);
    console.log(`¡TU TURNO! Pateas a la posición ${position}`);
    playShot(position);
  };

  const penaltyShootout = () => {
    resetShootout();
    setIsRunning(true);

    const shotsTaken = { teamA: 0, teamB: 0 };
    const goals = { teamA: 0, teamB: 0 };
    let shootingTeam: TeamKey = 'teamA';
    let userLineupPosition: number | null = null;

    if (userWillShoot) {
      userLineupPosition = userRound === 'random'
        ? Math.floor(Math.random() * LINEUP_SIZE) + 1
        : userRound;
      console.log(`Patearás en la ronda ${userLineupPosition}`);
    }

    console.log(`${teamA} vs ${teamB} - Tanda de penales`);

    const playShot = (position?: number) => {
      const scored = penaltyShot(position);
      const round = ++shotsTaken[shootingTeam];

      if (scored) {
        goals[shootingTeam]++;
        setScore({ ...goals });
      }
      updatePenaltyResult(shootingTeam, scored, round);

      const teamName = shootingTeam === 'teamA' ? teamA : teamB;
      console.log(`${teamName} ${scored ? "gol" : "erra"}! Total: ${goals[shootingTeam]}`);

      const remainingA = Math.max(REGULATION_KICKS - shotsTaken.teamA, 0);
      const remainingB = Math.max(REGULATION_KICKS - shotsTaken.teamB, 0);
      const goalDifference = goals.teamA - goals.teamB;
      // En muerte súbita, los dos equipos tienen que completar la ronda.
      const canDecideWinner = round <= REGULATION_KICKS || shotsTaken.teamA === shotsTaken.teamB;

      if (canDecideWinner && (goalDifference > remainingB || -goalDifference > remainingA)) {
        const winner = goalDifference > 0 ? teamA : teamB;
        console.log(`${winner} gana!`);
        setMatchResult(`Resultado final: ${teamA} ${goals.teamA} - ${goals.teamB} ${teamB}`);
        setIsRunning(false);
        setIsFinished(true);
        return;
      }

      if (round === REGULATION_KICKS && shootingTeam === 'teamB') {
        console.log('Empate tras los 5 penales. Vamos a muerte súbita.');
      }

      shootingTeam = shootingTeam === 'teamA' ? 'teamB' : 'teamA';
      timeoutIdRef.current = window.setTimeout(nextStep, interval);
    };

    const nextStep = () => {
      timeoutIdRef.current = null;
      const round = shotsTaken[shootingTeam] + 1;
      setCurrentRound(round);

      if (shootingTeam === 'teamA') {
        const phase = round > REGULATION_KICKS ? ` - Muerte súbita ${round - REGULATION_KICKS}` : '';
        console.log(`Ronda ${round}${phase}:`);
      }

      const lineupPosition = ((round - 1) % LINEUP_SIZE) + 1;
      if (shootingTeam === userTeam && lineupPosition === userLineupPosition) {
        pendingUserShotRef.current = playShot;
        setUserShotOptions(true);
        console.log(`¡Es tu turno de patear por ${shootingTeam === 'teamA' ? teamA : teamB}!`);
        return;
      }

      playShot();
    };

    timeoutIdRef.current = window.setTimeout(nextStep, interval);
  };

  const handleIntervalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInterval(parseInt(e.target.value));
  };

  const handleUserTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserTeam(e.target.value as TeamKey);
  };

  const handleUserWillShootChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserWillShoot(e.target.value === 'true');
  };

  const handleUserRoundChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setUserRound(value === 'random' ? 'random' : Number(value));
  };

  // Renderiza el resultado de un penal
  const renderPenaltyResult = (result: boolean | null, isActive: boolean) => {
    if (result === null) {
      return isActive ? <span className="penalty-pending">...</span> : <span className="penalty-empty">-</span>;
    }
    return result ? <span className="penalty-scored">✅</span> : <span className="penalty-missed">❌</span>;
  };

  const volverASelector = () => {
    navigate("/penales", {
      state: {
        local: navigationState?.local,
        visitante: navigationState?.visitante,
      },
    });
  }

  const displayedRounds = Array.from(
    { length: Math.max(REGULATION_KICKS, penaltyRounds.length, currentRound) },
    (_, index) => index + 1
  );

  return (
    <div className="penalties-page">
      <button className="backbutton" onClick={volverASelector}>Volver</button>
      <h1>Tanda de Penales</h1>
      <div className="penalties-container">
        <div className="settings">
          <div className="selected-teams">
             {navigationState?.local && (
              <div className="equipo-detalle detalle-local">
                <img src={navigationState.local.logo} alt={teamA} className="escudo-grande" />
                <h2>{teamA}</h2>
              </div>
            )}
            {navigationState?.visitante && (
              <div className="equipo-detalle detalle-visitante">
                <img src={navigationState.visitante.logo} alt={teamB} className="escudo-grande" />
                <h2>{teamB}</h2>
              </div>
            )}
          </div>
          
          <div className="controls-row">
            <div className="interval-select">
              <label>Velocidad de la simulación: </label>
              <select value={interval} onChange={handleIntervalChange} disabled={isRunning}>
                <option value="1000">Muy rápido (1s)</option>
                <option value="2000">Rápido (2s)</option>
                <option value="3000">Normal (3s)</option>
                <option value="5000">Lento (5s)</option>
                <option value="8000">Muy lento (8s)</option>
              </select>
            </div>
            {/* Opciones del usuario para participar */}
           {/*  <div className="user-settings">
              <div>
                <label>Patear penal </label>
                <select
                  value={userWillShoot.toString()}
                  onChange={handleUserWillShootChange}
                  disabled={isRunning}
                >
                  <option value="false">No</option>
                  <option value="true">Sí</option>
                </select>
              </div>

              {userWillShoot && (
                <>
                  <div>
                    <label>Elegir equipo</label>
                    <select
                      value={userTeam}
                      onChange={handleUserTeamChange}
                      disabled={isRunning}
                    >
                      <option value="teamA">{teamA}</option>
                      <option value="teamB">{teamB}</option>
                    </select>
                  </div>

                  <div>
                    <label>Elegir ronda</label>
                    <select
                      value={userRound}
                      onChange={handleUserRoundChange}
                      disabled={isRunning}
                    >
                      <option value="random">Aleatorio</option>
                      {[...Array(LINEUP_SIZE)].map((_, index) => (
                        <option key={index + 1} value={index + 1}>{index + 1}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </div> */}

            <div className="penalties-actions">
              {!isFinished ? (
                <button
                  className="btn-jugar"
                  onClick={penaltyShootout}
                  disabled={isRunning || isFinished}
                >
                  Iniciar tanda
                </button>
              ) : (
                <button
                  className="btn-jugar"
                  onClick={resetShootout}
                  disabled={isRunning}
                >
                  Reiniciar
                </button>
              )}
            </div>
          </div>
        </div>
      
        
        {/* Opciones para el tiro del usuario */}
        {userShotOptions && (
          <div className="user-shot-options">
            <h3>¡Tu turno! Elegir dirección del tiro:</h3>
            <div className="goal-grid">
              {[...Array(6)].map((_, index) => (
                <button 
                  key={index + 1} 
                  className="shot-position"
                  onClick={() => handleUserShot(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {(penaltyRounds.length > 0 || isRunning) && (
          <div className="penalties-table-container">
            <table className="penalties-table">
              <thead>
                <tr>
                  <th className="team-name">Equipo</th>
                  {displayedRounds.map(round => (
                    <th key={round} className={`penalty-round ${currentRound === round ? 'current-round' : ''}`}>
                      {round}
                    </th>
                  ))}
                  <th className="penalty-total">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="team-name">{teamA}</td>
                  {displayedRounds.map(round => (
                    <td key={round} className={`penalty-result ${currentRound === round ? 'current-round' : ''}`}>
                      {renderPenaltyResult(
                        penaltyRounds[round - 1]?.teamA ?? null,
                        userShotOptions && userTeam === 'teamA' && currentRound === round
                      )}
                    </td>
                  ))}
                  <td className="penalty-total">{score.teamA}</td>
                </tr>
                <tr>
                  <td className="team-name">{teamB}</td>
                  {displayedRounds.map(round => (
                    <td key={round} className={`penalty-result ${currentRound === round ? 'current-round' : ''}`}>
                      {renderPenaltyResult(
                        penaltyRounds[round - 1]?.teamB ?? null,
                        userShotOptions && userTeam === 'teamB' && currentRound === round
                      )}
                    </td>
                  ))}
                  <td className="penalty-total">{score.teamB}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        
        {matchResult && (
          <div className="match-result">
            <h2>{matchResult}</h2>
          </div>
        )}

      </div>
    </div>
  );
};

export default Penalties;
