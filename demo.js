// Compatibility for previously shared demo links; all workflows now live on the homepage.
import content from './content.js';
const params=new URLSearchParams(location.search);
const flow=content.flows.find(item=>item.id===params.get('flow'))||content.flows[0];
const step=Math.max(0,Math.min(flow.steps.length-1,parseInt(params.get('step'),10)||0));
const target=new URL('./index.html',location.href);
target.searchParams.set('flow',flow.id);
target.searchParams.set('step',String(step));
target.hash=`flow-${flow.id}`;
location.replace(target.href);
