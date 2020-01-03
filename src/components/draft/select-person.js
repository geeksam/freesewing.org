import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'gatsby'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'

import MissingAccount from '../missing/account'
import Avatar from '../avatar'

const SelectPerson = ({ app, design, people, recreate = false }) => {
  // Style
  const styles = {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    person: {
      maxWidth: '300px',
      margin: '0.5rem',
      textAlign: 'center'
    },
    name: {
      margin: 0,
      wordWrap: 'anywhere'
    },
    sizes: {
      margin: 0,
      padding: 0,
      listStyleType: 'none'
    },
    li: {
      display: 'inline'
    },
    size: {
      margin: '0 0.5rem 0.5rem 0',
      display: 'inline-block'
    }
  }
  if (app.tablet) styles.pattern.width = '150px'
  if (app.mobile) styles.pattern.width = '200px'

  return (
    <>
      <h3>
        <FormattedMessage id="app.madeToMeasure" />
      </h3>
      {!app.account.username && (
        <>
          <p>
            <Link to="/signup/">
              <FormattedMessage id="app.accountRequired" />
            </Link>
          </p>
        </>
      )}
      {people.ok.user.length > 0 ? (
        <div style={styles.wrapper}>
          {people.ok.user.map(person => {
            return (
              <div style={styles.person} key={person.handle}>
                <Link
                  to={
                    recreate
                      ? `/recreate/${design}/from/${recreate}/for/${person.handle}/`
                      : `/create/${design}/for/${person.handle}/`
                  }
                  title={person.name}
                >
                  <div style={styles.avatar}>
                    <Avatar data={person} />
                  </div>
                  <h5 style={styles.name}>{person.name}</h5>
                </Link>
              </div>
            )
          })}
        </div>
      ) : (
        app.account.username && people.no.user.length < 1 && <MissingPeople />
      )}
      {people.no.user.length > 0 && (
        <div style={styles.wrapper}>
          {people.no.user.length > 0 ? (
            <Blockquote type="note" style={{ maxWidth: '800px' }}>
              <h6>
                <FormattedMessage
                  id="app.countModelsLackingForPattern"
                  values={{
                    count: people.no.user.length,
                    pattern: design
                  }}
                />
                :
              </h6>
              <ul className="links">
                {people.no.user.map(person => {
                  return (
                    <li key={person.handle}>
                      <Link to={'/people/' + person.handle} title={person.name}>
                        {person.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </Blockquote>
          ) : null}
        </div>
      )}
      <h3>
        <FormattedMessage id="app.sizes" />
      </h3>
      <h5>
        <FormattedMessage id="app.withoutBreasts" />
      </h5>
      <ul style={styles.sizes}>
        {Object.keys(people.ok.withoutBreasts).map(size => {
          let m = people.ok.withoutBreasts[size]
          return (
            <li key={'without-' + size} style={styles.li}>
              <Button
                style={styles.size}
                href={
                  recreate
                    ? `/recreate/${design}/from/${recreate}/for/size-${size}-without-breasts/`
                    : `/create/${design}/for/size-${size}-without-breasts/`
                }
                title={size}
                variant="outlined"
                color="primary"
                size="large"
              >
                {size}
              </Button>
            </li>
          )
        })}
      </ul>
      <h5>
        <FormattedMessage id="app.withBreasts" />
      </h5>
      <ul style={styles.sizes}>
        {Object.keys(people.ok.withBreasts).map(size => {
          let m = people.ok.withBreasts[size]
          return (
            <li key={'with-' + size} style={styles.li}>
              <Button
                style={styles.size}
                href={
                  recreate
                    ? `/recreate/${design}/from/${recreate}/for/size-${size}-with-breasts/`
                    : `/create/${design}/for/size-${size}-with-breasts/`
                }
                title={size}
                variant="outlined"
                color="primary"
                size="large"
              >
                {size}
              </Button>
            </li>
          )
        })}
      </ul>
      {!app.account.username && <MissingAccount />}
    </>
  )
}

export default SelectPerson
