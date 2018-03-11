


1. an input field (in App component) with a change listener which outputs the length of the entered text below it (e.g. in a paragraph).
2. a new component (=> ValidationComponent) which receives the text length as a propInside the ValidationComponent, either output "Text too short" or "Text long enough" depending on the text length (e.g. take 5 as a minimum length)
3. another component (=> CharComponent) and style it as an inline box.
4. Render a list of CharComponents where each CharComponent receives a different letter of the entered text (in the initial input field) as a prop.
5. When you click a CharComponent, it will be removed from the entered text.
    
live demo:
<img src="https://github.com/zhaaaa7/react/blob/master/projects/gif/split.gif" alt="split" with="800px" />
