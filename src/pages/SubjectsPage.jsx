import SubjectManager from '../features/subjects/SubjectManager'

export default function SubjectsPage({ subjects, onAdd, onRemove }) {
  return <SubjectManager subjects={subjects} onAdd={onAdd} onRemove={onRemove} />
}
