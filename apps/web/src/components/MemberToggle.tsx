import './MemberToggle.css';

interface MemberToggleProps {
  isMember: boolean;
  onToggle: () => void;
}

export default function MemberToggle({ isMember, onToggle }: MemberToggleProps) {
  return (
    <div className={`member-toggle ${isMember ? 'active' : ''}`}>
      <label className="toggle-label">
        <input
          type="checkbox"
          checked={isMember}
          onChange={onToggle}
          className="toggle-input"
        />
        <span className="toggle-slider"></span>
        {isMember ? (
          <span className="toggle-text status-active">
            🟢 Member Active
            <span className="badge">Extra 10% OFF</span>
          </span>
        ) : (
          <span className="toggle-text status-inactive">
            🔴 No Member
            <span className="badge">Unlock Member Benefits</span>
          </span>
        )}
      </label>
    </div>
  );
}
