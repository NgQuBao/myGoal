import axios from 'axios'
import React from 'react'
import styled from 'styled-components'

const ConfirmationModal = ({ TOKEN, id, isShow, onClose, refetch }) => {
  const Delete = async () => {
    try {
      const response = await axios.post(
        'https://tms-stag.tgl-cloud.com/graphql/',
        {
          query: `
          mutation {
            deleteGoals(goalIds:${id}){
            }
          }
          `
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`
          }
        }
      )
      refetch()
      onClose()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {isShow && (
        <ModalContainer>
          <ModalContent>
            <p>Are you sure you want to continue?</p>
            <ModalActions>
              <Button onClick={() => onClose()}>Cancel</Button>
              <Button onClick={() => Delete()}>Confirm</Button>
            </ModalActions>
          </ModalContent>
        </ModalContainer>
      )}
    </>
  )
}

export default ConfirmationModal

const ModalContainer = styled.div`
  background-color: #333;
  padding: 20px;
  color: #999;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  z-index: 40;
  position: fixed;
  top: 30vh;
  left: 50%;
  transform: translateX(-50%);
`

const ModalContent = styled.div`
  background-color: #333;
  color: #fff;
  border-radius: 5px;
  padding: 1rem;
  max-width: 400px;
  text-align: center;
`

const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #fff;
  color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
  }
`
