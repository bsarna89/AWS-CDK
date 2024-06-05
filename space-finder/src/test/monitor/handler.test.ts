import { handler } from "../../services/monitor/handlers";


describe('Monitor lambda tests', ()=>{

    const fetchSpy = jest.spyOn(global, 'fetch');
    fetchSpy.mockImplementation(()=>Promise.resolve({} as any));

    afterEach(()=>{
        jest.clearAllMocks();
    })

    test('makes requests for records in SnsEvents',async ()=>{
        await handler({
            Records: [{
                Sns: {
                    Message: 'Test message'
                }
            }]
        } as any,{});

        expect(fetchSpy).toHaveBeenCalledTimes(1);
        expect(fetchSpy).toHaveBeenCalledWith(expect.any(String), {
            method: 'POST',
            body:  "\"Test message\""
            
        })
    });

})