import React, { useContext, useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { UserContext } from '../components/UserContext'
import ConfirmationDialog from '../components/ConfirmationDialog'
import { useNavigate } from 'react-router-dom'
import AddRiskModal from '../components/AddRiskModal'
import { GET_RISKS, REMOVE_RISK, UPDATE_RISK_STATUS, UPDATE_RISK } from '../apollo/queries'
import { useNotifications } from '../components/Notifications/ContextNotifications'

const RiskList: React.FC = () => {
  const navigate = useNavigate()
  const { username } = useContext(UserContext)!
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [resolved, setResolved] = useState(true)
  const [confirmation, setConfirmation] = useState<{ message: string, onConfirm: () => void } | null>(null)
  const { loading, error, data, refetch } = useQuery(GET_RISKS, { variables: { resolved, page, limit } })
  const [removeRisk] = useMutation(REMOVE_RISK)
  const [updateRiskStatus] = useMutation(UPDATE_RISK_STATUS)
  const [updateRisk] = useMutation(UPDATE_RISK)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [editingRisk, setEditingRisk] = useState<string | null>(null)
  const [riskForm, setRiskForm] = useState({ name: '', description: '' })
  const [searchTerm, setSearchTerm] = useState('')
  const Notifications = useNotifications()

  useEffect(() => {
    if (!username.length) {
      navigate('/login')
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    refetch()
    // eslint-disable-next-line
  }, [resolved])

  useEffect(() => {
    if (!modalIsOpen) {
      refetch()
    }
    // eslint-disable-next-line
  }, [modalIsOpen])

  const handleResolveChange = async (resolved: boolean) => {
    setResolved(resolved)
  }

  const handleRemove = async (id: string) => {
    setConfirmation({
      message: 'Are you sure you want to remove this risk?',
      onConfirm: async () => {
        const result = await removeRisk({ variables: { id } })
        if (result.data.removeRisk.success) {
          refetch()
          Notifications.Add('success', result.data.removeRisk.message)
        } else {
          Notifications.Add('error', result.data.removeRisk.message)
        }
        setConfirmation(null)
      }
    })
  }

  const handleEditRisk = (risk: any) => {
    setEditingRisk(risk._id)
    setRiskForm({ name: risk.name, description: risk.description })
  }

  const handleUpdateRisk = async (id: string) => {
    await updateRisk({ variables: { id, name: riskForm.name, description: riskForm.description } })
    setEditingRisk(null)
  }

  const handleStatusChange = async (id: string, resolved?: boolean, name?: string, description?: string) => {
    await updateRiskStatus({ variables: { id, name, description, resolved } })
    await refetch()
  }

  const filteredRisks = data?.risks.filter((risk: any) =>
    risk.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    risk.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (error) return <p>Error: {error.message}</p>

  return (
    <div className='p-10'>
      <AddRiskModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} createdBy={username} />

      <div className='flex align-center items-center'>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => navigate('/categories')}>
          Go to Categories
        </button>
        <h1 className="flex-auto text-center text-2xl font-bold m-4">Risks</h1>
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => setModalIsOpen(true)}>
          Add risk
        </button>
      </div>
      <button className="mb-3 bg-yellow-500 text-white mr-2 px-4 py-2 rounded" onClick={() => handleResolveChange(!resolved)}>
        {resolved ? 'Hide ' : 'Show '}resolved
      </button>

      {data?.risks?.length ?
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-3 px-4 py-2 border border-gray-300 rounded"
        />
        : null}

      {!loading && filteredRisks?.length ?
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Created By</th>
              <th className="border px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {filteredRisks.map((risk: any) => (
              <tr key={risk._id}>
                <td className="border px-4 py-2" onClick={() => handleEditRisk(risk)}>
                  {editingRisk === risk._id ? (
                    <input
                      type="text"
                      className='w-full h-full'
                      value={riskForm.name}
                      onChange={(e) => setRiskForm({ ...riskForm, name: e.target.value })}
                      onBlur={() => handleUpdateRisk(risk._id)}
                    />
                  ) : (
                    risk.name
                  )} </td>
                <td className="border px-4 py-2" onClick={() => handleEditRisk(risk)}>
                  {editingRisk === risk._id ? (
                    <input
                      type="text"
                      className='w-full h-full'
                      value={riskForm.description}
                      onChange={(e) => setRiskForm({ ...riskForm, description: e.target.value })}
                      onBlur={() => handleUpdateRisk(risk._id)}
                    />
                  ) : (
                    risk.description
                  )} </td>
                <td className="border px-4 py-2">{risk.category.name}</td>
                <td
                  className={`border px-4 py-2 cursor-pointer ${risk.resolved ? 'text-green-500' : 'text-red-500'}`}
                  onClick={() => handleStatusChange(risk._id, !risk.resolved)}
                >
                  {risk.resolved ? 'Resolved' : 'Unresolved'}
                </td>
                <td className="border px-4 py-2" >{risk.createdBy}</td>
                <td className="border px-4 py-2" >
                  <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleRemove(risk._id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))
            }
          </tbody>
        </table>
        : null}
      {confirmation && <ConfirmationDialog {...confirmation} onCancel={() => setConfirmation(null)} />}
      {
        filteredRisks?.length >= limit ?
          <div className="flex justify-between mt-4">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => setPage(page > 1 ? page - 1 : page)}
            >
              Previous
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
          : null
      }
    </div >
  )
}

export default RiskList
