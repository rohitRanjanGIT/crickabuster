import React from 'react';
import MatchCard from './MatchCard';

const TournamentGroup = ({ tournament, onQuantityChange, onRemove }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="flex justify-between items-start sm:items-center mb-6 flex-col sm:flex-row">
        <h3 className="text-2xl font-semibold text-blue-600 mb-2 sm:mb-0">{tournament.name}</h3>
        <p className="text-sm text-gray-600">{tournament.description}</p>
      </div>

      {tournament.matches.map((match) => (
        <MatchCard
          key={match.id}
          match={match}
          onQuantityChange={onQuantityChange}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default TournamentGroup;