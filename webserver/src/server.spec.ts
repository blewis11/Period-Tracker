import anyTest, { TestInterface } from 'ava'

interface Context {
  
}

const test = anyTest as TestInterface<Context>

test('contract testing here', async (t: any) => {
  t.pass()
})
