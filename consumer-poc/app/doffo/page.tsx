import { doffo } from '../../lib/mock-doffo'
import { WineryProfile } from '../WineryProfile'

export default function DoffoPage() {
  return <WineryProfile winery={doffo} />
}
