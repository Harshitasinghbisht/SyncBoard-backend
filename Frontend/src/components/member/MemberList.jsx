import MemberCard from "./MemberCard";

function MemberList({ members = [], isOwner }) {
  if (members.length === 0) {
    return (
      <p className="text-sm text-slate-400">No members added yet.</p>
    );
  }

  return (
    <div className="space-y-2">
      {members.map((member) => (
        <MemberCard
          key={member._id}
          memberId={member._id}
          name={member.name}
          email={member.email}
          role="member"
          isOwner={isOwner}
        />
      ))}
    </div>
  );
}

export default MemberList;