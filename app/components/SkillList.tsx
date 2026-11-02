import type { SkillView } from "../lib/content";

export default function SkillList({ skills }: { skills: SkillView[] }) {
  return (
    <dl className="glass rounded-3xl px-6 py-2">
      {skills.map((skill) => (
        <div
          key={skill.label}
          className="grid gap-1 border-t border-ink/10 py-4 first:border-t-0 sm:grid-cols-[9rem_1fr] sm:gap-6"
        >
          <dt className="font-semibold">{skill.label}</dt>
          <dd className="text-slate">{skill.items}</dd>
        </div>
      ))}
    </dl>
  );
}
