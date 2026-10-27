import { skills } from "../data";

export default function SkillList() {
  return (
    <dl className="border-b border-ink/20">
      {skills.map((skill) => (
        <div
          key={skill.label}
          className="grid gap-1 border-t border-ink/20 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6"
        >
          <dt className="font-semibold">{skill.label}</dt>
          <dd className="text-slate">{skill.items}</dd>
        </div>
      ))}
    </dl>
  );
}
